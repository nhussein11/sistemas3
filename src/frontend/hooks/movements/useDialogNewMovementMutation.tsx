import { useMutation, useQueryClient } from '@tanstack/react-query'
import useField from '../useField'
import { MovementType, Store } from '@prisma/client'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { showErrorDialogState } from '../../atoms/showErrorDialog'
import { defaultErrorState, ErrorState } from '../../atoms/ErrorAtom'
import { createNewMovement } from '../../services/movements/createNewMovement'
import useMovementTypesQuery from './useMovementTypesQuery'
import { selectedMovementDetailsState } from '../../atoms/selectedMovementDetails'
import { ParseMovementDetails } from '../../services/movements/parseMovementDetails'
import useStoresQuery from '../stores/useStoresQuery'
import { selectedStoreState } from '../../atoms/selectedStoreAtom'

const useDialogNewMovementMutation = (queryId: string) => {
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const queryClient = useQueryClient()
  const movementTypesQuery = useMovementTypesQuery('movement-types')
  const storesQuery = useStoresQuery('stores')
  const [selectedMovementDetails] = useRecoilState(selectedMovementDetailsState)
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
  return {
    handleCreateNewMovement,
    movementObservation,
    changeMovementType,
    selectedMovementType,
    selectedStore,
    changeStore
  }
}

export default useDialogNewMovementMutation
