import styled from 'styled-components'

export const CustomListt = styled.ul`
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
  padding-bottom: 9px;
  margin: 0px;
  padding: 50px;
  list-style-type: none;
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
  padding-top: 50px;
  height: 120vh;
  width: 82%;
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`
export const SavedContainer = styled.div`
  background-color: #0f0f0f;
`