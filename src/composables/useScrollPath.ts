import { nextTick, onBeforeUnmount, onMounted, ref, type Ref } from 'vue'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { buildResponsivePath, type ScrollPathPoint } from '../utils/buildResponsivePath'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

interface ScrollPathElements {
  svg: Ref<SVGSVGElement | null>
  line: Ref<SVGPathElement | null>
  glow: Ref<SVGPathElement | null>
  head: Ref<SVGGElement | null>
  gradient: Ref<SVGLinearGradientElement | null>
  sectionSelector?: string
}

const EDGE_PADDING = 36

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum)
}

export function useScrollPath({
  svg,
  line,
  glow,
  head,
  gradient,
  sectionSelector = 'section[id]',
}: ScrollPathElements) {
  const pathData = ref('')
  const svgWidth = ref(1)
  const svgHeight = ref(1)
  const reducedMotion = ref(false)
  const ready = ref(false)

  let timeline: gsap.core.Timeline | undefined
  let resizeObserver: ResizeObserver | undefined
  let motionQuery: MediaQueryList | undefined
  let resizeFrame: number | undefined
  let rebuildVersion = 0
  let destroyed = false

  function destroyTimeline() {
    timeline?.scrollTrigger?.kill()
    timeline?.kill()
    timeline = undefined
  }

  function measureAnchors(width: number) {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(sectionSelector))
      .map((element) => ({ element, rect: element.getBoundingClientRect() }))
      .sort((a, b) => a.rect.top - b.rect.top)

    const horizontalOffset = clamp(width * 0.12, 34, 130)

    const anchors: ScrollPathPoint[] = sections.map(({ element, rect }, index) => {
      const centerX = rect.left + rect.width / 2
      const direction = index % 2 === 0 ? -1 : 1

      return {
        x: clamp(centerX + horizontalOffset * direction, EDGE_PADDING, width - EDGE_PADDING),
        y:
          window.scrollY +
          rect.top +
          (element.id === 'hero' ? Math.min(rect.height * 0.24, 220) : rect.height * 0.5),
      }
    })

    return anchors
  }

  function createTimeline(pathLength: number) {
    const svgElement = svg.value
    const pathElement = line.value
    const glowElement = glow.value
    const headElement = head.value
    const gradientElement = gradient.value
    if (!svgElement || !pathElement || !glowElement || !headElement || !gradientElement) return

    destroyTimeline()

    // Both strokes share identical dash values. The brighter line stays crisp,
    // while the second wider stroke supplies a low-opacity bloom underneath it.
    gsap.set([pathElement, glowElement], {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    })
    gsap.set(headElement, { autoAlpha: 0, willChange: 'transform' })
    let headVisible = false

    timeline = gsap.timeline({
      defaults: { duration: 1, ease: 'none' },
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        // A short scrub catch-up absorbs coarse wheel/touchpad deltas while the
        // timeline remains fully controlled by scroll position in both directions.
        scrub: 0.45,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          const shouldShowHead = progress > 0.0001
          if (headVisible === shouldShowHead) return
          headVisible = shouldShowHead
          gsap.set(headElement, { autoAlpha: shouldShowHead ? 1 : 0 })
        },
      },
    })

    timeline
      .to([pathElement, glowElement], { strokeDashoffset: 0 }, 0)
      .to(
        headElement,
        {
          motionPath: {
            path: pathElement,
            align: pathElement,
            alignOrigin: [0, 0.5],
            autoRotate: true,
          },
        },
        0,
      )
      // Gradient movement is tied to scroll progress rather than a time-based
      // loop, so reversing the scroll reverses the color flow exactly.
      .to(
        gradientElement,
        {
          attr: {
            x1: svgWidth.value * 0.22,
            y1: svgHeight.value * 0.45,
            x2: svgWidth.value * 0.78,
            y2: svgHeight.value,
          },
        },
        0,
      )

    // Rendering is gated until dash values and the hidden head are applied,
    // preventing a full-path flash between Vue's DOM update and GSAP setup.
    ready.value = true
  }

  async function rebuildPath() {
    if (destroyed || reducedMotion.value) return

    const version = ++rebuildVersion

    // All layout reads happen together before reactive writes to avoid layout
    // thrashing during ResizeObserver and orientation-change recalculation.
    const width = window.innerWidth
    const height = Math.max(document.documentElement.scrollHeight, window.innerHeight)
    const anchors = measureAnchors(width)
    const nextPath = buildResponsivePath({ anchors, viewportWidth: width })

    svgWidth.value = width
    svgHeight.value = height
    pathData.value = nextPath

    await nextTick()
    if (destroyed || version !== rebuildVersion || !line.value || !nextPath) return

    createTimeline(line.value.getTotalLength())
    ScrollTrigger.refresh()
  }

  function scheduleRebuild() {
    if (resizeFrame) cancelAnimationFrame(resizeFrame)
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = undefined
      void rebuildPath()
    })
  }

  function handleMotionPreference(event: MediaQueryListEvent) {
    reducedMotion.value = event.matches
    ready.value = false
    destroyTimeline()
    if (!event.matches) scheduleRebuild()
  }

  onMounted(() => {
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.value = motionQuery.matches
    motionQuery.addEventListener('change', handleMotionPreference)

    resizeObserver = new ResizeObserver(scheduleRebuild)
    resizeObserver.observe(document.documentElement)
    document.querySelectorAll<HTMLElement>(sectionSelector).forEach((section) => resizeObserver?.observe(section))
    window.addEventListener('orientationchange', scheduleRebuild)

    if (!reducedMotion.value) {
      scheduleRebuild()

      // Web fonts can change section geometry after mount; one post-font pass
      // ensures anchors stay centered without polling the layout.
      void document.fonts.ready.then(scheduleRebuild)
    }
  })

  onBeforeUnmount(() => {
    destroyed = true
    rebuildVersion++
    destroyTimeline()
    resizeObserver?.disconnect()
    motionQuery?.removeEventListener('change', handleMotionPreference)
    window.removeEventListener('orientationchange', scheduleRebuild)
    if (resizeFrame) cancelAnimationFrame(resizeFrame)
    if (head.value) gsap.set(head.value, { clearProps: 'all' })
    const pathElements = [line.value, glow.value].filter((element) => element !== null)
    if (pathElements.length) gsap.set(pathElements, { clearProps: 'all' })
  })

  return {
    pathData,
    reducedMotion,
    ready,
    svgHeight,
    svgWidth,
  }
}
