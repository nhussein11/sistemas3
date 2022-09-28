/* eslint-disable no-useless-catch */
import { CategoryEnum, Course, Product } from '@prisma/client'
import { prisma } from '../../../server/prisma-client/prisma-client'
import {
  createProduct,
  deleteProductById,
  getProductById,
  updateProductById
} from '../products/products.controller'

const getCourses = async () => {
  try {
    const courses: Course[] = await prisma.course.findMany()
    const coursesWithPriceAndDescriptionPendings = courses.map(
      async (course) => {
        const product: Product = await getProductById(course.productId)
        const { price, description } = product
        return { ...course, price, description }
      }
    )
    const coursesWithPriceAndDescriptionResolved = Promise.all(
      coursesWithPriceAndDescriptionPendings
    ).then((course) => {
      return course
    })
    return coursesWithPriceAndDescriptionResolved
  } catch (error) {
    throw error
  }
}

const createCourse = async (
  name: string,
  hoursQuantity: number,
  price: number,
  description: string
) => {
  try {
    const productCreatedByNewCourse: Product = await createProduct(
      `Inscripcion - ${name}`,
      price,
      description,
      CategoryEnum.COURSE
    )
    const courseCreated: Course = await prisma.course.create({
      data: { name, hoursQuantity, productId: productCreatedByNewCourse.id }
    })

    return courseCreated
  } catch (error) {
    throw error
  }
}

const getCourseById = async (id: string) => {
  try {
    const course: Course = await prisma.course.findUniqueOrThrow({
      where: {
        id
      }
    })
    return course
  } catch (error) {
    throw error
  }
}

const updateCourseById = async (
  id: string,
  name: string,
  hoursQuantity: number,
  price: number,
  description: string
) => {
  try {
    const course : Course = await prisma.course.findUniqueOrThrow({ where: { id } })

    if (!name && !price && !description) {
      throw new Error('Name, price, description or category must be provided!')
    }

    await updateProductById(
      course.productId,
      `Inscripcion - ${name}`,
      price,
      description,
      CategoryEnum.COURSE
    )

    const updatedCourse: Course = await prisma.course.update({
      where: { id },
      data: {
        name,
        hoursQuantity
      }
    })

    return updatedCourse
  } catch (error) {
    console.log(error)
    throw error
  }
}

const deleteCourseById = async (id: string) => {
  try {
    const courseToDelete: Course = await getCourseById(id)

    await deleteProductById(courseToDelete.productId)

    const deletedCourse: Course = await prisma.course.delete({
      where: { id }
    })

    return deletedCourse
  } catch (error) {
    console.log(error)
    throw error
  }
}

export {
  getCourses,
  createCourse,
  getCourseById,
  updateCourseById,
  deleteCourseById
}
