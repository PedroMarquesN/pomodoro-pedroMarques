import {HistoryContainer, HistoryList, Status} from "./styles";
import {useContext} from "react";
import {CyclesContext} from "../../contexts/CyclesContext";

export function History() {
    const {cycles} = useContext(CyclesContext)
    return(
        <HistoryContainer>
            <h1>Meu Histórico</h1>

            <pre>
                {JSON.stringify(cycles, null , 2)}
            </pre>
            <HistoryList>
                <table>
                    <thead>
                    <tr>
                        <th>Tarefa</th>
                        <th>Duração</th>
                        <th>Início</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cycles.map(cycle => {
                        return (
                            <tr key={cycle.id}>
                                <td>{cycle.task}</td>
                                <td>{cycle.minutesAmount} minutos</td>
                                <td>{cycle.startDate.toISOString()}</td>
                                <td>
                                    {cycle.finishedDate && <Status statusColor="green">Concluído</Status>}
                                    {cycle.interruptDate && <Status statusColor="red">Interrompido</Status>}
                                    {!cycle.interruptDate && !cycle.finishedDate && <Status statusColor="yellow">Pendente</Status>}
                                </td>
                            </tr>
                        )
                    })}

                    </tbody>
                </table>

            </HistoryList>
        </HistoryContainer>

    )
}