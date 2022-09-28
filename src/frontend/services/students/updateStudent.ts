import publicAxiosInstance from '../../api/axios-api'

export type StudentUpdateData = {
  id: string
  name?: string
  surname?: string
  identificationNumber?: number
}

export const updateStudent = async ({
  id,
  name,
  surname,
  identificationNumber
}: StudentUpdateData) => {
  console.log({
    id,
    name,
    surname,
    identificationNumber
  })
  const response = await publicAxiosInstance.put(`/students/${id}`, {
    name,
    surname,
    identificationNumber
  })
  return response
}
