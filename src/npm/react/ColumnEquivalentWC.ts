import './SimpleValueWC'

class ColumnEquivalent extends HTMLElement {
  private comparisons: string[] = []
  private baseValue: number = 0
  private language: string = 'en'
  private randomizeCallback?: () => void
  private animated: boolean = false
  private toDisplay: number = 0
  private fadeIn: boolean = false
  private isAnimated: boolean = false

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get observedAttributes() {
    return ['basevalue', 'comparisons', 'language', 'animated']
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'basevalue':
          this.baseValue = Number(newValue)
          break
        case 'language':
          this.language = newValue
          break
        case 'animated':
          this.animated = newValue !== null
          break
      }
      this.render()
    }
  }

  setComparisons(comparisons: string[]) {
    this.comparisons = comparisons
    this.render()
  }

  connectedCallback() {
    this.render()
  }

  private render() {
    this.isAnimated = this.animated && this.comparisons.length > 1

    const preciseValue = Number.isNaN(this.baseValue) ? 100000 : this.baseValue
    const value = preciseValue / 1000
    const unit = 'kg' // Assuming unit is kg CO₂e, adjust if necessary

    this.shadowRoot!.innerHTML = `
      <style>
        /* Include styles here */
      </style>
      <div class="${this.randomizeCallback ? 'withRandomize' : ''}">
        <div class="top">
          <div class="leftContent">
            <div class="value">${value}</div>
            <div class="label">${unit} CO₂e</div>
          </div>
          <div class="logo"></div>
        </div>
        <div class="rightColumn">
          ${this.isAnimated ? this.renderProgress() : ''}
          <div class="${this.isAnimated ? 'animatedEqualColumn' : 'equalColumn'}">
            <!-- Equal Icon SVG -->
          </div>
          <ul class="${this.isAnimated ? 'animatedComparisonsColumn' : ''}">
            ${this.renderComparisons(preciseValue)}
          </ul>
        </div>
        ${this.randomizeCallback ? `<button class="columnRandomize">Refresh</button>` : ''}
      </div>
    `

    // Add event listener for the randomize button if necessary
    if (this.randomizeCallback) {
      this.shadowRoot!.querySelector('.columnRandomize')!.addEventListener('click', () => this.randomizeCallback!())
    }
  }

  private renderComparisons(preciseValue: number): string {
    return this.comparisons
      .map(
        (comparison, index) => `
      <li class="${
        this.isAnimated
          ? index === this.toDisplay && !this.fadeIn
            ? 'visibleAnimatedComparison'
            : 'animatedComparison'
          : 'comparison'
      }">
        <simple-value-ico2 value=${preciseValue} comparison=${comparison} />
      </li>
    `
      )
      .join('')
  }

  private renderProgress(): string {
    // Placeholder for the Progress bar logic, adjust as needed
    return `<div class="progressBarColumn"></div>`
  }
}

customElements.define('equivalent-column-ico2', ColumnEquivalent)
