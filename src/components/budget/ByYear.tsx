'use client'

import React, { useState } from 'react'
import Select from 'components/form/Select'
import styles from './ByYear.module.css'

const budgets: Record<string, { description?: string; values: { label: string; value: string }[]; total: string }> = {
  2024: {
    description:
      "En 2024, Impact CO₂ est un service pérennisé, porté par l'Accélérateur de la transition écologique au sein de l'ADEME. L’amélioration continue et le déploiement du simulateur existant se poursuivent. 6 personnes travaillent pour Impact CO₂ (tout ou partie de leur temps). Le budget présenté est le budget prévisionnel jusqu'à fin 2024.",

    values: [
      { label: 'Développement produit', value: '342 933 €' },
      { label: 'Design', value: '115 200 €' },
      { label: 'Déploiement', value: '93 867 €' },
      { label: 'Coaching', value: '33 067 €' },
    ],
    total: '585 067 €',
  },
  2023: {
    values: [
      { label: 'Développement produit', value: '230 505 €' },
      { label: 'Design', value: '58 755 €' },
      { label: 'Déploiement', value: '101 063 €' },
      { label: 'Coaching', value: '10 368 €' },
    ],
    total: '409 691 €',
  },
}
const ByYear = () => {
  const [budget, setBudget] = useState(budgets['2024'])

  return (
    <>
      <Select
        className={styles.select}
        id='annee'
        label='Année'
        required
        onChange={(e) => setBudget(budgets[e.target.value])}>
        <option value='2024'>2024</option>
        <option value='2023'>2023</option>
      </Select>
      <br />
      {budget.description}
      <table className={styles.table}>
        <thead>
          <tr>
            <th />
            <th>
              <b>Total</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {budget.values.map(({ label, value }) => (
            <tr key={label}>
              <td>{label}</td>
              <td>
                <b>{value}</b>
              </td>
            </tr>
          ))}
          <tr className='total'>
            <td>Total</td>
            <td>
              <b>{budget.total}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default ByYear
