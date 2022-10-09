import { Navigate } from "react-router-dom"
import { useLocalStorage } from 'react-use'

export function Home() {
  const [ auth, setAuth ] = useLocalStorage('auth', {})
  if(auth?.user?.id) {
    return <Navigate to="/dashboard" replace={true} />
  }
   return (
    <div className='h-screen bg-red-700 text-white p-4 flex flex-col items-center space-y-6'>

      <header className='container p-4 max-w-5xl flex flex-row justify-center '>
        <img src='/img/logo.svg' className='w-40'/>
      </header>

      <div className='container max-w-5xl p-6 flex-1 flex flex-col items-center md:flex-row space-y-6 md:space-y-0 md:space-x-6'>

          <div className='md:flex-1'>
            <img src="/img/photo.png" className='w-full max-w-md' />
          </div>
        
          <div className='md:flex-1 flex flex-col space-y-6'>
            <h1 className='text-3xl text-center md:text-left font-bold'>
              Dê o seu palpite na Copa do Mundo do Catar 2022!
            </h1>

            <a href="/signup" className='text-red-700 text-center bg-white text-xl px-8 py-4 rounded-xl'>
              Criar minha conta
            </a>

            <a href="/login" className='text-white text-center bg-transparent border border-white text-xl px-8 py-4 rounded-xl'>
              Fazer login
            </a>
          </div>
      </div>
    </div>
  )
}
