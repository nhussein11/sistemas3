/* eslint-disable react/prop-types */
import React from 'react'
import { Panel } from 'primereact/panel'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'

const PanelTotal = ({ handleCreateNewRecord }: {handleCreateNewRecord: any}) => {
  return (
    <div className='container-total'>
        <Panel>
            <Card>
                <h1>TOTAL: $10.000</h1>
            </Card>
            <Button style={{ width: '-webkit-fill-available', justifyContent: 'center' }} onClick={() => {
              handleCreateNewRecord()
            }} className="p-button-success"><h2>GENERAR COMPROBANTE</h2></Button>
        </Panel>
    </div>
  )
}
export default PanelTotal
