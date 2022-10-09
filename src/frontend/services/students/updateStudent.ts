import publicAxiosInstance from '../../api/axios-api'

export type StudentUpdateData = {
  id: string
  name?: string
  surname?: string
  identificationNumber?: number
  birth?: string
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
  console.log({ id, name, surname, identificationNumber, birth, phone, email })
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
