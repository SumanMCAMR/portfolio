export type PetState =
  | 'idle'
  | 'walking'
  | 'waving'
  | 'sleeping'
  | 'celebrating'
  | 'talking'
  | 'typing'

export type PetSection = 'projects' | 'experience' | 'skills' | 'contact'

export type PetActionKind = 'scroll' | 'download' | 'toggleAnimations' | 'message'

export interface PetAction {
  id: string
  label: string
  kind: PetActionKind
  target?: string
}

export interface PetMessage {
  id: string
  text: string
  actions?: PetAction[]
  state?: PetState
  durationMs?: number
}

export interface MascotSkin {
  id: string
  name: string
  alt: string
  frames: Record<PetState, string[]>
}

export interface PetPosition {
  right: number
  bottom: number
}

export type PetDirection = 'left' | 'right'
