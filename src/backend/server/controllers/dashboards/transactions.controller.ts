/* eslint-disable indent */
import { RecordNameEnum } from '@prisma/client'
import { getRecordTypeById } from '../record-types/record-types.controller'
import { getRecords } from '../records/records.controller'
import { prisma } from '../../prisma-client/prisma-client'

const getTransactionsDashboard = async (recordNameEnum: RecordNameEnum) => {
  const records = await getRecords()

  const salesPromises = records.map(async (record) => {
    const recordType = await getRecordTypeById(record.recordTypeId)
    if (recordType?.recordName !== recordNameEnum) {
      return record
    }
  })
  const sales = await (
    await Promise.allSettled(salesPromises)
  ).filter((sale: any) => sale.value !== undefined)

  const salesValue = sales.map((sale: any) => {
    return sale.value
  })
  const salesFilteredByDateAndSubtotalPromises = salesValue.map(
    async (sale: any) => {
      const month = sale.datetime.toLocaleString('default', { month: 'long' })
      const recordDetails = await prisma.recordDetails.findMany({
        where: {
          recordId: sale.id
        }
      })
      const subtotal = recordDetails?.reduce((acc, recordDetail) => {
        return acc + recordDetail.subtotal
      }, 0)

      return {
        month,
        subtotal
      }
    }
  )
  const salesFilteredByDateAndSubtotal = await Promise.allSettled(
    salesFilteredByDateAndSubtotalPromises
  )
  const salesMoths = salesFilteredByDateAndSubtotal.map((sale: any) => {
    return sale.value.month
  })
  const salesMothsUnique = [...new Set(salesMoths)]

  const salesMothsUniquePromises = salesMothsUnique.map(async (month) => {
    const salesFilteredByMonth = salesFilteredByDateAndSubtotal.filter(
      (sale: any) => sale.value.month === month
    )
    const subtotal = salesFilteredByMonth.reduce((acc, sale) => {
      return acc + sale.value.subtotal
    }, 0)
    return {
      month,
      subtotal
    }
  })
  const salesMothsUniqueWithSubtotal = await Promise.allSettled(
    salesMothsUniquePromises
  )
  return salesMothsUniqueWithSubtotal.map((sale: any) => {
    return sale.value
  })
}

export { getTransactionsDashboard }
