import React, { MouseEvent, ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import Link from 'components/base/buttons/Link'

const Wrapper = styled.div`
  position: relative;
`
const List = styled.div`
  background-color: var(--neutral-00);
  border: solid 1px var(--neutral-20);
  border-radius: 0 0 1rem 1rem;
  border-top: 0;
  box-shadow: -0.25rem 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.05);
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 100%;
  z-index: 999;
  a {
    padding: 0.5rem 0.75rem !important;
    width: 300px;
  }
`
const ButtonDropdown = styled.button<{ $open: boolean }>`
  align-items: center;
  background-color: ${(props) => (props.$open ? 'var(--primary-10)' : 'transparent')};
  border: none;
  color: #161616;
  cursor: pointer;
  display: flex;
  font-size: 0.875rem;
  height: 100%;
  ${MEDIA.LT.MEDIUM} {
    font-size: 0.75rem;
  }
  ${MEDIA.LT.SMALL} {
    font-size: 0.875rem;
  }
  line-height: 1.4;
  padding: 1rem 0.75rem;
  position: relative;
  text-decoration: none;
  width: 100%;

  &:hover {
    background-color: var(--primary-10);
  }

  svg {
    margin-left: 0.5rem;
    transform: rotate(${(props) => (props.$open ? 180 : 0)}deg);

    path {
      fill: #161616;
    }
  }
`
export default function Dropdown({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const handleClick = () => setOpen(false)
  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <Wrapper>
      <ButtonDropdown
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation()
          setOpen((prevOpen) => !prevOpen)
        }}
        $open={open}
        as={children ? 'button' : Link}>
        {label}
        {'  '}
        <svg width='10' height='6' viewBox='0 0 10 6'>
          <path d='M4.99997 5.85012C4.82075 5.85012 4.64155 5.78169 4.50491 5.64512L0.205141 1.3453C-0.0683804 1.07178 -0.0683804 0.628311 0.205141 0.3549C0.478552 0.0814886 0.921932 0.0814886 1.19548 0.3549L4.99997 4.15961L8.80449 0.355032C9.07801 0.0816214 9.52134 0.0816214 9.79473 0.355032C10.0684 0.628443 10.0684 1.07191 9.79473 1.34543L5.49503 5.64525C5.35832 5.78184 5.17912 5.85012 4.99997 5.85012Z' />
        </svg>
      </ButtonDropdown>
      {open && <List>{children}</List>}
    </Wrapper>
  )
}

Dropdown.Item = styled(Link)<{ $current: boolean }>`
  color: ${(props) => (props.$current ? 'var(--primary-50)' : 'var(--neutral-70)')};
  display: flex;
  font-size: 0.875rem;
  justify-content: space-between;
  padding: 0.75rem 2.5rem 0.5rem 1.5rem;
  position: relative;
  text-decoration: none;
  white-space: nowrap;

  &:not(:last-child)::before {
    background-color: var(--neutral-20);
    bottom: 0;
    content: '';
    height: 0.0625rem;
    left: 1rem;
    position: absolute;
    right: 1rem;
  }

  &:hover {
    background-color: var(--secondary-80);
  }
`
