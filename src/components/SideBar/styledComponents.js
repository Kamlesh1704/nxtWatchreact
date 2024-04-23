import styled from 'styled-components'

export const CustomSideBar = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#383838' : '#ffffff')};
  width: 18%;
  height: 122vh;
  color: ${props => (props.isDarkTheme ? '#ffffff' : 'black')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 8px;
  cursor: grab;
  @media screen and (max-width: 576px) {
    display: none;
  }
`
