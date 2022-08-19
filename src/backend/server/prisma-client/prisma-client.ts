import { PrismaClient } from '@prisma/client'
import { EnvService } from '../../../shared/services/env.service'
declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var, no-unused-vars
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient({})

if (EnvService.isProd()) global.prisma = prisma
