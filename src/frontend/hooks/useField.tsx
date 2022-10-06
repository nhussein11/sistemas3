import React, { useState } from 'react'
type FieldEvent =
  | React.ChangeEvent<HTMLInputElement>
  | string
  | number
  | undefined
type FieldProps = {
  initialValue: string | number | undefined
  handleChange?: (e: FieldEvent) => void | undefined
  type: string
}

const useField = ({
  initialValue,
  type,
  handleChange = undefined
}: FieldProps) => {
  const [value, setValue] = useState(initialValue)
  const onChange = (e: FieldEvent) => {
    if (typeof e === 'string' || typeof e === 'undefined') {
      setValue(e)
      return
    }
    if (typeof e === 'number') {
      setValue(Number(e).valueOf())
      return
    }
    if (typeof e === 'object') {
      setValue(
        type === 'number' ? Number(e.target.value).valueOf() : e.target.value
      )
      handleChange?.(e.target.value)
    }
  }
  return { value, onChange, type }
}

export default useField
