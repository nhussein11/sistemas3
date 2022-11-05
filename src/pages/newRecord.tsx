import type { NextPage } from 'next'
import Head from 'next/head'
import { Splitter, SplitterPanel } from 'primereact/splitter'
import { Toast } from 'primereact/toast'
import { Panel } from 'primereact/panel'
import DialogTableProducts from '../frontend/components/records/newRecord/DialogTableProducts'
import DialogTableRecords from '../frontend/components/records/newRecord/DialogTableRecords'
import DialogSelectPerson from '../frontend/components/records/newRecord/DialogSelectPerson'
import ToolBarProducts from '../frontend/components/records/newRecord/ToolBarProducts'
// import SaleDataBar from '../frontend/components/records/newRecord/SaleDataBar'
import TableAddedProducts from '../frontend/components/records/newRecord/TableAddedProducts'
import TableAddedRecords from '../frontend/components/records/newRecord/TableAddedRecords'
import PanelTotal from '../frontend/components/records/newRecord/PanelTotal'
import { useRef, useState } from 'react'
import useNewRecordMutation from '../frontend/hooks/records/useNewRecordMutation'
import useNewRecordForFacturasMutation from '../frontend/hooks/records/useNewRecordForFacturasMutation'
import { selectedRecordDetailsState } from '../frontend/atoms/records/selectedRecordDetails'
import { selectedRecordsState } from '../frontend/atoms/records/selectedRecords'
import { useRecoilState } from 'recoil'
import QuantitySelectorDialog from '../frontend/components/records/newRecord/QuantitySelectorDialog'
import { RecordNameEnum } from '@prisma/client'
import useField from '../frontend/hooks/useField'
import { isPostState } from '../frontend/atoms/isPostState'
import SpinnerDialog from '../frontend/components/SpinnerDialog'
import { titleRecordState } from '../frontend/atoms/titleRecords'
import useNewRecordMovement from '../frontend/hooks/records/useNewRecordMovement'

const NewRecord: NextPage = () => {
  const recordObservation = useField({ initialValue: '', type: 'text' })
  const recordAdress = useField({ initialValue: '', type: 'text' })
  const recordNumber = useField({ initialValue: '', type: 'number' })
  const toast = useRef(null)
  const {
    handleCreateNewRecord,
    changeStore,
    changeRecordType,
    changeSupplier,
    changeCustomer,
    changeLetter,
    selectedRecordType,
    selectedStore,
    selectedCustomer,
    selectedSupplier,
    selectedRecordLetter,
    recordTypesOptions,
    storesOptions,
    stockOptions,
    customerOptions,
    suppliersOptions,
    recordsOptions,
    productsQuery,
    storesQuery,
    customerQuery,
    supplierQuery,
    detailsQuery
  } = useNewRecordMutation('records', recordObservation, recordAdress, recordNumber, toast)
  const { handleCreateNewRecordForFacturas } = useNewRecordForFacturasMutation('previous-record', recordObservation, recordAdress, recordNumber, toast)
  const { handleCreateNewRecordMovement } = useNewRecordMovement('stock-movements', toast)
  const [selectedRecordDetails] = useRecoilState(selectedRecordDetailsState)
  const [selectedRecords] = useRecoilState(selectedRecordsState)
  const [title] = useRecoilState(titleRecordState)
  const [posting] = useRecoilState(isPostState)
  const [showTableProducts, setShowTableProducts] = useState(false)
  const [showTableRecords, setShowTableRecords] = useState(false)
  const [showPersonDialog, setShowPersonDialog] = useState(false)
  const [, setVisibleSelectorQuantity] = useState(false)
  function tableRecord () {
    switch (selectedRecordType?.recordName) {
      case RecordNameEnum.FACTURA_ORIGINAL:
      case RecordNameEnum.FACTURA_DUPLICADO:
      case RecordNameEnum.MOVIENTO_DE_STOCK_EGRESO:
      case RecordNameEnum.MOVIENTO_DE_STOCK_INGRESO:
        return (<TableAddedProducts products={selectedRecordDetails} productsQuery={productsQuery} storesQuery={storesQuery} ></TableAddedProducts>)
      case RecordNameEnum.ORDEN_DE_PAGO:
      case RecordNameEnum.ORDEN_DE_COMPRA:
        return (<TableAddedRecords records={selectedRecords} customerQuery={customerQuery} supplierQuery={supplierQuery} detailsQuery={detailsQuery} ></TableAddedRecords>)
    }
  }

  function refresh () {
    recordObservation.onChange('')
    recordAdress.onChange('')
    recordNumber.onChange('')
  }
  return (
    <div>
      <Head>
        <title>Nuevo Comprobante</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ marginTop: '5px' }}>
        <Toast ref={toast} />
        <QuantitySelectorDialog recordName={selectedRecordType?.recordName}/>
        <DialogSelectPerson customerQuery={customerQuery} supplierQuery={supplierQuery} displayBasic={showPersonDialog} changeCustomer={changeCustomer} changeSupplier={changeSupplier} closeDialog={() => setShowPersonDialog(false)}/>
        <DialogTableProducts products={stockOptions} productsQuery={productsQuery} storesQuery={storesQuery}
        setVisibleSelectorQuantity={setVisibleSelectorQuantity} displayBasic={showTableProducts} closeDialog={() => setShowTableProducts(false)}></DialogTableProducts>
        <DialogTableRecords records={recordsOptions} supplierQuery={supplierQuery} customerQuery={customerQuery} detailsQuery={detailsQuery}
        setVisibleSelectorQuantity={setVisibleSelectorQuantity} displayBasic={showTableRecords} closeDialog={() => setShowTableRecords(false)}></DialogTableRecords>
        <Panel>
          <h1 style={{ marginTop: '0', marginBottom: '0', marginLeft: '30px' }}>{title}</h1>
          {posting ? <SpinnerDialog /> : ''}
        </Panel>
        <Splitter style={{ height: '100%' }}>
            <SplitterPanel style={{ width: '90%' }}>
                <PanelTotal
                 customers={customerOptions} suppliers={suppliersOptions} recordTypes={recordTypesOptions} stores={storesOptions}
                 selectedCustomer={selectedCustomer} selectedSupplier={selectedSupplier} selectedRecordType={selectedRecordType} selectedStore={selectedStore} selectedLetter={selectedRecordLetter}
                 changeCustomer={changeCustomer} changeSupplier={changeSupplier} changeStore={changeStore} changeRecordType={changeRecordType} changeLetter={changeLetter}
                 recordNumber={recordNumber} setShowPersonDialog={setShowPersonDialog}
                 recordName={selectedRecordType?.recordName} recordObservation={recordObservation} recordAdress={recordAdress}
                 handleCreateNewRecord={handleCreateNewRecord} handleCreateNewRecordForFacturas={handleCreateNewRecordForFacturas} handleCreateNewRecordMovement={handleCreateNewRecordMovement} refresh={refresh}/>
            </SplitterPanel>
            <SplitterPanel>
                <div className="card">
                    <ToolBarProducts recordName={selectedRecordType?.recordName} setVisibleTableProducts={() => setShowTableProducts(true)} setVisibleTableRecords={() => setShowTableRecords(true)}></ToolBarProducts>
                </div>
                <div className='card'>
                    {tableRecord()}
                </div>
            </SplitterPanel>
        </Splitter>
      </div>
    </div>
  )
}

export default NewRecord
