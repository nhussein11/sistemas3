import { MovementDetails } from '@prisma/client'
import { useRecoilState } from 'recoil'
import { selectedMovementState } from '../../atoms/selectedMovementAtom'
import useDetailsQuery from '../details/useDetailsQuery'

const useMovementDetailsTable = () => {
  const detailsQuery = useDetailsQuery('details')
  const [selectedMovement] = useRecoilState(selectedMovementState)
  const filteredDetails: MovementDetails[] =
    detailsQuery.data?.movementsDetails?.filter(
      (d: MovementDetails) => d.movementId === selectedMovement.id
    )
  return { filteredDetails }
}

export default useMovementDetailsTable
