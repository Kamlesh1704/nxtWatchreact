import styled from 'styled-components'

export const CustomButton = styled.button`
  background-color: transparent;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#3b82f6')};
  border-radius: 5px;
  height: 35px;
  width: 100px;
  margin-right: 10px;
  font-size: 16px;
  border: ${props =>
    props.isDarkTheme ? '1px solid #ffffff' : '1px solid #3b82f6'};
`
export const CustomHeader = styled.nav`
  background-color: ${props => (props.isDarkTheme ? '#383838' : '#ffffff')};
  display: flex;
  align-item: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
`
export const CustomPopup = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#383838' : '#ffffff')};
  height: 190px;
  width: 400px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`
export const CustomLine = styled.div`
  display: none;
  @media screen and (max-width: 576px) {
    display: inline;
    font-size: 42px;
    color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  }
`
export const CustomPopupSm = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#383838' : '#ffffff')};
  height: 390px;
  width: 350px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  color: ${props => (props.isDarkTheme ? '#ffffff' : 'black')};
`

export const CustomLogOut = styled.button`
  font-size: 25px;
  border: none;
  background: none;
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
`
export const CustomSmLink = styled.div`
  color: ${props => (props.isDarkTheme ? '#ffffff' : 'black')};
  display: flex;
  align-items: center;
  margin-left: 90px;
`
