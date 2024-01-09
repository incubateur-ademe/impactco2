import React from 'react'
import { FacebookShareButton } from 'react-share'
import styled from 'styled-components'

const Svg = styled.svg``

export default function Facebook2(props) {
  return (
    <FacebookShareButton url={props.url} quote={props.quote} aria-label='Partager sur facebook'>
      <Svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg'>
        <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <g id='fbz'>
            <rect id='Rectangle' fill='#1B9B93' x='0' y='0' width='60' height='60' rx='8' />
            <path
              d='M40,30.0612423 C40,24.5044369 35.5230596,20 30.0012498,20 C24.4769404,20.0012498 20,24.5044369 20,30.0624922 C20,35.0831146 23.6570429,39.2450944 28.4364454,40 L28.4364454,32.9696288 L25.8992626,32.9696288 L25.8992626,30.0624922 L28.4389451,30.0624922 L28.4389451,27.8440195 C28.4389451,25.3230846 29.9325084,23.9307587 32.215973,23.9307587 C33.3108361,23.9307587 34.4544432,24.1269841 34.4544432,24.1269841 L34.4544432,26.6016748 L33.1933508,26.6016748 C31.952256,26.6016748 31.5648044,27.3778278 31.5648044,28.1739783 L31.5648044,30.0612423 L34.3369579,30.0612423 L33.8945132,32.968379 L31.5635546,32.968379 L31.5635546,39.9987502 C36.3429571,39.2438445 40,35.0818648 40,30.0612423 Z'
              id='Shape'
              fill='#FFFFFF'
              fillRule='nonzero'
            />
          </g>
        </g>
      </Svg>
    </FacebookShareButton>
  )
}
