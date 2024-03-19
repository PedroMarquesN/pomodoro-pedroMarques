import {HandPalm, Play} from "phosphor-react";
import {
    HomeContainer,
    StartCountButton,
    StopCountButton,
} from "./styles";
import {createContext, useState} from "react";
import {NewCycleForm} from "./components/NewCycleForm";
import * as zod from "zod";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CountdownContainer} from "./components/Countdown";





interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptDate?: Date
    finishedDate?: Date
}

interface CyclesContextProps {
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    markCurrentCycleAsFinished: () => void
    amountSecondsPassed: number
    setSecondPassed: (seconds:number) => void
}



const newCycleValidationSchema = zod.object({
    task: zod.string().min(1,'Informe a tarefa'),
    minutesAmount: zod.number().min(1).max(60)
})
type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>
export const CyclesContext = createContext({} as CyclesContextProps)



export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId]= useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)


    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleValidationSchema),
        defaultValues: {
            task:'',
            minutesAmount: 0
        }
    })


    const {handleSubmit, watch, reset} = newCycleForm



    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)
    
    function markCurrentCycleAsFinished() {
        setCycles((state) =>
            state.map(cycle => {
                if(cycle.id === activeCycleId){
                    return {...cycle, finishedDate: new Date()}
                }else {
                    return cycle
                }
            })
        )
    }


    function setSecondPassed(seconds:number) {
        setAmountSecondsPassed(seconds)
    }

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




    const task = watch('task')
    const isSubmitDisabled = !task

    return(
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>

                <CyclesContext.Provider
                    value={{
                        activeCycle,
                        activeCycleId,
                        markCurrentCycleAsFinished,
                        amountSecondsPassed,
                        setSecondPassed}}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm/>
                    </FormProvider>
                    <CountdownContainer />
                </CyclesContext.Provider>


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