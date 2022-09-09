import { useMutation, useQueryClient } from '@tanstack/react-query'
import useField from '../useField'
import { MovementType } from '@prisma/client'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { showErrorDialogState } from '../../atoms/showErrorDialog'
import { defaultErrorState, ErrorState } from '../../atoms/ErrorAtom'
import { createNewMovement } from '../../services/movements/createNewMovement'
import useMovementTypesQuery from './useMovementTypesQuery'
import { selectedMovementDetailsState } from '../../atoms/selectedMovementDetails'
import { ParseMovementDetails } from '../../services/movements/parseMovementDetails'

const useDialogNewMovementMutation = (queryId: string) => {
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const queryClient = useQueryClient()
  const movementTypesQuery = useMovementTypesQuery('movement-types')
  const [selectedMovementDetails] = useRecoilState(selectedMovementDetailsState)
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
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      console.log(data.data)
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
      datetime: new Date(),
      observation: movementObservation.value as string,
      movementTypeId: selectedMovementType.id,
      details: ParseMovementDetails(selectedMovementDetails)
    })
  }
  return {
    handleCreateNewMovement,
    movementObservation,
    changeMovementType,
    selectedMovementType
  }
}

export default useDialogNewMovementMutation
