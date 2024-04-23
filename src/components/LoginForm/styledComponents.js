import styled from 'styled-components'

export const CustomDiv = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#383838' : '#ffffff')};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
export const CustomCard = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#000000' : '#ffffff')};
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 450px;
  width: 450px;
  border-radius: 9px;
  border: 1px solid black;

  @media screen and (max-width: 576px) {
    height: 500px;
    width: 350px;
  }
`
export const CustomPara = styled.label`
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
`
export const CustomLogin = styled.button`
  width: 350px;
  height: 40px;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  background-color: #3b82f6;
  border: none;
  border-radius: 8px;
  margin-top: 8px;`
