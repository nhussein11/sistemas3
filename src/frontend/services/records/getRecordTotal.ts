import { RecordDetails } from '@prisma/client'
const getRecordTotal = (idRecord: string, detailsQuery : any) => {
  const filteredDetails: RecordDetails[] = detailsQuery.data?.recordsDetails?.filter((d: RecordDetails) => d.recordId === idRecord)
  const filteredDetailsTableData = filteredDetails?.map((detail) => detail.subtotal)
  const totalAmmount = filteredDetailsTableData?.reduce((counter, subtotal) => counter + subtotal, 0)
  return { totalAmmount }
}

export default getRecordTotal
