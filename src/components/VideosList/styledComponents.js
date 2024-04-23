import styled from 'styled-components'

export const CustomDiv = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
  padding-bottom: 9px;
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`
