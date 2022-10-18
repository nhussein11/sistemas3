import { Customer } from '@prisma/client'
import { useRecoilState } from 'recoil'
import { selectedFilterCustomerState } from '../../atoms/records/selectedFilterCustomer'
import useCustomersQuery from '../customers/useCustomersQuery'

const useCustomerFilter = () => {
  const CustomerQuery = useCustomersQuery('customers')
  const parsedCustomers = CustomerQuery?.data?.customers.map(
    (c: Customer) => c.name
  )
  parsedCustomers?.push('Todos')
  const [selectedFilterCustomer, setSelectedFilterCustomer] = useRecoilState(
    selectedFilterCustomerState
  )
  const changeCustomer = (customerName: string) => {
    const customer = CustomerQuery?.data?.customers.find(
      (c: Customer) => c.name === customerName
    )
    if (customer) {
      setSelectedFilterCustomer(customer)
      return
    }
    setSelectedFilterCustomer({ id: '', name: 'Todos' })
  }
  return {
    parsedCustomers,
    changeCustomer,
    selectedFilterCustomer
  }
}

export default useCustomerFilter
