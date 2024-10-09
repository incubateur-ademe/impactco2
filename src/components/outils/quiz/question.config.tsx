import { Question } from 'types/question'
import AvocatPoisson from './infos/AvocatPoisson'
import BoeufTGV from './infos/BoeufTGV'
import EauThe from './infos/EauThe'
import EmailSmartphone from './infos/EmailSmartphone'
import FriendsVoiture from './infos/FriendsVoiture'
import ManteauBouilloire from './infos/ManteauBouilloire'
import RefrigirateurOrdinateur from './infos/RefrigirateurOrdinateur'
import TabletteChaussure from './infos/TabletteChaussure'
import TelevisionPNY from './infos/TelevisionPNY'
import VeloMangue from './infos/VeloMangue'

export const questions: Question[] = [
  { answer: 'B', slugA: 'repasavecduboeuf', slugB: 'tgv-paris-marseille', moreInfo: <BoeufTGV /> },
  { answer: 'B', slugA: 'tabletteclassique', slugB: 'chaussuresencuir', valueB: 3, moreInfo: <TabletteChaussure /> },
  { answer: 'A', slugA: 'avocat', slugB: 'repasavecdupoissonblanc', moreInfo: <AvocatPoisson /> },
  { answer: 'B', slugA: 'refrigirateur', slugB: 'ordinateurportable', moreInfo: <RefrigirateurOrdinateur /> },
  { answer: 'B', slugA: 'eauenbouteille', slugB: 'the', valueB: 4, moreInfo: <EauThe /> },
  { answer: 'A', slugA: 'friends', slugB: 'voiture-lille-nimes', moreInfo: <FriendsVoiture /> },
  { answer: 'B', slugA: 'manteau', slugB: 'bouilloire', moreInfo: <ManteauBouilloire /> },
  { answer: 'A', slugA: 'television', slugB: 'avion-pny', moreInfo: <TelevisionPNY /> },
  { answer: 'A', slugA: 'email', valueA: 1000, slugB: 'smartphone', moreInfo: <EmailSmartphone /> },
  { answer: 'A', slugA: 'veloelectrique', valueA: 10, slugB: 'mangue', moreInfo: <VeloMangue />, last: true },
]
