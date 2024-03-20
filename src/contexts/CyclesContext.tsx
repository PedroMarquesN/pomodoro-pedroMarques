import {createContext, ReactNode, useEffect, useReducer, useState} from "react";
import {Cycle, cyclesReducer} from '../reducers/cycles/reducer'
import {
    ActionTypes,
    addNewCycleAction,
    interruptCurrentCycleAction,
    markCurrentCycleFinishedAction
} from "../reducers/cycles/actions";
import {differenceInSeconds} from "date-fns";



interface CreateCycleData {
    task: string
    minutesAmount: number
}
interface CyclesContextProps {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    markCurrentCycleAsFinished: () => void
    amountSecondsPassed: number
    setSecondPassed: (seconds:number) => void
    createNewCycle:(data:CreateCycleData)=>void
    interruptCurrentCycle: () => void
}

interface CyclesContextProviderProps {
    children: ReactNode
}
export const CyclesContext = createContext({} as CyclesContextProps)


export function CyclesContextProvider({children}:CyclesContextProviderProps) {

    const [cyclesState, dispatch] = useReducer(cyclesReducer,
        {
        cycles: [],
        activeCycleId: null
    }, () => {
        const storedStateAsJSON = localStorage.getItem(
            '@pedro-pomodoro'
        )
            if(storedStateAsJSON){
                return JSON.parse(storedStateAsJSON)
            }
            return {
                cycles: [],
                activeCycleId: null
            };
        })

    const {cycles, activeCycleId} = cyclesState
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle){
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }
        return 0
    })



    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@pedro-pomodoro', stateJSON)
    }, [cyclesState]);



    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleFinishedAction())
    }


    function setSecondPassed(seconds:number) {
        setAmountSecondsPassed(seconds)
    }

    function createNewCycle(data:CreateCycleData) {
        const id = String(new Date().getTime())

        const newCycle:Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        dispatch(addNewCycleAction(newCycle))
        setAmountSecondsPassed(0)

    }

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction())


    }


    return(
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                markCurrentCycleAsFinished,
                amountSecondsPassed,
                setSecondPassed,
                createNewCycle,
                interruptCurrentCycle
        }}>
            {children}

        </CyclesContext.Provider>
    )
}