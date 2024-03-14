import { Prisma } from '@prisma/client'
import { GMapCommand } from 'pages/api/callGMap'
import { prismaClient } from 'utils/prismaClient'

const getId = (values: GMapCommand) =>
  `${values.origins.latitude}-${values.origins.longitude}--${values.destinations.latitude}-${values.destinations.longitude}`

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
