import { styled } from "styled-components";

export const InputForm = styled.form`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;`

export const MyContainer = styled.div`
    width: 90%;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    box-shadow:0px 0px 5px 5px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    @media (min-width:920px){
        max-width:920px;
    }`;

    
export const ContainerHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items:center;
    padding: 1rem 2rem;
    box-sizing: border-box;
    gap: 2rem;
    background-color: #2a2b29;
    @media (min-width:920px){
        padding: 1rem calc(50% - 460px);
    }
    
`
export const Registro = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
`

export const SelectContainer = styled.div`
    margin-bottom: 10px;
`

export const EditContainer = styled.div`
display:flex;
justify-content:space-between;
margin-top:10px;`

export const TitleG = styled.div`
text-align: center;
margin-bottom: 10px;
font-size: 1.3em;
font-weight: bold;
color: #0e308f;
`

export const ContainerCenter=styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #b6dceb;
`

export const ContainerTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items:  center;
  justify-content: flex-start;
  background-color: #b6dceb;
`
export const ContainerLogin = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    width: 95%;
    padding: 1rem;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: .3rem;
    box-shadow: 0 0 5px 5px rgba(0,0,0,.1);
    @media (min-width:500px){
        width: 500px;
    }
`

