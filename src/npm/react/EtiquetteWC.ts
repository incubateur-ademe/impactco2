import './ColumnEquivalentWC'
import './EquivalentWC'

class EtiquetteWebComponent extends HTMLElement {
  private inline: boolean
  private value: string | number = 0
  private comparisons: string[] = []
  private language: string = 'en'
  private animated?: boolean

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.inline = true
  }

  static get observedAttributes(): string[] {
    return ['comparisons', 'value', 'animated', 'language']
  }

  connectedCallback(): void {
    this.render()
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  disconnectedCallback(): void {
    window.removeEventListener('resize', this.handleResize.bind(this))
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'value':
          this.value = newValue
          break
        case 'comparisons':
          this.comparisons = JSON.parse(newValue)
          break
        case 'language':
          this.language = newValue
          break
        case 'animated':
          this.animated = newValue === 'true'
          break
      }
      this.render()
    }
  }

  private handleResize(): void {
    const width = this.shadowRoot?.host.parentElement?.getBoundingClientRect().width ?? 0
    this.inline = width > (this.animated ? 2 : this.comparisons.length + 1) * 175
    this.render()
  }

  private render() {
    this.shadowRoot!.innerHTML = `
      <style>
        /* Inclure ici les styles CSS pour Etiquette */
      </style>
      ${
        this.inline
          ? `
      <div class="etiquette-container">
        <equivalent-ico2 />
      </div>`
          : `
      <div class="etiquette-column-container">
        <equivalent-column-ico2 />
      </div>`
      }
    `

    const equivalentElement = this.shadowRoot!.querySelector(
      this.inline ? 'equivalent-ico2' : 'equivalent-column-ico2'
    ) as HTMLElement & { setComparisons: (values: string[]) => void }
    equivalentElement.setAttribute('basevalue', this.value.toString())
    equivalentElement.setAttribute('language', this.language)
    equivalentElement.setAttribute('animated', (this.animated || false).toString())
    equivalentElement.setComparisons(this.comparisons)
  }
}

customElements.define('etiquette-ico2', EtiquetteWebComponent)
