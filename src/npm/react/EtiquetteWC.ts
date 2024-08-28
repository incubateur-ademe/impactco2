import r2wc from '@r2wc/react-to-web-component'
import Etiquette from './Etiquette'

const EtiquetteWC = r2wc(Etiquette, {
  props: {
    comparisons: 'json',
    value: 'number',
    animated: 'boolean',
    language: 'string',
  },
})

customElements.define('etiquette-ico2', EtiquetteWC)
