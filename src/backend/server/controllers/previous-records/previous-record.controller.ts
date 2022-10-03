/* eslint-disable no-useless-catch */
import { LetterEnum, PreviousRecord, Record } from '@prisma/client'
import { prisma } from '../../../server/prisma-client/prisma-client'
import { createDataOfRecord } from '../records/records.controller'

const getPreviousRecord = async () => {
  try {
    const previousRecords: PreviousRecord[] =
      await prisma.previousRecord.findMany()
    return previousRecords
  } catch (error) {
    throw error
  }
}

const createPreviousRecord = async (
  observation: string,
  address: string,
  letter: LetterEnum,
  recordNumber: number,
  paidFor: boolean,
  recordTypeId: string,
  supplierId: string,
  customerId: string,
  paidForRecordIds: []
) => {
  try {
    const previousRecordsCreated: PreviousRecord[] = []
    const higherRecord: Record = await prisma.record.create({
      data: await createDataOfRecord(
        supplierId,
        observation,
        address,
        letter,
        recordNumber,
        paidFor,
        recordTypeId,
        customerId
      )
    })

    const { id: higherRecordId } = higherRecord

    for (const paidForRecordId of paidForRecordIds) {
      const previousRecord: PreviousRecord = await prisma.previousRecord.create(
        {
          data: {
            higherRecordId,
            paidForRecordId
          }
        }
      )
      previousRecordsCreated.push(previousRecord)
    }

    return previousRecordsCreated
  } catch (error) {
    throw error
  }
}

const getPreviousRecordById = async (id: string) => {
  try {
    const previousRecord: PreviousRecord =
      await prisma.previousRecord.findUniqueOrThrow({
        where: {
          id
        }
      })
    return previousRecord
  } catch (error) {
    throw error
  }
}

const updatePreviousRecordById = async (
  id: string,
  higherRecordId: string,
  paidForRecordId: string
) => {
  try {
    await prisma.previousRecord.findUniqueOrThrow({
      where: { id }
    })

    if (!higherRecordId && !paidForRecordId) {
      throw new Error('higherRecordId or paidForRecordId must be provided!')
    }

    const updatedPreviousRecord: PreviousRecord =
      await prisma.previousRecord.update({
        where: { id },
        data: {
          higherRecordId,
          paidForRecordId
        }
      })

    return updatedPreviousRecord
  } catch (error) {
    console.log(error)
    throw error
  }
}

const deletePreviousRecordById = async (id: string) => {
  try {
    const deletedPreviousRecord: PreviousRecord =
      await prisma.previousRecord.delete({
        where: { id }
      })

    return deletedPreviousRecord
  } catch (error) {
    console.log(error)
    throw error
  }
}

export {
  getPreviousRecord,
  createPreviousRecord,
  getPreviousRecordById,
  updatePreviousRecordById,
  deletePreviousRecordById
}
