import { useMutation, useQueryClient } from '@tanstack/react-query'
import useField from '../useField'
import { MovementType } from '@prisma/client'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { showErrorDialogState } from '../../atoms/showErrorDialog'
import { defaultErrorState, ErrorState } from '../../atoms/ErrorAtom'
import { createNewMovement } from '../../services/movements/createNewMovement'
import useMovementTypesQuery from './useMovementTypesQuery'

const useDialogNewMovementMutation = (queryId: string) => {
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const queryClient = useQueryClient()
  const movementTypesQuery = useMovementTypesQuery('movement-types')
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
    console.log(movementType)
    setSelectedMovementType(
      movementType
    )
  }
  const { mutate } = useMutation(createNewMovement, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      //! Deberia de registrar los detalles aca
      movementObservation.onChange('')
      setErrorState(defaultErrorState)
    },
    onError: (error: any) => {
      setErrorState({ status: error.response.status, message: error.message })
      setShowErrorDialog(true)
    }
  })
  const movementObservation = useField({ initialValue: '', type: 'text' })
  const handleCreateNewProduct = () => {
    mutate({
      datetime: new Date(),
      observation: movementObservation.value as string,
      MovementTypeId: selectedMovementType.id
    })
  }
  return {
    handleCreateNewProduct,
    movementObservation,
    changeMovementType,
    selectedMovementType
  }
}

export default useDialogNewMovementMutation
