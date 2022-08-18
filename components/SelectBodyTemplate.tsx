import { Checkbox } from 'primereact/checkbox'
import React, { useState } from 'react'

const SelectBodyTemplate = () => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <Checkbox
      onChange={(e) => setIsChecked(e.checked)}
      checked={isChecked}
    ></Checkbox>
  )
}

export default SelectBodyTemplate
