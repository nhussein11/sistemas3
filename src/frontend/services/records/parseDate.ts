export const parseDate = (date: string): string => {
  const [year, month, day] = date.split('-')
  const parsedDay = day.split('T')[0]
  return `${parsedDay}/${month}/${year}`
}
