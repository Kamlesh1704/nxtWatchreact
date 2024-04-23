import styled from 'styled-components'

export const CustomList = styled.ul`
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
  padding-bottom: 9px;
  margin: 0px;
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
`
export const CustomHeadingDiv = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#212121' : ' #cccccc')};
  display: flex;
  align-items: center;
  padding-left: 50px;
  height: 140px;
  margin: 0px;
  justify-content: space-between;
`
export const CustomFailure = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#000000' : '#f4f4f4')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120vh;
  height: 122vh;
`
