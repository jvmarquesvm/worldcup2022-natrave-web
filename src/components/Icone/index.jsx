import { ReactComponent as arrowLeft } from './svgs/arrow-left.svg'
import { ReactComponent as arrowRight } from './svgs/arrow-right.svg'
import { ReactComponent as back } from './svgs/back.svg'
import { ReactComponent as profile } from './svgs/profile.svg'

const icon = {
    arrowLeft: arrowLeft, arrowRight, back, profile
}

export const Icone = ({name, ...propriedades}) => {
    const Element = icon[name]
    return <Element {...propriedades} />
}