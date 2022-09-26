/* eslint-disable no-useless-catch */
import { CategoryEnum, Course, Product } from '@prisma/client'
import { prisma } from '../../../server/prisma-client/prisma-client'
import {
  createProduct,
  updateProductById
} from '../products/products.controller'

const getCourses = async () => {
  try {
    const courses: Course[] = await prisma.course.findMany()
    return courses
  } catch (error) {
    throw error
  }
}

const createCourse = async (
  name: string,
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
      data: { name, productId: productCreatedByNewCourse.id }
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
  price: number,
  description: string,
  productId: string
) => {
  try {
    await prisma.course.findUniqueOrThrow({ where: { id } })

    if (!name && !price && !description) {
      throw new Error('Name, price, description or category must be provided!')
    }

    await updateProductById(
      productId,
      `Inscripcion - ${name}`,
      price,
      description,
      CategoryEnum.COURSE
    )

    const updatedCourse: Course = await prisma.course.update({
      where: { id },
      data: {
        name
      }
    })

    return updatedCourse
  } catch (error) {
    throw error
  }
}

const deleteCourseById = async (id: string) => {
  try {
    const deletedCourse: Course = await prisma.course.delete({
      where: { id }
    })
    await prisma.product.delete({
      where: {
        id: deletedCourse.productId
      }
    })
    return deletedCourse
  } catch (error) {
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