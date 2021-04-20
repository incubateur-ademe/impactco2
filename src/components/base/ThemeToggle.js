import React, { useContext } from 'react'
import styled from 'styled-components'
import Switch from 'react-switch'

import StyleContext from 'utils/StyleContext'
import UXContext from 'utils/UXContext'

const Wrapper = styled.div`
  position: fixed;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;

  ${(props) => props.theme.mq.medium} {
    position: relative;
    left: 0;
    right: 0;
    display: ${(props) => (props.mobile ? 'block' : 'none')};
    margin-bottom: 2rem;
    text-align: center;
  }
`
const Svg = styled.svg`
  position: absolute;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1.2rem;
  height: auto;
`
export default function Visible(props) {
  const { themes, accessibility, setAccessibility } = useContext(StyleContext)
  const { embedOpen } = useContext(UXContext)

  return (
    !embedOpen && (
      <Wrapper mobile={props.mobile}>
        <Switch
          onChange={() =>
            setAccessibility((prevAccessibility) => !prevAccessibility)
          }
          checked={accessibility}
          offColor={themes.classic.colors.ter}
          onColor={themes.classic.colors.ter}
          offHandleColor={themes.classic.colors.background}
          onHandleColor={themes.classic.colors.background}
          uncheckedIcon={
            <Svg x='0px' y='0px' viewBox='0 0 469.333 469.333'>
              <path
                fill={themes.classic.colors.background}
                d='M234.667,170.667c-35.307,0-64,28.693-64,64s28.693,64,64,64s64-28.693,64-64S269.973,170.667,234.667,170.667z'
              />
              <path
                fill={themes.classic.colors.background}
                d='M234.667,74.667C128,74.667,36.907,141.013,0,234.667c36.907,93.653,128,160,234.667,160     c106.773,0,197.76-66.347,234.667-160C432.427,141.013,341.44,74.667,234.667,74.667z M234.667,341.333     c-58.88,0-106.667-47.787-106.667-106.667S175.787,128,234.667,128s106.667,47.787,106.667,106.667     S293.547,341.333,234.667,341.333z'
              />
            </Svg>
          }
          checkedIcon={
            <Svg x='0px' y='0px' viewBox='0 0 379.561 379.561'>
              <path
                fill={themes.classic.colors.background}
                d='M320.838,121.929c-7.321-5.677-15.604-11.61-24.664-17.362L341.498,58.6c6.204-6.292,6.133-16.423-0.16-22.627  c-6.292-6.204-16.422-6.134-22.626,0.159L267.12,88.456c-23.253-11.018-49.587-18.963-77.192-18.963l-0.991,0.003  c-52.262,0.369-99.981,29.932-130.81,54.667C27.632,148.631-0.073,180.32,0,190.649c0.082,11.702,26.981,42.234,58.737,66.671  c6.646,5.114,15.073,11.145,24.875,17.249L37.87,320.962c-6.204,6.292-6.133,16.423,0.16,22.627  c3.117,3.074,7.175,4.607,11.233,4.607c4.132,0,8.263-1.591,11.394-4.766l52.21-52.951c22.666,10.535,49.101,18.651,76.752,18.651  l1.007-0.003c55.525-0.392,105.776-33.566,130.788-53.307c31.603-24.942,58.231-56.011,58.148-67.845  C379.484,176.988,352.043,146.126,320.838,121.929z M111.314,189.864c-0.305-43.336,34.578-78.714,77.913-79.019  c15.975-0.113,30.86,4.569,43.314,12.681l-107.938,109.47C116.318,220.657,111.427,205.839,111.314,189.864z M190.334,267.777  c-15.784,0.111-30.5-4.462-42.863-12.396l107.777-109.308c8.107,12.25,12.887,26.9,12.999,42.684  C268.552,232.094,233.669,267.472,190.334,267.777z'
              />
            </Svg>
          }
        />
      </Wrapper>
    )
  )
}
