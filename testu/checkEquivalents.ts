// This file is here to have a better check of what's inside our json files

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BoissonEquivalent,
  ChauffageEquivalent,
  DeplacementEquivalent,
  FruitsEtLegumesEquivalent,
  RepasEquivalent,
  UsableEquivalent,
  UsageNumeriqueEquivalent,
} from 'types/equivalent'
import boisson from 'data/categories/boisson.json'
import chauffage from 'data/categories/chauffage.json'
import deplacement from 'data/categories/deplacement.json'
import electromenager from 'data/categories/electromenager.json'
import fruitsetlegumes from 'data/categories/fruitsetlegumes.json'
import habillement from 'data/categories/habillement.json'
import mobilier from 'data/categories/mobilier.json'
import numerique from 'data/categories/numerique.json'
import repas from 'data/categories/repas.json'
import usagenumerique from 'data/categories/usagenumerique.json'

const boissonEquivalent: BoissonEquivalent[] = boisson
const fruitsEtLegumesEquivalent: FruitsEtLegumesEquivalent[] = fruitsetlegumes
const chauffageEquivalents: ChauffageEquivalent[] = chauffage
const repasEquivalents: RepasEquivalent[] = repas
const deplacementEquivalents: DeplacementEquivalent[] = deplacement
const usableEquivalents: UsableEquivalent[] = [...electromenager, ...habillement, ...mobilier, ...numerique]
const usageNumeriqueEquivalents: UsageNumeriqueEquivalent[] = usagenumerique
