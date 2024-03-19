import {HandPalm, Play} from "phosphor-react";
import {
    CountDown,
    FormContainer,
    HomeContainer,
    MinutesAmountInput,
    Separator,
    StartCountButton, StopCountButton,
    TaskInput
} from "./styles";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import * as zod from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import {differenceInSeconds} from "date-fns";



const newCycleValidationSchema = zod.object({
    task: zod.string().min(1,'Informe a tarefa'),
    minutesAmount: zod.number().min(1).max(60)
})



type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

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
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    useEffect(()=>{
        let interval:any

        if(activeCycle){
            interval = setInterval(()=>{
                    const secondsDifference = differenceInSeconds(
                        new Date(),
                        activeCycle.startDate)

                if (secondsDifference >= totalSeconds){
                    setCycles((state) =>
                        state.map(cycle => {
                            if(cycle.id === activeCycleId){
                                return {...cycle, finishedDate: new Date()}
                            }else {
                                return cycle
                            }
                        })
                    )
                    setAmountSecondsPassed(totalSeconds)
                    clearInterval(interval)
                }else {
                    setAmountSecondsPassed(secondsDifference)
                }
            },1000)
        }

        return () =>{
            clearInterval(interval)
        }
    },[activeCycle, totalSeconds, activeCycleId])

    const {handleSubmit,
        reset,
        register,
        watch,
        formState} = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleValidationSchema),
        defaultValues: {
            task:'',
            minutesAmount: 0
        }
    })

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
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        list="list-suggestion"
                        id="task"
                        disabled={!!activeCycle}
                        placeholder="Dê um nome para seu projeto"
                        {...register('task')}
                    />

                    <datalist id="list-suggestion">
                        <option value="Tarefa Matutina"/>
                        <option value="Tarefa Vespertina"/>
                        <option value="Tarefa Noturna"/>
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput
                        placeholder="00"
                        type="number"
                        step={5}
                        min={1}
                        max={60}
                        disabled={!!activeCycle}
                        id="minutesAmount"
                        {...register('minutesAmount', {valueAsNumber: true})}
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountDown>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountDown>
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