import { SimpleEquivalent } from 'types/equivalent'
import values from 'utils/Equivalent/values.json'

const equivalents = values as Record<string, SimpleEquivalent>

class SimpleValueComponent extends HTMLElement {
  private value: number = 0
  private comparison: string = ''
  private language: string = 'en'
  private equivalentData?: { equivalent: SimpleEquivalent; slug: string }
  private idAttr?: string

  static get observedAttributes() {
    return ['value', 'comparison', 'language', 'id']
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'value':
          this.value = Number(newValue)
          break
        case 'comparison':
          this.comparison = newValue
          break
        case 'language':
          this.language = newValue
          break
        case 'id':
          this.idAttr = newValue
          break
      }
      this.updateValues()
      this.render()
    }
  }

  connectedCallback() {
    this.updateValues()
    this.render()
  }

  private updateValues() {
    this.equivalentData =
      this.comparison === 'random' ? this.getRandomEquivalent(this.value) : this.getValues(this.comparison, this.value)
  }

  private render() {
    if (!this.equivalentData) {
      return
    }

    const comparisonValue =
      ((this.equivalentData.equivalent.percentage ? 100 : 1) * this.value) / this.equivalentData.equivalent.value
    const equivalentValue = Number.isFinite(comparisonValue) ? this.formatNumber(comparisonValue) : '∞' // Replace with InfinityIcon if needed

    this.innerHTML = `
      <div class="simple-value-container">
        <div class="emoji">
          ${this.renderEquivalentIcon(this.equivalentData.equivalent)}
        </div>
        <div class="text impactCO2-etiquette-content" id="${this.idAttr || ''}">
          <div class="equivalent-value impactCO2-etiquette-value" data-testid="etiquette-${this.comparison}-value">
            ${equivalentValue}
          </div>
          <div class="label impactCO2-etiquette-text" data-testid="etiquette-${this.comparison}-name">
            ${this.getEquivalentName(this.language, this.equivalentData.equivalent, comparisonValue)}
          </div>
        </div>
      </div>
    `

    // Apply styles directly if necessary
    const style = document.createElement('style')
    style.textContent = `
      .simple-value-container { /* Styles for the container */ }
      .emoji { /* Styles for the emoji */ }
      .text { /* Styles for the text */ }
      .equivalent-value { /* Styles for the equivalent value */ }
      .label { /* Styles for the label */ }
    `

    this.appendChild(style)
  }

  private getValues(
    comparison: string,
    value: number
  ): { equivalent: SimpleEquivalent & { carpool?: number }; slug: string } {
    const [slug, carpool] = comparison.split('+')
    if (comparison !== 'random' && equivalents[slug]) {
      const equivalent = equivalents[slug]
      return {
        equivalent: {
          ...equivalent,
          carpool: carpool ? Number(carpool) : 0,
          value: carpool ? equivalent.value / (Number(carpool) + 1) : equivalent.value,
        },
        slug,
      }
    }
    return this.getRandomEquivalent(value)
  }

  private getRandomEquivalent(value: number): { equivalent: SimpleEquivalent; slug: string } {
    console.log('random', value)
    const meaningfulEquivalents = Object.entries(equivalents).filter(
      ([, eqv]) => value / eqv.value > 1 && eqv.value > 0
    )
    const categories = [...new Set(meaningfulEquivalents.map(([, eqv]) => eqv.category))]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const categoryEquivalents = meaningfulEquivalents.filter(([, eqv]) => eqv.category === randomCategory)
    const randomEquivalent = categoryEquivalents[Math.floor(Math.random() * categoryEquivalents.length)]
    return { slug: randomEquivalent[0], equivalent: randomEquivalent[1] }
  }

  private getEquivalentName(language: string, equivalent: SimpleEquivalent, comparisonValue: number): string {
    // Implement this based on your equivalent name retrieval logic
    return equivalent.fr.toLowerCase()
  }

  private formatNumber(value: number): string {
    // Implement your number formatting logic here
    return value.toString()
  }

  private renderEquivalentIcon(equivalent: SimpleEquivalent): string {
    // Return the SVG or other icon representation based on `equivalent`
    return `<svg><!-- Equivalent Icon --></svg>`
  }
}

customElements.define('simple-value-ico2', SimpleValueComponent)
