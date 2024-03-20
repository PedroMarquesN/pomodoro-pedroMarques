import {FormContainer, MinutesAmountInput, TaskInput} from "./styles";
import {useContext} from "react";
import {useFormContext} from "react-hook-form";
import {CyclesContext} from "../../../../contexts/CyclesContext";






export  function NewCycleForm () {
    const{activeCycle} = useContext(CyclesContext)
    const {register} = useFormContext()




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
                min={5}
                max={60}
                disabled={!!activeCycle}
                id="minutesAmount"
                {...register('minutesAmount', {valueAsNumber: true})}
            />

            <span>minutos.</span>
        </FormContainer>
    )
}