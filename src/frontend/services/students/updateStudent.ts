import publicAxiosInstance from '../../api/axios-api'

export type StudentUpdateData = {
  id: string
  name?: string
  surname?: string
  identificationNumber?: number
  birth?: Date
  phone?: number
  email?: string
}

export const updateStudent = async ({
  id,
  name,
  surname,
  identificationNumber,
  birth,
  phone,
  email
}: StudentUpdateData) => {
  const response = await publicAxiosInstance.put(`/students/${id}`, {
    name,
    surname,
    identificationNumber,
    birth,
    phone,
    email
  })
  return response
}
