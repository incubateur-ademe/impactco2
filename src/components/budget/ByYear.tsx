'use client'

import { useState } from 'react'
import Select from 'components/form/Select'
import styles from './ByYear.module.css'

const budgets: Record<string, { description?: string; values: { label: string; value: string }[]; total: string }> = {
  2025: {
    description:
      "En 2025, Impact CO2 est un service pérennisé, porté par l'Accélérateur de la transition écologique au sein de l'ADEME. L’amélioration continue et le déploiement des outils existants se poursuivent, avec un accent plus fort mis sur le déploiement en 2025. Le budget présenté correspond au réalisé de janvier - octobre et au prévisionnel de novembre et décembre.",
    values: [
      { label: 'Déploiement', value: '283 422 €' },
      { label: 'Produit', value: '68 300 €' },
      { label: 'Design', value: '138 272 €' },
      { label: 'Développement', value: '82 600 €' },
      { label: 'Modèle', value: '58 825 €' },
      { label: 'Coaching', value: '0 €' },
    ],
    total: '631 419 €',
  },
  2024: {
    values: [
      { label: 'Déploiement', value: '161 329 €' },
      { label: 'Produit', value: '105 787 €' },
      { label: 'Design', value: '104 978 €' },
      { label: 'Développement', value: '166 641 €' },
      { label: 'Modèle', value: '5 479 €' },
      { label: 'Coaching', value: '50 688 €' },
    ],
    total: '594 901 €',
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
const ByYear = ({ labelId }: { labelId: string }) => {
  const [budget, setBudget] = useState(budgets['2025'])

  return (
    <>
      <Select
        className={styles.select}
        id='annee'
        label='Année'
        onChange={(e) => setBudget(budgets[e.target.value])}
        inline>
        <option value='2025'>2025</option>
        <option value='2024'>2024</option>
        <option value='2023'>2023</option>
      </Select>
      <br />
      <p>{budget.description}</p>
      <table className={styles.table} aria-labelledby={labelId}>
        <thead>
          <tr>
            <th scope='col'>Poste</th>
            <th scope='col'>
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
