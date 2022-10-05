/* eslint-disable react/prop-types */
import React from 'react'
import { Panel } from 'primereact/panel'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { defaultAmmount, ammountRecordAtomState } from '../../../../frontend/atoms/records/ammountRecordAtom'
import { useRecoilState } from 'recoil'
import NumberFormat from 'react-number-format'
import { InputText } from 'primereact/inputtext'

const PanelTotal = ({ handleCreateNewRecord, handleCreateNewRecordFactura, recordObservation, recordAdress, selectedSupplier }: {handleCreateNewRecord: any; handleCreateNewRecordFactura: any; recordObservation: any; recordAdress: any; selectedSupplier: any}) => {
  const [ammount, setAmmount] = useRecoilState(ammountRecordAtomState)
  return (
    <div className='container-total'>
        <Panel>
            <Card>
            <span className="p-float-label">
                <InputText style={{ width: '100%' }} {...recordObservation} id="obeservation" />
                <label htmlFor="obeservation">Observación</label>
            </span>
            <span className="p-float-label" style={{ marginTop: '2rem' }}>
                <InputText style={{ width: '100%' }} {...recordAdress} id="adress" />
                <label htmlFor="adress">Dirección</label>
            </span>
            </Card>
            <Card>
                <h1>TOTAL: <NumberFormat value={ammount.ammount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}></NumberFormat></h1>
            </Card>
            <Button style={{ width: '-webkit-fill-available', justifyContent: 'center' }} onClick={() => {
              if (selectedSupplier != null) {
                handleCreateNewRecord()
              } else {
                handleCreateNewRecordFactura()
              }
              setAmmount(defaultAmmount)
            }} className="p-button-success"><h2>GENERAR COMPROBANTE</h2></Button>
        </Panel>
    </div>
  )
}
export default PanelTotal
