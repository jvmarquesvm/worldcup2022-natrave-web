import { Icone, Input } from "../../components"
import axios from "axios"
import { useFormik } from "formik"
import * as yup from "yup"
import { useLocalStorage } from 'react-use'
import { Navigate } from 'react-router-dom'

const validationSchema = yup.object().shape({
    email: yup.string().email("Email deve ser válido").required("O endereço eletrônico deve ser obrigatório"),
    password: yup.string().required("A senha é obrigatório")
})

export const Login = () => {
    const [ auth, setAuth ] = useLocalStorage('auth', {})
    const formik = useFormik({
        onSubmit: async (values) => {
            const response = await axios({
                                method: 'get',
                                baseURL: import.meta.env.VITE_API_URL,
                                url: '/login',
                                auth: {
                                    username: values.email,
                                    password: values.password
                                }
                            })

            /*window.localStorage.setItem("auth",JSON.stringify(response.data))
            const auth = window.localStorage.getItem("auth")
            console.log(JSON.parse(auth))*/
            setAuth(response.data)
        },
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema
    })

    if(auth?.user?.id) {
        return <Navigate to="/dashboard" replace={true} />
    }

    return (
        <div>
            <header className='p-4 border border-red-300'>
                <div className="container max-w-xl flex justify-center">
                    <img src='/img/logo-fundo-branco.svg' className='w-32 md:w-40'/>
                </div>
            </header>
            
            <main className="container max-w-xl p-4">
                <div className="p-4  flex space-x-4 items-center">
                    <a href="/">
                        <Icone name="back" className="h-6"/>                
                    </a>

                    <h2 className ="text-xl font-bold">
                        Entre na sua conta
                    </h2>
                </div>
              
                <form className="space-y-6 p-4" onSubmit={formik.handleSubmit}>
                    <Input type="text" name="email" label="Seu e-mail" placeholder="Digite seu e-mail"  
                           value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                           error={formik.touched.email && formik.errors.email} />
                    <Input type="password" name="password" label="Sua senha" placeholder="Digite sua senha" 
                           value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                           error={formik.touched.password && formik.errors.password} />
                    <button type="submit" className='block text-white text-center bg-red-500 border border-white px-6 py-3 rounded-xl w-full disabled:opacity-40'
                            disabled={!formik.isValid || formik.isSubmitting}>
                            {formik.isSubmitting ? 'Carregando' : 'Entrar'}
                    </button >
                </form>
            </main>
        </div>
    )
}