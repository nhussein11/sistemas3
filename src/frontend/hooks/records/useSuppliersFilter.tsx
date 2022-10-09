import { Supplier } from '@prisma/client'
import { useRecoilState } from 'recoil'
import { selectedFilterSupplierState } from '../../atoms/records/selectedFilterSupplier'
import useSuppliersQuery from '../suppliers/useSuppliersQuery'

const useSuppliersFilter = () => {
  const SuppliersQuery = useSuppliersQuery('suppliers')
  const parsedSuppliers = SuppliersQuery?.data?.suppliers.map(
    (supplier: Supplier) => supplier.name
  )
  parsedSuppliers?.push('Todos')
  const [selectedFilterSupplier, setSelectedFilterSupplier] = useRecoilState(
    selectedFilterSupplierState
  )
  const changeSupplier = (supplierName: string) => {
    const supplier = SuppliersQuery?.data?.suppliers.find(
      (supplier: Supplier) => supplier.name === supplierName
    )
    if (supplier) {
      setSelectedFilterSupplier(supplier)
      return
    }
    setSelectedFilterSupplier({ id: '', name: 'Todos' })
  }
  return {
    parsedSuppliers,
    changeSupplier,
    selectedFilterSupplier
  }
}

export default useSuppliersFilter
