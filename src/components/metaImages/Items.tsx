import React from 'react'
import Round from './Round'

const Items = ({ value, comparisons }: { value: number; comparisons: string[] }) => {
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
        <Round value={value} main />
        <Round comparison={comparisons[1]} value={comparisons[1] ? value : undefined} />
        <Round comparison={comparisons[3]} value={comparisons[3] ? value : undefined} />
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
        <Round comparison={comparisons[4]} value={comparisons[4] ? value : undefined} />
        <Round comparison={comparisons[0]} value={comparisons[0] ? value : undefined} />
        <Round comparison={comparisons[2]} value={comparisons[2] ? value : undefined} />
        <Round comparison={comparisons[5]} value={comparisons[5] ? value : undefined} />
      </div>
    </>
  )
}

export default Items
