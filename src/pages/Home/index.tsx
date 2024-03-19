import {Play} from "phosphor-react";
import {
    CountDown,
    FormContainer,
    HomeContainer,
    MinutesAmountInput,
    Separator,
    StartCountButton,
    TaskInput
} from "./styles";
import {useState} from "react";
import {useForm} from "react-hook-form";
import * as zod from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";


const newCycleValidationSchema = zod.object({
    task: zod.string().min(1,'Informe a tarefa'),
    minutesAmount: zod.number().min(5).max(60)
})



type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

interface Cycle {
    id: string
    task: string
    minutesAmount: number
}
export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId]= useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)



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
            minutesAmount: data.minutesAmount
        }

        setCycles(state => [...state, newCycle])
        setActiveCycleId(id)
        reset()

    }

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2,'0')
    const seconds = String(secondsAmount).padStart(2, '0')

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
                        min={5}
                        max={60}
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

                <StartCountButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                    Começar
                </StartCountButton>
            </form>
        </HomeContainer>

    )
}