import styled from 'styled-components';

export const Caixa = styled.div`
    border: 0.25px solid rgba(54, 56, 46, 0.25);
    width: 30vw;
    height: 60vh;
    border-radius: 10px;
    background-image: linear-gradient(to right top, #051937, #5f2d60, #b84160, #ed793e, #e6cb17);
    
`

export const Form = styled.form`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`

export const Input = styled.input`
    display: block;
    width: 250px;
    height: 40px;
    padding: 6px 6px;
    margin-bottom: 15px;
    border-radius: 10px;
    border: 0.25px solid rgba(54, 56, 46, 0.25);
    box-shadow: 10px 5px 5px rgba(54, 56, 46, 0.25);
`