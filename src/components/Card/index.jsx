import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLocalStorage } from 'react-use'

const validationSchema = yup.object().shape({
    homeTeamScore: yup.string().required(),
    awayTeamScore: yup.string().required()
})

export const Card = ({gameId, homeTeam, awayTeam, gameTime, homeTeamScore, awayTeamScore, disabled}) => { 
    const [ auth, setAuth ] = useLocalStorage('auth', {})
    const formik = useFormik({
        onSubmit: (values) => {
            axios({
                method: 'post',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/hunches',
                data: {
                    ...values, gameId
                },
                headers: {
                    authorization: `Bearer ${auth.acessToken}`
                }
            })
        },
        initialValues: {
            homeTeamScore: homeTeamScore,
            awayTeamScore: awayTeamScore
        },
        validationSchema
    })
    return (
        <form className="border border-gray-300 p-4 rounded-xl text-center space-y-4">
            <span className="text-sm md:text-base font-bold text-gray-700">{gameTime}</span>
            <div className="flex space-x-4 justify-center items-center">
                <span className="uppercase">{homeTeam}</span>
                <img src={`/img/bandeiras/${homeTeam}.png`} alt="" />
                <input type="number" className="bg-red-300/[0.2] w-[55px] h-[55px] text-red-700 text-xl text-center"
                       name="homeTeamScore" value={formik.values.homeTeamScore} onChange={formik.handleChange} 
                       onBlur={formik.handleSubmit}
                       disabled={disabled}/>

                <span className="text-base font-bold mx-4 text-red-500">X</span>

                <input type="number" className="bg-red-300/[0.2] w-[55px] h-[55px] text-red-700 text-xl text-center"
                       name="awayTeamScore" value={formik.values.awayTeamScore} onChange={formik.handleChange} 
                       onBlur={formik.handleSubmit} 
                       disabled={disabled}/>
                <img src={`/img/bandeiras/${awayTeam}.png`} alt="" />
                <span className="uppercase">{awayTeam}</span>
            </div>
        </form>
    )
}