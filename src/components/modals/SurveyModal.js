import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'components/providers/ModalProvider'
import Modal from 'components/base/Modal'

const StyledModal = styled(Modal)`
  padding: 0;
`
export default function SurveyModal() {
  const { survey: open, setSurvey: setOpen } = useContext(ModalContext)

  const [iframe, setIframe] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setIframe(true), 2500)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <StyledModal open={open} setOpen={setOpen}>
      {open || iframe ? (
        <iframe
          title='enquete'
          src='https://airtable.com/embed/shroHVp7DyXVn9YMf?backgroundColor=cyan'
          frameBorder='0'
          width='100%'
          height='533'
        ></iframe>
      ) : null}
    </StyledModal>
  )
}
