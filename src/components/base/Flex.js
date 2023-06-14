import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
`

Flex.End = styled(Flex)`
  justify-content: flex-end;
`

Flex.Between = styled(Flex)`
  justify-content: space-between;
`

export default Flex
