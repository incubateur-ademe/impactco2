import React, { useState, useEffect, useContext } from 'react'

import RulesContext from 'utils/RulesContext'
import Section from 'components/base/Section'
import Summary from './test/Summary'
import CategoryStart from './test/CategoryStart'
import Questions from './test/Questions'
import CategoryEnd from './test/CategoryEnd'
import End from './test/End'

export default function Test() {
  const { categories, curCategory, setCurCategory } = useContext(RulesContext)

  const [status, setStatus] = useState('notstarted')

  useEffect(() => {
    !curCategory && setCurCategory(categories[0])
  }, [curCategory, setCurCategory, categories])

  useEffect(() => {
    setStatus('notstarted')
  }, [curCategory])

  return curCategory ? (
    <Section>
      <Section.Content>
        <Summary />
        {curCategory !== 'end' ? (
          status === 'notstarted' ? (
            <CategoryStart setStatus={setStatus} />
          ) : status === 'started' ? (
            <Questions setStatus={setStatus} />
          ) : (
            <CategoryEnd />
          )
        ) : (
          <End />
        )}
      </Section.Content>
    </Section>
  ) : null
}
