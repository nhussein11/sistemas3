import { prisma } from './backend/server/prisma-client/prisma-client'
import {
  RecordNameEnum,
  RecordTypeEnum,
  CategoryEnum,
  Product,
  Store,
  Record,
  RecordDetails,
  RecordType,
  Course,
  Student,
  Enrollment
} from '@prisma/client'

const deleteAllTables = async () => {
  console.log('Deleting all tables...')
  await prisma.recordDetails.deleteMany()
  await prisma.record.deleteMany()
  await prisma.stock.deleteMany()
  await prisma.enrollment.deleteMany()
  await prisma.course.deleteMany()
  await prisma.student.deleteMany()
  await prisma.product.deleteMany()
  await prisma.store.deleteMany()
  await prisma.recordType.deleteMany()
}

const createDefaultProducts = async () => {
  const defaultProducts: Omit<Product, 'id'>[] = [
    {
      name: 'Ender Pro 2',
      description: 'Impresora Ender Pro con 2 cabezales',
      price: 1500,
      category: CategoryEnum.IMPRESORA
    },
    {
      name: 'Hell Bot',
      description: 'Impresora Hell Bot',
      price: 3000,
      category: CategoryEnum.IMPRESORA
    },
    {
      name: 'Filamento Grilon Rosa',
      description: 'Color rosa Chicle',
      price: 1500,
      category: CategoryEnum.FILAMENTO
    },
    {
      name: 'Filamento Grilon Negro',
      description: 'Color Negro Carbon',
      price: 1500,
      category: CategoryEnum.FILAMENTO
    }
  ]

  console.log('inserting default products...')
  await prisma.product.createMany({
    data: defaultProducts
  })
}

const createDefaultStores = async () => {
  const defaultStores: Omit<Store, 'id'>[] = [
    { name: 'Deposito 1', address: 'Zona Centro' },
    { name: 'Deposito 2', address: 'Zona Sur' },
    { name: 'Deposito 3', address: 'Zona Norte' }
  ]

  console.log('inserting default stores...')
  await prisma.store.createMany({
    data: defaultStores
  })
}

const updateStocksQuantities = async () => {
  console.log('updating stocks quantities...')
  await prisma.stock.updateMany({
    data: {
      quantity: 10
    }
  })
}

const createDefaultRecordTypes = async () => {
  const defaultRecordTypes: Omit<RecordType, 'id'>[] = [
    {
      recordType: RecordTypeEnum.POSITIVE,
      recordName: RecordNameEnum.FACTURA_ORIGINAL,
      cause: 'Factura Original'
    },
    {
      recordType: RecordTypeEnum.NEGATIVE,
      recordName: RecordNameEnum.FACTURA_DUPLICADO,
      cause: 'Factura Duplicado'
    }
  ]

  console.log('inserting default record types...')
  await prisma.recordType.createMany({
    data: defaultRecordTypes
  })
}
const createDefaultRecords = async () => {
  const recordTypes = await prisma.recordType.findMany()
  const defaultRecords: Omit<Record, 'id' | 'datetime'>[] = recordTypes.map(
    (recordType) => {
      return {
        recordTypeId: recordType.id,
        observation: 'Factura original de prueba',
        senderName: 'Proveedor Juan Perez',
        address: 'Zona Centro'
      }
    }
  )
  console.log('inserting default records...')
  await prisma.record.createMany({
    data: defaultRecords
  })
}

const createDefaultRecordDetails = async () => {
  const stocks = await prisma.stock.findMany()
  const records = await prisma.record.findMany()

  const defaultRecordDetails: Promise<Omit<RecordDetails, 'id'>>[] =
    records.map(async (record) => {
      const randomStockId = Math.floor(Math.random() * stocks.length)
      const product = await prisma.product.findUnique({
        where: {
          id: stocks[randomStockId].productId
        }
      })
      const productPrice = product ? product.price : 0
      return {
        stockId: stocks[randomStockId].id,
        recordId: record.id,
        quantity: 7,
        subtotal: productPrice
      }
    })

  const results = await Promise.allSettled(defaultRecordDetails)

  const fulFilledResults = results.filter(
    (res) => res.status === 'fulfilled'
  ) as PromiseFulfilledResult<Omit<RecordDetails, 'id'>>[]

  console.log('inserting default record details...')
  await prisma.recordDetails.createMany({
    data: fulFilledResults.map((res) => res.value)
  })
}

