import React from 'react'
import { Dialog } from 'primereact/dialog'
import { useRecoilState } from 'recoil'
import { defaultErrorState, ErrorState } from '../../atoms/ErrorAtom'
import { showErrorDialogState } from '../../atoms/showErrorDialog'

const DialogError = () => {
  const [errorState, setErrorState] = useRecoilState(ErrorState)
  const [showErrorDialog, setShowErrorDialog] =
    useRecoilState(showErrorDialogState)

  return (
    <Dialog
      visible={showErrorDialog}
      header="Error"
      style={{ width: '50vw' }}
      onHide={() => {
        setShowErrorDialog(false)
        setErrorState(defaultErrorState)
      }}
    >
      <div className="field-form-container">
        <span className="p-float-label">{errorState.message}</span>
      </div>
    </Dialog>
  )
}

export default DialogError
