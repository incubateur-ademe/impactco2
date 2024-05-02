export const usageNumeriqueConfig = {
  email: {
    title: 'Emails envoyés',
    unit: 'emails',
    device: 'email . appareil',
    network: 'email . transmission . émetteur . réseau',
    type: 'email . taille',
    appareils: [
      { value: 'smartphone', label: 'Smartphone' },
      { value: 'tablette', label: 'Tablette' },
      { value: 'ordinateur portable', label: 'Ordinateur portable' },
      { value: 'ordinateur et écran', label: 'Ordinateur fixe' },
    ],
    types: [
      { value: 0.075, label: 'Sans pièce jointe' },
      { value: 1.075, label: 'Pièce jointe 1Mo' },
      { value: 5.075, label: 'Pièce jointe 5Mo' },
    ],
    networks: [
      {
        value: 'fixe FR',
        label: 'Wifi',
      },
      {
        value: 'mobile FR',
        label: '4G',
      },
    ],
  },
  visioconference: {
    title: 'Heures de visioconférence',
    unit: 'heures',
    device: 'visio . appareil',
    network: 'visio . transmission . réseau',
    type: 'visio . qualité',
    appareils: [
      { value: 'smartphone', label: 'Smartphone' },
      { value: 'tablette', label: 'Tablette' },
      { value: 'ordinateur portable', label: 'Ordinateur portable' },
      { value: 'ordinateur et écran', label: 'Ordinateur fixe' },
      { value: 'TV', label: 'Télévision' },
    ],
    types: [
      { value: 'audio', label: 'Audio' },
      { value: 'SD', label: 'Basse déf' },
      { value: 'HD', label: 'Haute déf' },
    ],
    networks: [
      {
        value: 'fixe FR',
        label: 'Wifi',
      },
      {
        value: 'mobile FR',
        label: '4G',
      },
    ],
  },
  streaming: {
    title: 'Heures de streaming',
    unit: 'heures',
    device: 'streaming . appareil',
    network: 'streaming . transmission . réseau',
    type: 'streaming . qualité',
    appareils: [
      { value: 'smartphone', label: 'Smartphone' },
      { value: 'tablette', label: 'Tablette' },
      { value: 'ordinateur portable', label: 'Ordinateur portable' },
      { value: 'ordinateur et écran', label: 'Ordinateur fixe' },
      { value: 'TV', label: 'Télévision' },
    ],
    types: [
      { value: 'SD', label: 'Basse déf' },
      { value: 'HD', label: 'Haute déf' },
      { value: 'ultra HD', label: '4K' },
    ],
    networks: [
      {
        value: 'fixe FR',
        label: 'Wifi',
      },
      {
        value: 'mobile FR',
        label: '4G',
      },
    ],
  },
}
