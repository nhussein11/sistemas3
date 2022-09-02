import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { defaultErrorState, ErrorState } from '../../atoms/ErrorAtom'
import {
  defaultProductChecked,
  isProductCheckedState
} from '../../atoms/isProductCheckedAtom'
import {
  defaultProduct,
  selectedProductState
} from '../../atoms/selectedProductAtom'
import { showErrorDialogState } from '../../atoms/showErrorDialog'
import { deleteProduct } from '../../services/products/deleteProducts'

const useDeleteProductMutation = (queryId: string) => {
  // eslint-disable-next-line no-unused-vars
  const [_, setIsProductChecked] = useRecoilState(isProductCheckedState)
  const [selectedProduct, setSelectedProduct] =
    useRecoilState(selectedProductState)
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (productId: string) => deleteProduct(productId),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries([queryId])
        setSelectedProduct(defaultProduct)
        setIsProductChecked(defaultProductChecked)
        setErrorState(defaultErrorState)
      },
      onError: (error:any) => {
        setErrorState({ status: error.response.status, message: error.message })
        setShowErrorDialog(true)
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

export default useDeleteProductMutation
