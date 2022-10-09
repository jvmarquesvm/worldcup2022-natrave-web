import { Card, Icone, DateSelect } from "../../components"
import { Navigate } from "react-router-dom"
import { useLocalStorage, useAsyncFn } from 'react-use'
import axios from 'axios'
import { format, formatISO } from "date-fns"
import { useEffect, useState } from "react"

export const Dashboard = () => {
    const [currentDate, setCurrentDate] = useState( formatISO(new Date(2022, 10, 20)) )
    const [ auth ] = useLocalStorage('auth', {})
    
    const [ { value: user, loading, error} , fetchHunches ] = useAsyncFn ( async () => {
        const response = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: `/${auth.user.username}`,
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
    })
    
    const isLoading = games.loading || loading
    const isError =  games.error || error
    const isDone = !isLoading || !isError
    
    useEffect( () => {
        fetchHunches()
    }, [])

    useEffect( () => {
        fetchGames({gameTime: currentDate})
 
    }, [currentDate])

    if(!auth?.user?.id) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <div className="">
            <header className="bg-red-500 text-white">
                <div className="container  max-w-3xl p-4 flex justify-between">
                    <img src="/img/logo-fundo-vermelho.svg" className="w-28 md:w-40"/>
                    <a href={`/${auth?.user?.username}`}>
                        <Icone name="profile" className="w-10" />
                    </a>
                </div>
            </header>
            <main className="space-y-6">
                <section id="header" className="bg-red-500 text-white">
                    <div className="container max-w-3xl space-y-2 p-4">
                        <span>{auth.user.name}</span>
                        <h3 className="text-2xl font-bold">Qual o seu palpite?</h3>
                    </div>
                </section>
                <section id="content" className="container max-w-3xl p-4 space-y-4">
                    <DateSelect currentDate={currentDate} onChange={setCurrentDate}/>
                    <div className="space-y-4">
                        { isLoading && 'Carregando...'}
                        { isError && 'Ops! Algo deu errado...'}

                        { isDone && !isLoading && games.value?.map(game => (
                            <Card key={game.id} gameId={game.id}  
                                  homeTeam={ game.homeTeam } awayTeam={ game.awayTeam } 
                                  gameTime={ format( new Date(game.gameTime), "H:mm" ) }
                                  homeTeamScore={user?.hunches?.[game.id]?.homeTeamScore || 0} 
                                  awayTeamScore={user?.hunches?.[game.id]?.awayTeamScore || 0} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
} 