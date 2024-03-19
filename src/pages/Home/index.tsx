import {HandPalm, Play} from "phosphor-react";
import {
    HomeContainer,
    StartCountButton,
    StopCountButton,
} from "./styles";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import * as zod from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import {differenceInSeconds} from "date-fns";
import {NewCycleForm} from "./components/NewCycleForm";
import {CountDown} from "./components/Countdown/styles";





interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptDate?: Date
    finishedDate?: Date
}
export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId]= useState<string | null>(null)


    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)




    function handleCreateNewCycle(data:NewCycleFormData) {
        const id = String(new Date().getTime())

        const newCycle:Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        setCycles(state => [...state, newCycle])
        setActiveCycleId(id)
        setAmountSecondsPassed(0)
        reset()

    }
    
    function handleInterruptCycle() {
        setCycles(state =>
            state.map(cycle => {
                if(cycle.id === activeCycleId){
                    return {...cycle, interruptDate: new Date()}
                }else {
                    return cycle
                }
            })
        )

        setActiveCycleId(null)
    }


    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2,'0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if(activeCycle){
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes,seconds, activeCycle]);

    const task = watch('task')
    const isSubmitDisabled = !task

    return(
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <NewCycleForm/>
                <CountDown activeCycle={activeCycle} />


                {activeCycle ? (
                    <StopCountButton  onClick={handleInterruptCycle} type="submit">
                        <HandPalm size={24}/>
                        Interromper
                    </StopCountButton>
                ):(
                    <StartCountButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24}/>
                        Começar
                    </StartCountButton>
                )}


            </form>
        </HomeContainer>

    )
}