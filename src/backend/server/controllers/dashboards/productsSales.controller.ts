import { RecordNameEnum } from '@prisma/client'
import { coursesDashboards } from './coursesDashboards.controller'
import { getTransactionsDashboard } from './transactions.controller'

const getProductsSales = async () => {
  const coursesEarns = await coursesDashboards()
  const totalSales = await getTransactionsDashboard(
    RecordNameEnum.FACTURA_DUPLICADO
  )
  const productSales = totalSales.map((sale) => {
    const course = coursesEarns.find((course) => course.month === sale.month)
    return {
      month: sale.month,
      totalSales: sale.subtotal - (course?.totalPrice || 0)
    }
  })
  return productSales
}

export { getProductsSales }
