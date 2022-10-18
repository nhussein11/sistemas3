import { Record } from '@prisma/client'

export const filterTypeRecord = (records: Record[], type: string) => {
  if (type === 'ing') {
    return records?.filter((record) => {
      return record.recordTypeId.includes('cl8yuh53800825bpherclkqcq') || record.recordTypeId.includes('cl8yuh53800845bphnsy21uzl')
    })
  } else {
    return records?.filter((record) => {
      return record.recordTypeId.includes('cl8yuh53800815bph5qvd49nj') || record.recordTypeId.includes('cl8yuh53800835bphf5rpzrng')
    })
  }
}
