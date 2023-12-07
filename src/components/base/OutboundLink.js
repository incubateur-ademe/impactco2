import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

export default function OutboundLink(props) {
  return (
    <>
      <Wrapper color={props.color}>
        <Link
          title={props.title}
          target='_blank'
          rel='noreferrer noopener'
          href={props.href}
          data-testid={props['data-testid']}
          onClick={props.onClick}>
          {props.children}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-box-arrow-up-right'
            viewBox='0 0 16 16'>
            <path
              fillRule='evenodd'
              d='M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z'
            />
            <path
              fillRule='evenodd'
              d='M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z'
            />
          </svg>
        </Link>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.span`
  > a {
    color: ${(props) => () => {
      return props.color === 'black' ? props.theme.colors.persistentText : props.theme.colors.firstBlue
    }};
  }
  svg {
    margin-left: 0.25rem;
  }
`
