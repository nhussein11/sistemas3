import React, { useState } from 'react'

const useField = ( initialValue, type, handleChange=null ) => {
  const [value, setValue] = useState(initialValue)
  const onChange = (e) => {
    onChange(e.target.value)
    handleChange?.(e.target.value)
  }
  return { value, onChange, type }
}

export default useField
