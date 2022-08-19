import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { selectedProductState } from '../atoms/selectedProductAtom'
import { deleteProduct } from '../services/deleteProducts'

const useTableMutations = () => {
  const [selectedProduct, setSelectedProduct] =
    useRecoilState(selectedProductState)
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (productId: string) => deleteProduct(productId),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['products'])
        setSelectedProduct({
          id: '',
          name: '',
          price: 0
        })
      }
    }
  )
  const handleDeleteProduct = () => {
    mutate(selectedProduct.id)
  }
  return {
    handleDeleteProduct
  }
}

export default useTableMutations
