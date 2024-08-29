import './SimpleValueWC'

class EquivalentComponent extends HTMLElement {
  private comparisons: string[] = []
  private baseValue: number = 0
  private language: string = 'en'
  private animated: boolean = false
  private randomizeCallback?: () => void
  private titleCallback?: (unit: string, roundedValue: number, intValue: number) => string
  private url?: string
  private toDisplay: number = 0
  private fadeIn: boolean = false

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get observedAttributes() {
    return ['basevalue', 'comparisons', 'language', 'animated', 'url']
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
        case 'url':
          this.url = newValue
          break
      }
      this.render()
    }
  }

  setComparisons(comparisons: string[]) {
    this.comparisons = comparisons
    this.render() // Re-render the component when comparisons change
  }

  connectedCallback() {
    this.render()
  }

  private render() {
    const isAnimated = this.animated && this.comparisons.length > 1
    const preciseValue = Number.isNaN(this.baseValue) ? 100000 : this.baseValue
    const value = preciseValue / 1000
    const unit = 'kg' // Assuming the unit is kg CO₂e

    this.shadowRoot!.innerHTML = `
      <style>
        /* Add your CSS styles here */
      </style>
      <div class="container">
        ${this.titleCallback ? this.titleCallback(unit, value, this.baseValue) : ''}
        <div class="left">
          <div class="logo">${this.renderLogo()}</div>
          <div class="leftContent">
            <div class="value">${value}</div>
            <div class="label">${unit} CO₂e</div>
          </div>
        </div>
        <div class="right">
          ${isAnimated ? this.renderProgress() : ''}
          <div class="${isAnimated ? 'animatedEqual' : 'equal'}">
            <!-- Equal Icon SVG -->
          </div>
          <ul class="${isAnimated ? 'animatedComparisons' : 'comparisons'}">
            ${this.renderComparisons(preciseValue)}
          </ul>
        </div>
        ${this.randomizeCallback ? `<button class="randomize">Refresh</button>` : ''}
      </div>
    `

    // Add event listener for randomize button
    if (this.randomizeCallback) {
      this.shadowRoot!.querySelector('.randomize')!.addEventListener('click', () => this.randomizeCallback!())
    }
  }

  private renderComparisons(preciseValue: number): string {
    return this.comparisons
      .map(
        (comparison, index) => `
      <li class="${
        this.animated
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
    // Placeholder for the Progress bar logic
    return `<div class="progressBar"></div>`
  }

  private renderLogo(): string {
    // Replace this logic with the correct Logo rendering
    return `<img src="${this.url}" alt="Logo" />`
  }
}

customElements.define('equivalent-ico2', EquivalentComponent)
