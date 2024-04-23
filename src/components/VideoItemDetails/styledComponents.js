import styled from 'styled-components'

export const CustomDiv = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
  padding-bottom: 9px;
  width: 82%;
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`
export const CustomDisLike = styled.button`
  color: ${props => (props.isDisliked ? '#2563eb' : '#64748b')};
`
export const CustomLike = styled.button`
  color: ${props => (props.isLiked ? '#2563eb' : '#64748b')};
`
