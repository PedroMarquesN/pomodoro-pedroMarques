import {HistoryContainer, HistoryList, Status} from "./styles";
import {useContext} from "react";
import {CyclesContext} from "../../contexts/CyclesContext";
import {formatDistanceToNow} from "date-fns";
import {ptBR} from "date-fns/locale";

export function History() {
    const {cycles} = useContext(CyclesContext)
    return(
        <HistoryContainer>
            <h1>Meu Histórico</h1>

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
                                <td>{formatDistanceToNow(cycle.startDate, {
                                    addSuffix: true,
                                    locale: ptBR,
                                })}</td>
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