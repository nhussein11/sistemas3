import { useMutation, useQueryClient } from '@tanstack/react-query'
import useField from '../useField'
import { MovementType, Store } from '@prisma/client'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import { defaultErrorState, ErrorState } from '../../atoms/error/ErrorAtom'
import { createNewMovement } from '../../services/movements/createNewMovement'
import useMovementTypesQuery from './useMovementTypesQuery'
import { ParseMovementDetails } from '../../services/movements/parseMovementDetails'
import useStoresQuery from '../stores/useStoresQuery'
import { defaultStore, selectedStoreState } from '../../atoms/stores/selectedStoreAtom'
import useProductsQuery from '../products/useProductsQuery'
import { defaultMovementDetails, selectedMovementDetailsState } from '../../atoms/movements/selectedMovementDetails'
const useDialogNewMovementMutation = (queryId: string) => {
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const queryClient = useQueryClient()
  const movementTypesQuery = useMovementTypesQuery('movement-types')
  const storesQuery = useStoresQuery('stores')
  const productsQuery = useProductsQuery('products')
  const [selectedMovementDetails, setSelectedMovementDetails] = useRecoilState(
    selectedMovementDetailsState
  )
  const [selectedStore, setSelectedStore] = useRecoilState(selectedStoreState)
  const [selectedMovementType, setSelectedMovementType] = useState({
    id: '',
    movementType: '',
    movementName: '',
    cause: ''
  })
  const changeMovementType = (name: string) => {
    const movementType = movementTypesQuery.data?.movementsTypes.find(
      (movementType: MovementType) => movementType.movementName === name
    )
    setSelectedMovementType(movementType)
  }
  const changeStore = (name: string) => {
    setSelectedStore(
      storesQuery.data?.stores.find((store: Store) => store.name === name)
    )
  }
  const { mutate } = useMutation(createNewMovement, {
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      movementObservation.onChange('')
      setSelectedMovementType({
        id: '',
        movementType: '',
        movementName: '',
        cause: ''
      })
      setSelectedMovementDetails(defaultMovementDetails)
      setSelectedStore(defaultStore)
      setErrorState(defaultErrorState)
    },
    onError: (error: any) => {
      console.log(error)
      setErrorState({ status: error.response.status, message: error.message })
      setShowErrorDialog(true)
    }
  })
  const movementObservation = useField({ initialValue: '', type: 'text' })
  const handleCreateNewMovement = () => {
    mutate({
      observation: movementObservation.value as string,
      movementTypeId: selectedMovementType.id,
      details: ParseMovementDetails(selectedMovementDetails),
      storeId: selectedStore.id
    })
  }
  const movementTypesOptions = movementTypesQuery?.data?.movementsTypes.map(
    (movementTypes: MovementType) => movementTypes.movementName
  )
  const storesOptions = storesQuery?.data?.stores.map(
    (store: Store) => store.name
  )
  const productsOptions = productsQuery?.data?.products
  return {
    handleCreateNewMovement,
    movementObservation,
    changeMovementType,
    selectedMovementType,
    selectedStore,
    changeStore,
    movementTypesOptions,
    storesOptions,
    productsOptions
  }
}

export default useDialogNewMovementMutation
