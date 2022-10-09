import { addDays, subDays, format, formatISO } from "date-fns";
import { ptBR } from "date-fns/locale"
import { Icone } from "../../components/Icone";

export const DateSelect = ({currentDate, onChange}) => {

    const prevDay = () => {
        const prevDay = subDays(new Date(currentDate), 1)
        onChange(formatISO(prevDay))
    }

    const nextDay = () => {
        const nextDay = addDays(new Date(currentDate), 1)
        onChange(formatISO(nextDay))
    }

    return (
        <div className="flex space-x-4 items-center justify-center p-4">
            <Icone name="arrowLeft" className="w-6 text-red-500" onClick={prevDay}/>
            <span className="font-bold">{ format( new Date(currentDate), "d 'de' MMMM", { locale: ptBR } )}</span>
            <Icone name="arrowRight" className="w-6 text-red-500" onClick={nextDay}/>
        </div>
    )
}
