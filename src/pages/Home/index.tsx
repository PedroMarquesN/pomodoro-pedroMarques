import {HandPalm, Play} from "phosphor-react";
import {
    HomeContainer,
    StartCountButton,
    StopCountButton,
} from "./styles";
import { useContext} from "react";
import {NewCycleForm} from "./components/NewCycleForm";
import * as zod from "zod";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CountdownContainer} from "./components/Countdown";
import {CyclesContext} from "../../contexts/CyclesContext";


const newCycleValidationSchema = zod.object({
    task: zod.string().min(1,'Informe a tarefa'),
    minutesAmount: zod.number().min(5).max(60)
})
type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

export function Home() {
    const {createNewCycle, interruptCurrentCycle ,activeCycle} = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleValidationSchema),
        defaultValues: {
            task:'',
            minutesAmount: 0
        }
    })

    const {handleSubmit, watch, reset} = newCycleForm

    function handleCreateNewCycle(data:NewCycleFormData) {
        createNewCycle(data)
        reset()

    }

    const task = watch('task')
    const isSubmitDisabled = !task

    return(
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>

                    <FormProvider {...newCycleForm}>
                        <NewCycleForm/>
                    </FormProvider>
                    <CountdownContainer />

                {activeCycle ? (
                    <StopCountButton  onClick={interruptCurrentCycle} type="submit">
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