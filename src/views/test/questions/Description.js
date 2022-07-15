import React from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

const StyledReactMarkdown = styled(ReactMarkdown)`
  font-size: 0.875rem;
`
export default function Description(props) {
  return (
    <StyledReactMarkdown>{props.rule.rawNode.description}</StyledReactMarkdown>
  )
}
