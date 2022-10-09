export const parseDate = (date: string, americanFormat?: boolean): string => {
  const [year, month, day] = date.split('-')
  const parsedDay = day?.split('T')[0]
  return americanFormat
    ? `${year}-${month}-${parsedDay}`
    : `${parsedDay}/${month}/${year}`
}
