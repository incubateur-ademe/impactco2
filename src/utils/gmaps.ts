import { Prisma } from '@prisma/client'
import { DeplacementType } from 'types/equivalent'
import { z } from 'zod'
import { prismaClient } from 'utils/prismaClient'

const getId = (values: GMapCommand) =>
  `${values.origins.latitude}-${values.origins.longitude}--${values.destinations.latitude}-${values.destinations.longitude}`

export const GMapValidation = z.object({
  destinations: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  origins: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
})
export type GMapCommand = z.infer<typeof GMapValidation>

export type CallGMapDistances = Record<DeplacementType, number>

export const getCachedValue = async (values: GMapCommand) =>
  prismaClient.gMapsCache.findUnique({
    where: {
      id: getId(values),
    },
  })

export const insertCachedValue = async (values: GMapCommand, data: Omit<Prisma.GMapsCacheCreateInput, 'id' | 'date'>) =>
  prismaClient.gMapsCache.upsert({
    create: { ...data, id: getId(values), date: new Date() },
    update: { ...data, date: new Date() },
    where: { id: getId(values) },
  })
