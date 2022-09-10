import React from 'react'
import { Checkbox } from 'primereact/checkbox'
import { useRecoilState } from 'recoil'
import {
  defaultMovement,
  selectedMovementState
} from '../../atoms/movements/selectedMovementAtom'
import { isSMovementCheckedState } from '../../atoms/movements/setSelectedMovementAtom'
import { Movement } from '@prisma/client'

const SelectBodyTemplate = ({ rowData }: { rowData: Movement }) => {
  const [, setSelectedMovement] = useRecoilState(selectedMovementState)
  const [isMovementChecked, setIsMovementChecked] = useRecoilState(
    isSMovementCheckedState
  )
  const handleCheck = () => {
    if (isMovementChecked.id === rowData.id) {
      setIsMovementChecked({ id: '', checked: false })
      setSelectedMovement(defaultMovement)
      return
    }
    setIsMovementChecked({ id: rowData.id, checked: true })
    setSelectedMovement(rowData)
  }
  return (
    <Checkbox
      onChange={() => handleCheck()}
      value={rowData.id}
      checked={isMovementChecked.id === rowData.id}
    ></Checkbox>
  )
}

export default SelectBodyTemplate
