import {createContext, ReactNode, useReducer, useState} from "react";
import {ActionTypes, Cycle, cyclesReducer} from '../reducers/cycles'



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
    })

    const {cycles, activeCycleId} = cyclesState
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    function markCurrentCycleAsFinished() {
        dispatch({
            type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
            payload: {
                activeCycleId
            }
        })
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

        dispatch({
            type: ActionTypes.ADD_NEW_CYCLE,
            payload: {
                newCycle
            }
        })
        setAmountSecondsPassed(0)

    }

    function interruptCurrentCycle() {
        dispatch({
            type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
            payload: {
                activeCycleId
            }
        })


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