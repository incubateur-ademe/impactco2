import React from 'react'
import Round from './Round'

const Items = ({ value, comparisons, language }: { value: number; comparisons: string[]; language: string }) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '60px',
          right: '280px',
          gap: '1.25rem',
        }}>
        <Round language={language} value={value} main />
        <Round language={language} comparison={comparisons[1]} value={comparisons[1] ? value : undefined} />
        <Round language={language} comparison={comparisons[3]} value={comparisons[3] ? value : undefined} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '-32px',
          right: '80px',
          gap: '1.25rem',
        }}>
        <Round language={language} comparison={comparisons[4]} value={comparisons[4] ? value : undefined} />
        <Round language={language} comparison={comparisons[0]} value={comparisons[0] ? value : undefined} />
        <Round language={language} comparison={comparisons[2]} value={comparisons[2] ? value : undefined} />
        <Round language={language} comparison={comparisons[5]} value={comparisons[5] ? value : undefined} />
      </div>
    </>
  )
}

export default Items
