import {FormContainer, MinutesAmountInput, TaskInput} from "./styles";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as zod from "zod";



const newCycleValidationSchema = zod.object({
    task: zod.string().min(1,'Informe a tarefa'),
    minutesAmount: zod.number().min(1).max(60)
})



type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>
export  function NewCycleForm () {

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


    return (
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
    )
}