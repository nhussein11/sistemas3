import { useMutation, useQueryClient } from '@tanstack/react-query'
import useField from '../useField'
import { CategoryEnum } from '@prisma/client'
import { useState } from 'react'
import useStoresQuery from '../stores/useStoresQuery'
import { Store } from '../../../shared/schemas/store.type'
import { createNewProduct } from '../../services/products/createNewProduct'

const useDialogNewProductMutation = (queryId: string) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(createNewProduct, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      productName.onChange('')
      productDescription.onChange('')
      setCategory(CategoryEnum.IMPRESORA)
      productPrice.onChange(0)
    }
  })
  const productName = useField({ initialValue: '', type: 'text' })
  const productPrice = useField({ initialValue: 0, type: 'number' })
  const productDescription = useField({ initialValue: '', type: 'text' })
  const productQuantity = useField({ initialValue: 0, type: 'number' })
  const productMinQuantity = useField({ initialValue: 0, type: 'number' })
  const storesQuery = useStoresQuery('productStores')
  const [selectedStore, setSelectedStore] = useState({
    id: '',
    name: '',
    address: ''
  })
  const [category, setCategory] = useState(CategoryEnum.IMPRESORA)
  const CATEGORIES = [CategoryEnum.IMPRESORA, CategoryEnum.FILAMENTO]
  const changeStore = (name: string) => {
    setSelectedStore(
      storesQuery.data?.stores.find((store : Store) => store.name === name)
    )
  }
  const handleCreateNewProduct = () => {
    mutate({
      name: productName.value as string,
      price: productPrice.value as number,
      description: productDescription.value as string,
      category,
      storeId: selectedStore.id,
      quantity: productQuantity.value as number,
      minQuantity: productMinQuantity.value as number
    })
  }
  return {
    handleCreateNewProduct,
    productName,
    productPrice,
    productDescription,
    category,
    setCategory,
    CATEGORIES,
    storesQuery,
    changeStore,
    selectedStore,
    productQuantity,
    productMinQuantity
  }
}

export default useDialogNewProductMutation
