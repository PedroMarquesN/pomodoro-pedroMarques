import styled from "styled-components";

export const HomeContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }
`

const BaseCountButton = styled.button`
    width: 100%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    color:${props => props.theme['gray-100']};
    gap: 0.5rem;
    
    cursor: pointer;


    
    
    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

`

export const StartCountButton = styled(BaseCountButton)`
    background:${props => props.theme['green-500']};
    
    &:not(:disabled):hover {
        background:${props => props.theme['green-700']};

    }
    
`

export const StopCountButton = styled(BaseCountButton)`
    background:${props => props.theme['red-500']};
    

    &:not(:disabled):hover {
        background:${props => props.theme['red-700']};

    }
`



