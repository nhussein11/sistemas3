/* eslint-disable react/prop-types */
import React from 'react'
import { Panel } from 'primereact/panel'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { defaultAmmount, ammountRecordAtomState } from '../../../../frontend/atoms/records/ammountRecordAtom'
import { useRecoilState } from 'recoil'
import NumberFormat from 'react-number-format'

const PanelTotal = ({ handleCreateNewRecord }: {handleCreateNewRecord: any;}) => {
  const [ammount, setAmmount] = useRecoilState(ammountRecordAtomState)
  return (
    <div className='container-total'>
        <Panel>
            <Card>
                <h1><NumberFormat value={ammount.ammount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}></NumberFormat></h1>
            </Card>
            <Button style={{ width: '-webkit-fill-available', justifyContent: 'center' }} onClick={() => {
              handleCreateNewRecord()
              setAmmount(defaultAmmount)
            }} className="p-button-success"><h2>GENERAR COMPROBANTE</h2></Button>
        </Panel>
    </div>
  )
}
export default PanelTotal
