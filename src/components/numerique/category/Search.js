import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'

import RulesContext from '../RulesProvider'
import Slider from 'components/base/Slider'
import Select from 'components/base/Select'
import HorizontalRadio from 'components/base/HorizontalRadio'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.second};
  border: 0.0625rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;

  ${(props) => props.theme.mq.small} {
    flex-direction: column;
    gap: 1.5rem;
  }
`
const Column = styled.div``
const Label = styled.p`
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 300;

  strong {
    font-weight: bold;
  }
`
const Color = styled.span`
  color: ${(props) => props.color};
`
const Small = styled.span`
  display: block;
  font-size: 0.75rem;

  ${(props) => props.theme.mq.small} {
    display: inline;
  }
`
const StyledSlider = styled(Slider)`
  margin-bottom: 0.75rem;
  min-width: 11rem;
`
const Parameters = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-top: 0.5rem;

  ${(props) => props.theme.mq.small} {
  }
`
const StyledSelect = styled(Select)`
  flex: 1;
  margin: 0;
  font-size: 0.875rem;

  select {
    width: 100%;
  }
`
const StyledHorizontalRadio = styled(HorizontalRadio)`
  font-size: 0.875rem;

  & label {
    padding: 0.5em;
  }
`
export default function Search(props) {
  const { engine, setSituation } = useContext(RulesContext)

  useEffect(() => {
    setSituation({
      ['streaming . durée']: 420,
      ['visio . durée']: 180,
      ['email . appareil']: `'smartphone'`,
      ['email . taille']: 0.2,
      ['streaming . appareil']: `'TV'`,
      ['visio . appareil']: `'ordinateur portable'`,
      ['visio . emplacements']: 1,
    })
  }, [])

  return engine ? (
    <Wrapper>
      <Column>
        <Label>
          <strong>
            {props.numberEmails}{' '}
            <Color color='#6C8CC1'>
              email{props.numberEmails > 1 ? 's' : ''}
            </Color>
          </strong>{' '}
          envoyé{props.numberEmails > 1 ? 's' : ''} <Small>par semaine</Small>
        </Label>
        <StyledSlider
          color='#6C8CC1'
          min={0}
          max={1500}
          value={props.numberEmails}
          onChange={props.setNumberEmails}
        />
        <StyledSelect
          value={`'${engine.evaluate('email . appareil').nodeValue}'`}
          onChange={({ value }) =>
            setSituation({ ['email . appareil']: value })
          }
          color='#6C8CC1'
        >
          <option value={`'smartphone'`}>📱 Smartphone</option>
          <option value={`'tablette'`}>📱 Tablette</option>
          <option value={`'ordinateur portable'`}>
            💻 Ordinateur portable
          </option>
          <option value={`'ordinateur et écran'`}>🖥 Ordinateur fixe</option>
        </StyledSelect>
        <Parameters>
          <StyledHorizontalRadio
            name='email . transmission . émetteur . réseau'
            value={`'${
              engine.evaluate('email . transmission . émetteur . réseau')
                .nodeValue
            }'`}
            onChange={(value) =>
              setSituation({
                ['email . transmission . émetteur . réseau']: value,
              })
            }
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
        </Parameters>
      </Column>
      <Column>
        <Label>
          <strong>
            {engine.evaluate(`streaming . durée`).nodeValue / 60}h
          </strong>{' '}
          de{' '}
          <strong>
            <Color color='#C25166'>streaming</Color>
          </strong>{' '}
          <Small>par semaine</Small>
        </Label>
        <StyledSlider
          color='#C25166'
          min={0}
          max={4200}
          step={60}
          value={engine.evaluate(`streaming . durée`).nodeValue}
          onChange={(value) =>
            setSituation({
              [`streaming . durée`]: value,
            })
          }
        />
        <StyledSelect
          value={`'${engine.evaluate('streaming . appareil').nodeValue}'`}
          onChange={({ value }) =>
            setSituation({ ['streaming . appareil']: value })
          }
          color='#C25166'
        >
          <option value={`'smartphone'`}>📱 Smartphone</option>
          <option value={`'tablette'`}>📱 Tablette</option>
          <option value={`'ordinateur portable'`}>
            💻 Ordinateur portable
          </option>
          <option value={`'ordinateur et écran'`}>🖥 Ordinateur fixe</option>
          <option value={`'TV'`}>📺 Télévision</option>
        </StyledSelect>
        <Parameters>
          <StyledHorizontalRadio
            name='streaming . transmission . réseau'
            value={`'${
              engine.evaluate('streaming . transmission . réseau').nodeValue
            }'`}
            onChange={(value) =>
              setSituation({
                ['streaming . transmission . réseau']: value,
              })
            }
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
            value={`'${engine.evaluate('streaming . qualité').nodeValue}'`}
            onChange={({ value }) =>
              setSituation({ ['streaming . qualité']: value })
            }
            color='#C25166'
          >
            <option value={`'SD'`}>Basse déf</option>
            <option value={`'HD'`}>Haute Déf</option>
            <option value={`'ultra HD'`}>4K</option>
          </StyledSelect>
        </Parameters>
      </Column>
      <Column>
        <Label>
          <strong>{engine.evaluate(`visio . durée`).nodeValue / 60}h</strong> de{' '}
          <strong>
            <Color color='#3DC7AB'>visioconférence</Color>
          </strong>{' '}
          <Small>par semaine</Small>
        </Label>
        <StyledSlider
          color='#3DC7AB'
          min={0}
          max={4200}
          step={60}
          value={engine.evaluate(`visio . durée`).nodeValue}
          onChange={(value) =>
            setSituation({
              [`visio . durée`]: value,
            })
          }
        />
        <StyledSelect
          value={`'${engine.evaluate('visio . appareil').nodeValue}'`}
          onChange={({ value }) =>
            setSituation({ ['visio . appareil']: value })
          }
          color='#3DC7AB'
        >
          <option value={`'smartphone'`}>📱 Smartphone</option>
          <option value={`'tablette'`}>📱 Tablette</option>
          <option value={`'ordinateur portable'`}>
            💻 Ordinateur portable
          </option>
          <option value={`'ordinateur et écran'`}>🖥 Ordinateur fixe</option>
          <option value={`'TV'`}>📺 Télévision</option>
        </StyledSelect>
        <Parameters>
          <StyledHorizontalRadio
            name='visio . transmission . réseau'
            value={`'${
              engine.evaluate('visio . transmission . réseau').nodeValue
            }'`}
            onChange={(value) =>
              setSituation({
                ['visio . transmission . réseau']: value,
              })
            }
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
            value={`'${engine.evaluate('visio . qualité').nodeValue}'`}
            onChange={({ value }) =>
              setSituation({ ['visio . qualité']: value })
            }
            color='#3DC7AB'
          >
            <option value={`'audio'`}>Audio</option>
            <option value={`'SD'`}>Basse déf</option>
            <option value={`'HD'`}>Haute Déf</option>
          </StyledSelect>
        </Parameters>
      </Column>
    </Wrapper>
  ) : null
}
