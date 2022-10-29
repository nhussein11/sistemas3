/* eslint-disable indent */
import { RecordNameEnum } from '@prisma/client'
import { getRecordTypeById } from '../record-types/record-types.controller'
import { getRecords } from '../records/records.controller'
import { prisma } from '../../prisma-client/prisma-client'

const getSales = async () => {
    const records = await getRecords()

    const salesPromises = records.map(async (record) => {
        const recordType = await getRecordTypeById(record.recordTypeId)
        if (recordType?.recordName !== RecordNameEnum.FACTURA_DUPLICADO) {
            return record
        }
    })
    const sales = await (await Promise.allSettled(salesPromises)).filter(
        (sale: any) => sale.value !== undefined
    )

    const salesValue = sales.map((sale: any) => {
        return sale.value
    })
    const salesFilteredByDateAndSubtotalPromises = salesValue.map(async (sale: any) => {
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
    })
    const salesFilteredByDateAndSubtotal = await Promise.allSettled(
        salesFilteredByDateAndSubtotalPromises
    )

    return salesFilteredByDateAndSubtotal.map((sale: any) => sale.value)
}

export { getSales }
