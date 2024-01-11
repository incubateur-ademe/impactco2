import React, { useState } from 'react'
import { Section, SectionWideContent } from 'components/base/Section'
import Link from 'components/base/buttons/Link'
import Select from 'components/form/Select'
import { Box, List, Table } from './Budget.styles'

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

const Budget = () => {
  const [budget, setBudget] = useState(budgets['2024'])

  return (
    <Section>
      <SectionWideContent $size='sm'>
        <h1>Budget</h1>
        Impact CO<sub>2</sub> est un service public numérique, c’est pourquoi nous sommes transparents sur les
        ressources allouées et la manière dont elles sont employées.
        <br />
        <br />
        <br />
        <h2>Principes</h2>
        Nous suivons le <Link href='https://beta.gouv.fr/manifeste'>manifeste beta.gouv</Link> dont nous rappelons les
        principes ici :
        <Box>
          <List>
            <li>Les besoins des utilisateurs sont prioritaires sur les besoins de l’administration</li>
            <li>Le mode de gestion de l’équipe repose sur la confiance</li>
            <li>L’équipe adopte une approche itérative et d’amélioration en continu</li>
          </List>
        </Box>
        <br />
        <br />
        <h2>Fonctionnement</h2>
        Impact CO<sub>2</sub> est une start-up d’état : l’équipe est donc portée par un intrapreneur qui est responsable
        du service numérique développé au sein de son administration (l’ADEME en l’occurence).
        <br />
        Son rôle est multiple : déploiement, gestion des produits, référent auprès de son administration (budget, compte
        rendus d’avancement).
        <br />
        Le budget exposé ici ne prend pas en compte l’intrapeneur puisque qu’il est salarié de l’ADEME mais concerne les
        membres de l’équipe.
        <br />
        <br />
        <br />
        <h2>Budget consommé</h2>
        <Select id='annee' label='Année' required onChange={(e) => setBudget(budgets[e.target.value])}>
          <option value='2024'>2024</option>
          <option value='2023'>2023</option>
        </Select>
        <br />
        <br />
        {budget.description}
        <Table>
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
        </Table>
        <br />
        <br />
        <h3>Description des catégories de coût</h3>
        <List>
          <li>
            <b>Développement, déploiement, produit, design 👨‍💻</b>
            <br />
            Les coûts de développement, produit, déploiement et design représentent la grande majorité de notre budget.
            Nous sommes une petite équipe de 6 freelances, pluridisciplinaires aussi bien sur les aspects techniques,
            stratégiques et métiers.
          </li>
          <li>
            <b>Logiciels et hébergement 💻</b>
            <br />
            Notre modèle open-source nous permet d’accéder gratuitement à la majorité des outils que nous utilisons
            (hébergement de code, serveurs de tests, etc.). Le site est hébergé sur{' '}
            <Link href='https://scalingo.com/'>Scalingo</Link>.
          </li>
        </List>
        <br />
        <br />
        <br />
        <Box>
          <p>
            <b>À propos de la TVA</b>
          </p>
          Contrairement aux entreprises du secteur privé, les administrations ne peuvent pas récupérer la TVA supportée
          sur leurs achats dans le cadre de leur activité.
          <br />
          <br />
          Le montant TTC inclut la TVA au taux de 20%.
          <br />
          <br />
          La TVA est collectée et reversée à l'État et diminue donc le montant du budget utilisable sur le projet.
        </Box>
      </SectionWideContent>
    </Section>
  )
}

export default Budget
