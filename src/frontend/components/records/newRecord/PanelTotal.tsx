/* eslint-disable react/prop-types */
import React from 'react'
import { Panel } from 'primereact/panel'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { defaultAmmount, ammountRecordAtomState } from '../../../../frontend/atoms/records/ammountRecordAtom'
import { useRecoilState } from 'recoil'
import NumberFormat from 'react-number-format'
import { InputText } from 'primereact/inputtext'
import { Customer, RecordNameEnum, Supplier, Store, LetterEnum } from '@prisma/client'
import { isPostState } from '../../../atoms/isPostState'
import { Dropdown } from 'primereact/dropdown'

const PanelTotal = ({
  handleCreateNewRecord, handleCreateNewRecordForFacturas, handleCreateNewRecordMovement, recordObservation, recordAdress, recordName, refresh,
  customers, suppliers, recordTypes, stores, selectedCustomer, selectedSupplier, selectedStore, selectedLetter, selectedRecordType,
  changeCustomer, changeSupplier, changeStore, changeRecordType, changeLetter, recordNumber, setShowPersonDialog
}:
  {handleCreateNewRecordForFacturas: any; handleCreateNewRecord: any; handleCreateNewRecordMovement: any; recordObservation: any; recordAdress: any; recordName: any; refresh: any;
    customers: Object[]; suppliers: Object[]; recordTypes: Object[]; stores: Object[]; selectedCustomer: Customer; selectedSupplier: Supplier; selectedStore: Store; selectedRecordType: any; selectedLetter: any
    changeCustomer: any; changeSupplier: any; changeStore: any; changeRecordType: any; changeLetter: any; recordNumber: any; setShowPersonDialog: any}) => {
  const [ammount, setAmmount] = useRecoilState(ammountRecordAtomState)
  const [, setPosting] = useRecoilState(isPostState)

  function dropPerson () {
    switch (selectedRecordType.recordName) {
      case RecordNameEnum.FACTURA_ORIGINAL:
      case RecordNameEnum.ORDEN_DE_PAGO:
        return (<Dropdown options={suppliers} value={selectedSupplier?.name} onChange={(e) => changeSupplier(e.target.value)} placeholder="Seleccionado" disabled={true}/>)
      case RecordNameEnum.FACTURA_DUPLICADO:
      case RecordNameEnum.ORDEN_DE_COMPRA:
        return (<Dropdown options={customers} value={selectedCustomer?.name} onChange={(e) => changeCustomer(e.target.value)} placeholder="Seleccionado" disabled={true}/>)
      default:
    }
  }
  function storeDialog () {
    if (checkRecordMovement()) {
      return (<Dropdown options={stores} value={selectedStore?.name} onChange={(e) => changeStore(e.target.value)} placeholder="Seleccionar Depósito"/>)
    }
  }
  function checkRecordMovement () {
    if (selectedRecordType.recordName === RecordNameEnum.MOVIENTO_DE_STOCK_EGRESO || selectedRecordType.recordName === RecordNameEnum.MOVIENTO_DE_STOCK_INGRESO) return true
    else return false
  }
  return (
    <div className='container-total'>
        <Panel>
            <Card>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto auto auto auto', justifyContent: 'left', columnGap: '10px' }}>
              <Dropdown options={recordTypes} value={selectedRecordType?.recordName} onChange={(e) => changeRecordType(e.target.value)} placeholder="Seleccionar Tipo Comp"/>
              {storeDialog()}
              {!checkRecordMovement() ? <Dropdown options={[LetterEnum.A, LetterEnum.B, LetterEnum.C]} value={selectedLetter} onChange={(e) => changeLetter(e.target.value)} placeholder="Seleccionar Tipo Comprobante"/> : null}
              {dropPerson()}
              {!checkRecordMovement() ? <Button label={'Buscar'} icon="pi pi-search" className="p-button-waring mr-2" onClick={() => setShowPersonDialog(true)} /> : null }
            </div>
            {!checkRecordMovement()
              ? (<>
            <span className="p-float-label" style={{ marginTop: '2rem' }}>
                <InputText {...recordNumber} id="recordNumber" />
                <label htmlFor="recordNumber">Número</label>
            </span>
            <span className="p-float-label" style={{ marginTop: '2rem' }}>
                <InputText style={{ width: '100%' }} {...recordObservation} id="obeservation" />
                <label htmlFor="obeservation">Observación</label>
            </span>
            <span className="p-float-label" style={{ marginTop: '2rem' }}>
                <InputText style={{ width: '100%' }} {...recordAdress} id="adress" />
                <label htmlFor="adress">Dirección</label>
            </span>
            </>)
              : null}
            </Card>
            <Card>
                {recordName.includes('MOV') ? null : <h1 style={{ textAlign: 'end' }}>TOTAL: <NumberFormat value={ammount.ammount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}></NumberFormat></h1>}
            </Card>
            <Button style={{ width: '-webkit-fill-available', justifyContent: 'center' }} onClick={() => {
              setPosting(true)
              switch (recordName) {
                case RecordNameEnum.FACTURA_DUPLICADO:
                case RecordNameEnum.FACTURA_ORIGINAL:
                  handleCreateNewRecord()
                  break
                case RecordNameEnum.ORDEN_DE_COMPRA:
                case RecordNameEnum.ORDEN_DE_PAGO:
                  handleCreateNewRecordForFacturas()
                  break
                case RecordNameEnum.MOVIENTO_DE_STOCK_EGRESO:
                case RecordNameEnum.MOVIENTO_DE_STOCK_INGRESO:
                  handleCreateNewRecordMovement()
                  break
              }
              refresh()
              setAmmount(defaultAmmount)
            }} className="p-button-success"><h2>GENERAR COMPROBANTE</h2></Button>
        </Panel>
    </div>
  )
}
export default PanelTotal
