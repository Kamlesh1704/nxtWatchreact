import styled from 'styled-components'

export const CustomFailure = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#000000' : '#f4f4f4')};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  height: 122vh;
  width: 82%;
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`
