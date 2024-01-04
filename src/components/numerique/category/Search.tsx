import React, { useContext, useState } from 'react'
import { track } from 'utils/matomo'
import RulesContextNumerique from '../RulesProviderNumerique'
import {
  Color,
  Desktop,
  Label,
  Parameters,
  ShowMore,
  Small,
  StyledHorizontalRadio,
  StyledSelect,
  StyledSlider,
  Wrapper,
} from './Search.styles'

export default function Search() {
  // @ts-expect-error: TODO
  const { engine, setSituation, numberEmails, setNumberEmails } = useContext(RulesContextNumerique)

  const [display, setDisplay] = useState('')

  return engine ? (
    <Wrapper>
      <div>
        <Label>
          <strong>
            {numberEmails} <Color color='#6C8CC1'>email{numberEmails > 1 ? 's' : ''}</Color>
          </strong>{' '}
          envoyé{numberEmails > 1 ? 's' : ''} <Small>par semaine</Small>
        </Label>
        <Parameters>
          <ShowMore
            onClick={() => setDisplay((prevDisplay) => (prevDisplay === 'email' ? '' : 'email'))}
            color='#6C8CC1'>
            <svg height='512' viewBox='0 0 24 24' width='512'>
              <path d='m17 5a3 3 0 1 1 3 3 3 3 0 0 1 -3-3zm-15 1h12a1 1 0 0 0 0-2h-12a1 1 0 0 0 0 2zm6 3a3 3 0 0 0 -2.82 2h-3.18a1 1 0 0 0 0 2h3.18a3 3 0 1 0 2.82-4zm14 2h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zm-12 7h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zm12 0h-3.18a3 3 0 1 0 0 2h3.18a1 1 0 0 0 0-2z' />
            </svg>
          </ShowMore>
          <StyledSlider
            tracking={['Usage numérique', 'Slider email', 'usage-numerique-slider-email']}
            color='#6C8CC1'
            min={0}
            max={1500}
            value={numberEmails}
            onChange={setNumberEmails}
          />
        </Parameters>
        <Desktop $visible={display === 'email'}>
          <StyledSelect
            name='email . appareil'
            value={`'${engine.evaluate('email . appareil').nodeValue}'`}
            onChange={({ value }) => {
              track('Usage numérique', 'Select email appareil', `usage-numerique-email-appareil-${value}`)
              setSituation({ ['email . appareil']: value })
            }}
            color='#6C8CC1'>
            <option value={`'smartphone'`}>Smartphone</option>
            <option value={`'tablette'`}>Tablette</option>
            <option value={`'ordinateur portable'`}>Ordinateur portable</option>
            <option value={`'ordinateur et écran'`}>Ordinateur fixe</option>
          </StyledSelect>
          <Parameters>
            <StyledHorizontalRadio
              name='email . transmission . émetteur . réseau'
              value={`'${engine.evaluate('email . transmission . émetteur . réseau').nodeValue}'`}
              onChange={(value: string) => {
                track('Usage numérique', 'Select email réseau', `usage-numerique-email-reseau-${value}`)
                setSituation({
                  ['email . transmission . émetteur . réseau']: value,
                })
              }}
              options={[
                {
                  value: `'fixe FR'`,
                  label: `Wifi`,
                },
                {
                  value: `'mobile FR'`,
                  label: `4G`,
                },
              ]}
              color='#6C8CC1'
            />
            <StyledSelect
              name='email . taille'
              value={engine.evaluate('email . taille').nodeValue}
              onChange={({ value }) => {
                track('Usage numérique', 'Select email taille', `usage-numerique-email-taille-${value}`)
                setSituation({ ['email . taille']: value })
              }}
              color='#6C8CC1'>
              <option value={0.075}>Sans pièce jointe</option>
              <option value={1}>Pièce jointe 1Mo</option>
              <option value={10}>Pièce jointe 5Mo</option>
            </StyledSelect>
          </Parameters>
        </Desktop>
      </div>
      <div>
        <Label>
          <strong>{engine.evaluate(`streaming . durée`).nodeValue / 60}h</strong> de{' '}
          <strong>
            <Color color='#C25166'>streaming</Color>
          </strong>{' '}
          <Small>par semaine</Small>
        </Label>
        <Parameters>
          <ShowMore
            onClick={() => setDisplay((prevDisplay) => (prevDisplay === 'streaming' ? '' : 'streaming'))}
            color='#C25166'>
            <svg height='512' viewBox='0 0 24 24' width='512'>
              <path d='m17 5a3 3 0 1 1 3 3 3 3 0 0 1 -3-3zm-15 1h12a1 1 0 0 0 0-2h-12a1 1 0 0 0 0 2zm6 3a3 3 0 0 0 -2.82 2h-3.18a1 1 0 0 0 0 2h3.18a3 3 0 1 0 2.82-4zm14 2h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zm-12 7h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zm12 0h-3.18a3 3 0 1 0 0 2h3.18a1 1 0 0 0 0-2z' />
            </svg>
          </ShowMore>
          <StyledSlider
            tracking={['Usage numérique', 'Slider streaming', 'usage-numerique-slider-streaming']}
            color='#C25166'
            min={0}
            max={4200}
            step={60}
            value={engine.evaluate(`streaming . durée`).nodeValue}
            onChange={(value: number) =>
              setSituation({
                [`streaming . durée`]: value,
              })
            }
          />
        </Parameters>
        <Desktop $visible={display === 'streaming'}>
          <StyledSelect
            name='streaming . appareil'
            value={`'${engine.evaluate('streaming . appareil').nodeValue}'`}
            onChange={({ value }) => {
              track('Usage numérique', 'Select streaming appareil', `usage-numerique-streaming-appareil-${value}`)
              setSituation({ ['streaming . appareil']: value })
            }}
            color='#C25166'>
            <option value={`'smartphone'`}>Smartphone</option>
            <option value={`'tablette'`}>Tablette</option>
            <option value={`'ordinateur portable'`}>Ordinateur portable</option>
            <option value={`'ordinateur et écran'`}>Ordinateur fixe</option>
            <option value={`'TV'`}>Télévision</option>
          </StyledSelect>
          <Parameters>
            <StyledHorizontalRadio
              name='streaming . transmission . réseau'
              value={`'${engine.evaluate('streaming . transmission . réseau').nodeValue}'`}
              onChange={(value: string) => {
                track('Usage numérique', 'Select streaming réseau', `usage-numerique-streaming-reseau-${value}`)
                setSituation({
                  ['streaming . transmission . réseau']: value,
                })
              }}
              options={[
                {
                  value: `'fixe FR'`,
                  label: `Wifi`,
                },
                {
                  value: `'mobile FR'`,
                  label: `4G`,
                },
              ]}
              color='#C25166'
            />
            <StyledSelect
              name='streaming . qualité'
              value={`'${engine.evaluate('streaming . qualité').nodeValue}'`}
              onChange={({ value }) => {
                track('Usage numérique', 'Select streaming qualité', `usage-numerique-streaming-qualite-${value}`)
                setSituation({ ['streaming . qualité']: value })
              }}
              color='#C25166'>
              <option value={`'SD'`}>Basse déf</option>
              <option value={`'HD'`}>Haute Déf</option>
              <option value={`'ultra HD'`}>4K</option>
            </StyledSelect>
          </Parameters>
        </Desktop>
      </div>
      <div>
        <Label>
          <strong>{engine.evaluate(`visio . durée`).nodeValue / 60}h</strong> de{' '}
          <strong>
            <Color color='#3DC7AB'>visioconférence</Color>
          </strong>{' '}
          <Small>par semaine</Small>
        </Label>
        <Parameters>
          <ShowMore
            onClick={() => setDisplay((prevDisplay) => (prevDisplay === 'visio' ? '' : 'visio'))}
            color='#3DC7AB'>
            <svg height='512' viewBox='0 0 24 24' width='512'>
              <path d='m17 5a3 3 0 1 1 3 3 3 3 0 0 1 -3-3zm-15 1h12a1 1 0 0 0 0-2h-12a1 1 0 0 0 0 2zm6 3a3 3 0 0 0 -2.82 2h-3.18a1 1 0 0 0 0 2h3.18a3 3 0 1 0 2.82-4zm14 2h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zm-12 7h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zm12 0h-3.18a3 3 0 1 0 0 2h3.18a1 1 0 0 0 0-2z' />
            </svg>
          </ShowMore>
          <StyledSlider
            tracking={['Usage numérique', 'Slider visio', 'usage-numerique-slider-visio']}
            color='#3DC7AB'
            min={0}
            max={4200}
            step={60}
            value={engine.evaluate(`visio . durée`).nodeValue}
            onChange={(value: number) =>
              setSituation({
                [`visio . durée`]: value,
              })
            }
          />
        </Parameters>
        <Desktop $visible={display === 'visio'}>
          <StyledSelect
            name='visio . appareil'
            value={`'${engine.evaluate('visio . appareil').nodeValue}'`}
            onChange={({ value }) => {
              track('Usage numérique', 'Select visio appareil', `usage-numerique-visio-appareil-${value}`)
              setSituation({ ['visio . appareil']: value })
            }}
            color='#3DC7AB'>
            <option value={`'smartphone'`}>Smartphone</option>
            <option value={`'tablette'`}>Tablette</option>
            <option value={`'ordinateur portable'`}>Ordinateur portable</option>
            <option value={`'ordinateur et écran'`}>Ordinateur fixe</option>
            <option value={`'TV'`}>Télévision</option>
          </StyledSelect>
          <Parameters>
            <StyledHorizontalRadio
              name='visio . transmission . réseau'
              value={`'${engine.evaluate('visio . transmission . réseau').nodeValue}'`}
              onChange={(value: string) => {
                track('Usage numérique', 'Select visio réseau', `usage-numerique-visio-reseau-${value}`)
                setSituation({
                  ['visio . transmission . réseau']: value,
                })
              }}
              options={[
                {
                  value: `'fixe FR'`,
                  label: `Wifi`,
                },
                {
                  value: `'mobile FR'`,
                  label: `4G`,
                },
              ]}
              color='#3DC7AB'
            />
            <StyledSelect
              name='visio . qualité'
              value={`'${engine.evaluate('visio . qualité').nodeValue}'`}
              onChange={({ value }) => {
                track('Usage numérique', 'Select visio qualité', `usage-numerique-visio-qualite-${value}`)
                setSituation({ ['visio . qualité']: value })
              }}
              color='#3DC7AB'>
              <option value={`'audio'`}>Audio</option>
              <option value={`'SD'`}>Basse déf</option>
              <option value={`'HD'`}>Haute Déf</option>
            </StyledSelect>
          </Parameters>
        </Desktop>
      </div>
    </Wrapper>
  ) : null
}
