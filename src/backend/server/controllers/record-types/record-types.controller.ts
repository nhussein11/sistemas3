/* eslint-disable no-useless-catch */
import { RecordNameEnum, RecordType, RecordTypeEnum } from '@prisma/client'
import { prisma } from '../../prisma-client/prisma-client'

const getRecordsTypes = async () => {
  try {
    const recordsTypes: RecordType[] = await prisma.recordType.findMany()
    return recordsTypes
  } catch (error) {
    throw error
  }
}

const createRecordType = async (
  recordType: RecordTypeEnum,
  recordName: RecordNameEnum,
  cause: string
) => {
  try {
    const recordTypeCreated: RecordType =
      await prisma.recordType.create({
        data: { recordType, recordName, cause }
      })
    return recordTypeCreated
  } catch (error) {
    throw error
  }
}

const getRecordTypeById = async (id: string) => {
  try {
    const recordType: RecordType | null =
      await prisma.recordType.findUnique({
        where: {
          id
        }
      })
    return recordType
  } catch (error) {
    throw error
  }
}

const updateRecordTypeById = async (
  id: string,
  recordType: RecordTypeEnum,
  recordName: RecordNameEnum,
  cause: string
) => {
  try {
    await prisma.recordType.findUniqueOrThrow({ where: { id } })

    if (!recordType || !recordName || !cause) {
      throw new Error('movementType, movementName or cause must be provided!')
    }

    const updatedRecordDetails: RecordType =
      await prisma.recordType.update({
        where: { id },
        data: {
          recordType,
          recordName,
          cause
        }
      })
    return updatedRecordDetails
  } catch (error) {
    throw error
  }
}

const deleteRecordTypeById = async (id: string) => {
  try {
    const deletedRecordType: RecordType =
      await prisma.recordType.delete({
        where: { id }
      })
    return deletedRecordType
  } catch (error) {
    throw error
  }
}

export {
  getRecordsTypes,
  createRecordType,
  getRecordTypeById,
  updateRecordTypeById,
  deleteRecordTypeById
}
