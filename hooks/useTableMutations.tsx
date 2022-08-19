import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { isProductCheckedState } from '../atoms/isProductCheckedAtom'
import { selectedProductState } from '../atoms/selectedProductAtom'
import { deleteProduct } from '../services/deleteProducts'

const useTableMutations = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, setIsProductChecked] = useRecoilState(isProductCheckedState)
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
        setIsProductChecked({ id: '', checked: false })
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
