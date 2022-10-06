import { RecordDetails, Stock } from '@prisma/client'
import { useRecoilState } from 'recoil'
import { selectedRecordState } from '../../atoms/records/selectedRecordAtom'
import { findProductName } from '../../services/products/findProductName'
import { findProductPrice } from '../../services/products/findProductPrice'
import { findStoreName } from '../../services/stores/findStoreName'
import useDetailsQuery from '../details/useDetailsQuery'
import useProductsQuery from '../products/useProductsQuery'
import useStocksQuery from '../stock/useStocksQuery'
import useStoresQuery from '../stores/useStoresQuery'

const useRecordDetailsTable = () => {
  const detailsQuery = useDetailsQuery('details')
  const stocksQuery = useStocksQuery('stocks')
  const productsQuery = useProductsQuery('products')
  const storesQuery = useStoresQuery('stores')
  const [selectedRecord] = useRecoilState(selectedRecordState)
  const filteredDetails: RecordDetails[] =
    detailsQuery.data?.recordsDetails?.filter(
      (d: RecordDetails) => d.recordId === selectedRecord.id
    )
  const filteredDetailsTableData = filteredDetails?.map((detail) => {
    const stock = stocksQuery.data?.stocks.find(
      (stock: Stock) => stock.id === detail.stockId
    )
    const productId = stock?.productId
    const storeId = stock?.storeId
    return {
      stockId: detail.stockId,
      productName: findProductName(productId, productsQuery),
      storeName: findStoreName(storeId, storesQuery),
      quantity: detail.quantity,
      price: findProductPrice(productId, productsQuery),
      subtotal: detail.subtotal
    }
  })
  return { filteredDetailsTableData }
}

export default useRecordDetailsTable
