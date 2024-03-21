import styled from 'styled-components'
import Link from 'components/base/buttons/Link'

export default function ReuseBulb() {
  return (
    <>
      <UseBulb>
        <UseBulbTitle>
          <div>
            <svg width='11' height='17' viewBox='0 0 22 35' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M22 10.92C22 17.359 17 18.359 17 24.36C17 27.458 13.877 27.719 11.5 27.719C9.447 27.719 4.914 26.94 4.914 24.358C4.914 18.36 0 17.36 0 10.92C0 4.889 5.285 0 11.083 0C16.883 0 22 4.889 22 10.92Z'
                fill='#FFD983'
              />
              <path
                d='M15.167 32.36C15.167 33.188 12.933 34.86 11 34.86C9.067 34.86 6.833 33.188 6.833 32.36C6.833 31.532 9.066 31.86 11 31.86C12.933 31.86 15.167 31.532 15.167 32.36Z'
                fill='#CCD6DD'
              />
              <path
                d='M15.707 10.153C15.316 9.76201 14.684 9.76201 14.293 10.153L11 13.446L7.707 10.153C7.316 9.76201 6.684 9.76201 6.293 10.153C5.902 10.544 5.902 11.176 6.293 11.567L10 15.274V25.86C10 26.413 10.448 26.86 11 26.86C11.552 26.86 12 26.413 12 25.86V15.274L15.707 11.567C16.098 11.176 16.098 10.544 15.707 10.153Z'
                fill='#FFCC4D'
              />
              <path
                d='M17 30.86C17 31.964 16.104 32.86 15 32.86H7C5.896 32.86 5 31.964 5 30.86V24.86H17V30.86Z'
                fill='#99AAB5'
              />
              <path
                d='M4.999 31.86C4.519 31.86 4.095 31.513 4.014 31.024C3.923 30.48 4.291 29.964 4.836 29.874L16.836 27.874C17.38 27.776 17.896 28.151 17.986 28.696C18.077 29.24 17.709 29.756 17.164 29.846L5.164 31.846C5.109 31.856 5.053 31.86 4.999 31.86ZM4.999 27.86C4.519 27.86 4.095 27.513 4.014 27.024C3.923 26.48 4.291 25.964 4.836 25.874L16.836 23.874C17.38 23.777 17.896 24.151 17.986 24.696C18.077 25.24 17.709 25.756 17.164 25.846L5.164 27.846C5.109 27.856 5.053 27.86 4.999 27.86Z'
                fill='#CCD6DD'
              />
            </svg>
          </div>
          <div>&nbsp;Utiliser cette ressource</div>
        </UseBulbTitle>
        <p>
          Consultez le{' '}
          <Link priority='secondary' href='/guide-utilisation' title='Découvrir des exemples de réutilisation'>
            guide d'utilisation Impact CO<sub>2</sub>
          </Link>{' '}
          pour vous emparer facilement du simulateur et l’intégrer à votre publication.
        </p>
        <p>Besoin d'inspiration?</p>
        <p style={{ marginBottom: 0 }}>
          <Link
            priority='secondary'
            href='https://accelerateur-transition-ecologique-ademe.notion.site/2274283430e94d1db71eced54c338997? '
            title='Découvrir des exemples de réutilisation – Nouvelle fenêtre'>
            Découvrez des exemples de réutilisation
          </Link>
        </p>
      </UseBulb>
      <GoFurther>
        <details>
          <summary>
            <span>Aller plus loin</span>
          </summary>
          <GoFurtherFirstParagraph>
            Pour réutiliser les données brutes ou obtenir de l’aide pour intégrer ce simulateur, contactez-nous par mail
            à{' '}
            <BlackLink href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>
              {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
            </BlackLink>
            .
          </GoFurtherFirstParagraph>
          <GoFurtherSecondParagraph>
            Pour réutiliser <BlackLink href='https://github.com/incubateur-ademe/impactco2/'>le code</BlackLink> du
            simulateur, consultez le code du site Impact CO<sub>2</sub>, développé de manière ouverte (
            <i>open source</i>).
          </GoFurtherSecondParagraph>
        </details>
      </GoFurther>
      <br />
    </>
  )
}

const UseBulb = styled.div`
  background-color: var(--secondary-10);
  border-radius: 8px;
  color: var(--neutral-70);
  margin-top: 2rem;
  padding: 24px;
  position: relative;
`

const UseBulbTitle = styled.div`
  align-items: center;
  background-color: var(--neutral-00);
  border: 2px solid #ebf2ff;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 2px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: flex;
  font-weight: 500;
  justify-content: center;
  padding: 8px;
  position: absolute;
  top: -21px;
`

const BlackLink = styled(Link)`
  color: var(--neutral-70);
  > svg {
    display: none;
  }
`

const GoFurther = styled.div`
  border: 1px solid #eae5e8;
  border-radius: 8px;
  margin-top: 1rem;
  padding: 1rem;
  details > summary {
    padding-right: 1rem;
  }
  summary {
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
    span {
      padding-left: 0.5rem;
    }
  }
`

const GoFurtherFirstParagraph = styled.div`
  margin-top: 2rem;
`

const GoFurtherSecondParagraph = styled.div`
  margin-top: 0.5rem;
`
