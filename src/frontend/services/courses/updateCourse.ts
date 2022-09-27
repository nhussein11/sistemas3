import publicAxiosInstance from '../../api/axios-api'

export type CourseUpdateData={
  id:string,
  name?:string,
  description?:string,
  price?:number,
}

export const updateCourse = async ({ id, name, price, description }: CourseUpdateData) => {
  const response = await publicAxiosInstance.put(`/courses/${id}`, {
    name,
    price,
    description
  })
  return response
}
