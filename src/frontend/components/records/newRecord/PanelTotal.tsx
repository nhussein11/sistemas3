/* eslint-disable react/prop-types */
import React from 'react'
import { Panel } from 'primereact/panel'
import { Card } from 'primereact/card'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'

const PanelTotal = ({ handleCreateNewRecord }: {handleCreateNewRecord: any}) => {
  return (
    <div className='container-total'>
        <Panel>
            <Card>
                <h1>TOTAL: $10.000</h1>
            </Card>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', margin: '1rem', columnGap: '3rem' }}>
                <InputNumber id='paid' placeholder='Ingresar Importe' mode="currency" currency="USD" locale="en-US" />
            </div>
            <Button style={{ width: '-webkit-fill-available', justifyContent: 'center' }} onClick={() => {
              handleCreateNewRecord()
            }} className="p-button-success"><h2>GENERAR VENTA</h2></Button>
        </Panel>
    </div>
  )
}
export default PanelTotal
