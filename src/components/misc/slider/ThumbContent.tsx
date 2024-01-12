import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

const Value = styled.div`
  flex: 1;
  text-align: center;
`
const Edit = styled.div`
  cursor: pointer;
  display: block;
  margin-bottom: 0.2rem;
  width: 1rem;

  svg {
    display: block;
    height: auto;
    width: 100%;

    path {
      fill: var(--neutral-00);
    }
  }
`
export default function ThumbContent({
  value,
  unit,
  setOpenTextInput,
}: {
  value: number
  unit: string
  setOpenTextInput: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <>
      <Value data-testid='slider-thumb-content'>
        {value} {unit}
      </Value>
      <Edit
        onClick={() => {
          setOpenTextInput(true)
        }}
        onMouseDown={(e) => {
          e.stopPropagation()
        }}
        onTouchStart={(e) => {
          e.stopPropagation()
        }}>
        <svg
          data-testid='slider-thumb-content-edit'
          xmlns='http://www.w3.org/2000/svg'
          enableBackground='new 0 0 512 512'
          height='512'
          viewBox='0 0 512 512'
          width='512'>
          <path d='m292.545 325.52c-4.92 4.917-11 8.674-17.589 10.871l-63.641 21.213c-4.593 1.532-9.383 2.31-14.229 2.31 0 0 0 0-.001 0-12.021 0-23.321-4.681-31.82-13.181-12.131-12.134-16.295-29.778-10.87-46.051l21.214-63.638c2.195-6.591 5.955-12.675 10.87-17.59l137.455-137.454h-268.934c-30.327 0-55 24.673-55 55v320c0 30.327 24.673 55 55 55h320c30.327 0 55-24.673 55-55v-268.934z' />
          <path d='m207.693 240.668c-1.647 1.647-2.887 3.654-3.623 5.863l-21.214 63.639c-1.797 5.39-.394 11.332 3.623 15.35 4.018 4.018 9.96 5.421 15.35 3.623l63.64-21.213c2.21-.736 4.216-1.976 5.863-3.623l187.384-187.383-63.639-63.639z' />
          <path d='m476.393 7.322c-9.763-9.763-25.592-9.763-35.355 0l-24.749 24.749 63.64 63.64 24.749-24.749c9.763-9.763 9.763-25.592 0-35.355z' />
        </svg>
      </Edit>
    </>
  )
}
