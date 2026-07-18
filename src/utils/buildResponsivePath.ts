export interface ScrollPathPoint {
  x: number
  y: number
}

export interface ResponsivePathOptions {
  anchors: ScrollPathPoint[]
  viewportWidth: number
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum)
}

function point(pointValue: ScrollPathPoint) {
  return `${pointValue.x.toFixed(1)} ${pointValue.y.toFixed(1)}`
}

/**
 * Converts section anchors into one continuous route. Each section-to-section
 * span uses two cubic curves, while alternating spans include a small loop.
 * Geometry stays independent from the DOM and animation lifecycle so it can be
 * reused and tested with plain coordinate inputs.
 */
export function buildResponsivePath({ anchors, viewportWidth }: ResponsivePathOptions) {
  if (anchors.length < 2) return ''

  const horizontalLimit = Math.max(36, viewportWidth * 0.12)
  const amplitude = clamp(viewportWidth * 0.11, 48, 150)
  let path = `M ${point(anchors[0]!)}`

  for (let index = 0; index < anchors.length - 1; index++) {
    const start = anchors[index]!
    const end = anchors[index + 1]!
    const verticalDistance = Math.max(end.y - start.y, 1)
    const direction = index % 2 === 0 ? 1 : -1
    const middle: ScrollPathPoint = {
      x: clamp(
        (start.x + end.x) / 2 + amplitude * direction,
        horizontalLimit,
        viewportWidth - horizontalLimit,
      ),
      y: start.y + verticalDistance * 0.5,
    }

    path += ` C ${point({
      x: start.x + amplitude * direction * 0.42,
      y: start.y + verticalDistance * 0.18,
    })}, ${point({ x: middle.x, y: middle.y - verticalDistance * 0.14 })}, ${point(middle)}`

    // A restrained loop on every other long span gives the route its AI-signal
    // signature without turning every section transition into decoration.
    if (index % 2 === 1 && verticalDistance > 360) {
      const radius = clamp(Math.min(amplitude * 0.3, verticalDistance * 0.055), 16, 38)
      const kappa = 0.5522848

      path += ` C ${point({ x: middle.x, y: middle.y + radius * kappa })}, ${point({
        x: middle.x + radius * (1 - kappa),
        y: middle.y + radius,
      })}, ${point({ x: middle.x + radius, y: middle.y + radius })}`
      path += ` C ${point({ x: middle.x + radius * (1 + kappa), y: middle.y + radius })}, ${point({
        x: middle.x + radius * 2,
        y: middle.y + radius * kappa,
      })}, ${point({ x: middle.x + radius * 2, y: middle.y })}`
      path += ` C ${point({ x: middle.x + radius * 2, y: middle.y - radius * kappa })}, ${point({
        x: middle.x + radius * (1 + kappa),
        y: middle.y - radius,
      })}, ${point({ x: middle.x + radius, y: middle.y - radius })}`
      path += ` C ${point({ x: middle.x + radius * (1 - kappa), y: middle.y - radius })}, ${point({
        x: middle.x,
        y: middle.y - radius * kappa,
      })}, ${point(middle)}`
    }

    path += ` C ${point({ x: middle.x, y: middle.y + verticalDistance * 0.14 })}, ${point({
      x: end.x - amplitude * direction * 0.42,
      y: end.y - verticalDistance * 0.18,
    })}, ${point(end)}`
  }

  return path
}
