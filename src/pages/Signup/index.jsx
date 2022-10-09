import { Icone, Input } from "../../components"
import axios from "axios"
import { useFormik } from "formik"
import * as yup from "yup"
import { Navigate } from "react-router-dom"
import { useLocalStorage } from 'react-use'

const validationSchema = yup.object().shape({
    name: yup.string().required("O nome é obrigatório"),
    username: yup.string().required("O nome de usuário deve ser obrigatório"),
    email: yup.string().email("Email deve ser válido").required("O endereço eletrônico deve ser obrigatório"),
    password: yup.string().required("A senha é obrigatório")
})

export const Signup = () => {
    const [ auth ] = useLocalStorage('auth', {})
    const formik = useFormik({
        onSubmit: async (values) => {
            const response = await axios({
                                method: 'post',
                                baseURL: import.meta.env.VITE_API_URL,
                                url: '/users',
                                data: values
                            })

            console.log(response)
        },
        initialValues: {
            name: '',
            username: '',
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
                        Crie sua conta
                    </h2>
                </div>
              
                <form className="space-y-6 p-4" onSubmit={formik.handleSubmit}>
                    <Input type="text" name="name" label="Seu nome" placeholder="Digite seu nome" 
                           value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                           error={formik.touched.name && formik.errors.name} />
                    <Input type="text" name="username" label="Seu nome de usuário" placeholder="Digite seu nome de usuário" 
                           value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}
                           error={formik.touched.username && formik.errors.username} />
                    <Input type="text" name="email" label="Seu e-mail" placeholder="Digite seu e-mail" 
                           value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                           error={formik.touched.email && formik.errors.email} />
                    <Input type="password" name="password" label="Sua senha" placeholder="Digite sua senha" 
                           value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                           error={formik.touched.password && formik.errors.password} />
                    <button type="submit" 
                             className='block text-white text-center bg-red-500 border border-white px-6 py-3 rounded-xl w-full disabled:opacity-40'
                             disabled={!formik.isValid || formik.isSubmitting}>
                            {formik.isSubmitting ? 'Carregando' : 'Criar minha conta'}
                    </button>
                </form>
            </main>
        </div>
    )
}