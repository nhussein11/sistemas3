export const ParseRecordDetailsFactura = (records: Object[]) => {
  console.log('ENTRA POR DETAILS FACTURA')
  return records.map((record) => {
    return record.id
  })
}
