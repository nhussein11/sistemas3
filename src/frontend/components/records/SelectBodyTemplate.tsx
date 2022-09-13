import React from 'react'
import { Checkbox } from 'primereact/checkbox'
import { useRecoilState } from 'recoil'
import {
  defaultRecord,
  selectedRecordState
} from '../../atoms/records/selectedRecordAtom'
import { isSRecordCheckedState } from '../../atoms/records/setSelectedRecordAtom'
import { Record } from '@prisma/client'

const SelectBodyTemplate = ({ rowData }: { rowData: Record }) => {
  const [, setSelectedRecord] = useRecoilState(selectedRecordState)
  const [isRecordChecked, setIsRecordChecked] = useRecoilState(
    isSRecordCheckedState
  )
  const handleCheck = () => {
    if (isRecordChecked.id === rowData.id) {
      setIsRecordChecked({ id: '', checked: false })
      setSelectedRecord(defaultRecord)
      return
    }
    setIsRecordChecked({ id: rowData.id, checked: true })
    setSelectedRecord(rowData)
  }
  return (
    <Checkbox
      onChange={() => handleCheck()}
      value={rowData.id}
      checked={isRecordChecked.id === rowData.id}
    ></Checkbox>
  )
}

export default SelectBodyTemplate
