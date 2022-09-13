import { Record } from '@prisma/client'

export const filterRecords = (records: Record[], search: string) => {
  return records?.filter((record) => {
    return record.observation.toLowerCase().includes(search.toLowerCase())
  })
}
