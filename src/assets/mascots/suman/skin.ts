import type { MascotSkin } from '../../../types/pet'

import idle1 from './frames/idle-1.png'
import idle2 from './frames/idle-2.png'
import walk1 from './frames/walk-1.png'
import walk2 from './frames/walk-2.png'
import wave1 from './frames/wave-1.png'
import sleep1 from './frames/sleep-1.png'
import celebrate1 from './frames/celebrate-1.png'
import talk1 from './frames/talk-1.png'
import talk2 from './frames/talk-2.png'
import type1 from './frames/type-1.png'
import type2 from './frames/type-2.png'
import type3 from './frames/type-3.png'
import type4 from './frames/type-4.png'

export const sumanMascotSkin: MascotSkin = {
  id: 'suman-pixel-dev',
  name: 'Suman Pixel Developer',
  alt: 'Pixel-art developer mascot inspired by Suman, holding a laptop',
  frames: {
    idle: [idle1, idle2],
    walking: [walk1, walk2],
    waving: [wave1, idle1],
    sleeping: [sleep1],
    celebrating: [celebrate1, idle2],
    talking: [talk1, talk2],
    typing: [type1, type2, type3, type4],
  },
}
