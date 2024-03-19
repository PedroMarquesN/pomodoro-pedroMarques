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
export function Home() {
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
        console.log(data)
        reset()

    }

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
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDown>

                <StartCountButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                    Começar
                </StartCountButton>
            </form>
        </HomeContainer>

    )
}