const createDefaultStudents = async () => {
  const defaultStudents: Omit<Student, 'id'>[] = [
    {
      name: 'Choco',
      surname: 'Villanueva',
      identificationNumber: 4321345
    },
    {
      name: 'Gonza',
      surname: 'Guaimas',
      identificationNumber: 2344563
    },
    {
      name: 'Alejo',
      surname: 'Torres',
      identificationNumber: 32321321
    },
    {
      name: 'Nico',
      surname: 'Hussein',
      identificationNumber: 43232145
    }
  ]

  console.log('inserting default students...')
  await prisma.student.createMany({
    data: defaultStudents
  })
}
// Este codigo esta re feo, pero cuando lo estoy haciendo ya tengo mucho sueno, despues llo refactoricemos pl
const createDefaultCourses = async () => {
  const defaultProductsByDefaultCourses: Omit<Product, 'id'>[] = [
    {
      name: 'Inscripcion - Curso de Front-End',
      description: 'Curso de fundamenots de Front-End',
      category: CategoryEnum.COURSE,
      price: 4000
    },
    {
      name: 'Inscripcion - Curso de Back-End',
      description: 'Curso de fundamenots de Back-End',
      category: CategoryEnum.COURSE,
      price: 6000
    },
    {
      name: 'Inscripcion - Curso de Testing',
      description: 'Curso de fundamenots de Testing',
      category: CategoryEnum.COURSE,
      price: 2000
    },
    {
      name: 'Inscripcion - Curso de Bases de Datos',
      description: 'Curso de fundamentos de BDD',
      category: CategoryEnum.COURSE,
      price: 1500
    }
  ]
  await prisma.product.createMany({ data: defaultProductsByDefaultCourses })
  const products: Product[] = await prisma.product.findMany({
    where: {
      category: CategoryEnum.COURSE
    }
  })

  const defaultCourses: Omit<Course, 'id'>[] = [
    {
      name: 'Curso de Front-End',
      hoursQuantity: 3,
      productId: ''
    },
    {
      name: 'Curso de Back-End',
      hoursQuantity: 2,
      productId: ''
    },
    {
      name: 'Curso de Testing',
      hoursQuantity: 4,
      productId: ''
    },
    {
      name: 'Curso de Bases de Datos',
      hoursQuantity: 1,
      productId: ''
    }
  ]
  const courses: Omit<Course, 'id'>[] = defaultCourses.map((course, index) => {
    course.productId = products[index].id
    return course
  })

  console.log('inserting default courses...')
  await prisma.course.createMany({
    data: courses
  })
}

const createDefaultEnrollments = async () => {
  const courses: Course[] = await prisma.course.findMany()
  const students: Student[] = await prisma.student.findMany()

  const defaultEnrollments: Omit<Enrollment, 'id'>[] = courses.map((course, index) => {
    return {
      academicYear: 2022,
      courseId: course.id,
      studentId: students[index].id
    }
  })
  console.log('inserting default enrollments...')
  await prisma.enrollment.createMany({
    data: defaultEnrollments
  })
}
const populateDatabase = async () => {
  try {
    await createDefaultProducts()
    await createDefaultStores()
    await updateStocksQuantities()
    await createDefaultRecordTypes()
    await createDefaultRecords()
    await createDefaultRecordDetails()
    await createDefaultStudents()
    await createDefaultCourses()
    await createDefaultEnrollments()
  } catch (error: any) {
    throw new Error(error)
  }
}
const main = async () => {
  try {
    await deleteAllTables()
    await populateDatabase()
  } catch (error: any) {
    throw new Error(error)
  }
}
main()
export {}
