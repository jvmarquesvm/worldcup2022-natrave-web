import { Card, Icone, DateSelect } from "../../components"
import { useNavigate, useParams } from "react-router-dom"
import { useLocalStorage, useAsyncFn } from 'react-use'
import axios from 'axios'
import { format, formatISO } from "date-fns"
import { useEffect, useState } from "react"

export const Profile = () => {
    
    const [currentDate, setCurrentDate] = useState( formatISO(new Date(2022, 10, 20)) )
    const [ auth, setAuth ] = useLocalStorage('auth', {})

    const navigate = useNavigate()
    const logout = () =>  {
         setAuth({})
         navigate("/login")
    } 
    const params = useParams()
  
    
    const [ { value: user, loading, error}, fetchHunches ] = useAsyncFn ( async () => {
        
        const response = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: `/${params.username}`,
        })
        
        const hunches = response.data.hunches.reduce((acc, hunch) => {
            acc[hunch.gameId] = hunch
            return acc
        }, {})
        
        return {
            ...response.data,
            hunches
        }
    })
    
    const [ games, fetchGames ] = useAsyncFn( async (params) => {
        const response = await axios({
                    method: 'get',
                    baseURL: import.meta.env.VITE_API_URL,
                    url: '/games',
                    params
                })
                return response.data
        } )
    
    const isLoading = games.loading || loading
    const isError =  games.error || error
    const isDone = !isLoading || !isError
    
    useEffect( () => {
        fetchHunches()
    }, [])

    useEffect( () => {
        fetchGames({gameTime: currentDate})
    }, [currentDate])

    return (
        <div className="">

            <header className="bg-red-500 text-white">
                <div className="container  max-w-3xl p-4 flex justify-between">
                    <img src="/img/logo-fundo-vermelho.svg" className="w-28 md:w-40"/>
                    { auth?.user?.id && (<div onClick={logout} className="cursor-pointer p-4">
                        Sair
                    </div>) }
                </div>
            </header>
            <main className="space-y-6">
                <section id="header" className="bg-red-500 text-white">
                    <div className="container max-w-3xl space-y-2 p-4">
                        <a href="/dashboard">
                            <Icone name="back" className="w-10" />
                        </a>
                        <h3 className="text-2xl font-bold">{user?.name}</h3>
                    </div>
                </section>
                <section id="content" className="container max-w-3xl p-4 space-y-4">
                    <h2 className="font-bold text-xl text-red-500">Seus palpites</h2>
                    <DateSelect currentDate={currentDate} onChange={setCurrentDate}/>
                    <div className="space-y-4">
                        { isLoading && 'Carregando...'}
                        { isError && 'Ops! Algo deu errado...'}

                        { isDone && !isLoading && games.value?.map( game => (
                            <Card key={ game.id } gameId={ game.id }  
                                  homeTeam={ game.homeTeam } awayTeam={ game.awayTeam } 
                                  gameTime={ format( new Date(game.gameTime), "H:mm" ) }
                                  homeTeamScore={ user?.hunches?.[game.id]?.homeTeamScore || '' } 
                                  awayTeamScore={ user?.hunches?.[game.id]?.awayTeamScore || '' } 
                                  disabled={true}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
} 