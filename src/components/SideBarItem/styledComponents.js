import styled from 'styled-components'

export const CustomLi = styled.li`
  color: ${props => (props.isDarkTheme ? '#ffffff' : 'black')}
  list-style-type: none;
`
