import type { NextPage } from 'next'
import Head from 'next/head'
import { Splitter, SplitterPanel } from 'primereact/splitter'
import { Panel } from 'primereact/panel'
import DialogTableProducts from '../frontend/components/records/newRecord/DialogTableProducts'
import DialogTableRecords from '../frontend/components/records/newRecord/DialogTableRecords'
import ToolBarProducts from '../frontend/components/records/newRecord/ToolBarProducts'
import SaleDataBar from '../frontend/components/records/newRecord/SaleDataBar'
import TableAddedProducts from '../frontend/components/records/newRecord/TableAddedProducts'
import TableAddedRecords from '../frontend/components/records/newRecord/TableAddedRecords'
import PanelTotal from '../frontend/components/records/newRecord/PanelTotal'
import { useState } from 'react'
import useNewRecordMutation from '../frontend/hooks/records/useNewRecordMutation'
import { selectedRecordDetailsState } from '../frontend/atoms/records/selectedRecordDetails'
import { selectedRecordsState } from '../frontend/atoms/records/selectedRecords'
import { useRecoilState } from 'recoil'
import QuantitySelectorDialog from '../frontend/components/records/newRecord/QuantitySelectorDialog'
import { RecordNameEnum } from '@prisma/client'

const NewRecord: NextPage = () => {
  const {
    handleCreateNewRecord,
    changeStore,
    changeRecordType,
    changeSupplier,
    changeCustomer,
    selectedRecordType,
    selectedStore,
    selectedCustomer,
    selectedSupplier,
    recordTypesOptions,
    storesOptions,
    stockOptions,
    customerOptions,
    suppliersOptions,
    recordsOptions,
    recordObservation,
    recordAdress,
    recordLetter,
    recordNumber,
    recordPaidFor,
    productsQuery,
    storesQuery,
    customerQuery,
    supplierQuery
  } = useNewRecordMutation('records')
  const [selectedRecordDetails] = useRecoilState(selectedRecordDetailsState)
  const [selectedRecords] = useRecoilState(selectedRecordsState)
  const [showTableProducts, setShowTableProducts] = useState(false)
  const [showTableRecords, setShowTableRecords] = useState(false)
  const [, setVisibleSelectorQuantity] = useState(false)
  function tableRecord () {
    switch (selectedRecordType.recordName) {
      case RecordNameEnum.FACTURA_ORIGINAL:
        return (<TableAddedProducts products={selectedRecordDetails} productsQuery={productsQuery} storesQuery={storesQuery} ></TableAddedProducts>)
      case RecordNameEnum.ORDEN_DE_PAGO:
        return (<TableAddedRecords records={selectedRecords} customerQuery={customerQuery} supplierQuery={supplierQuery} ></TableAddedRecords>)
    }
  }
  return (
    <div>
      <Head>
        <title>Nuevo Comprobante</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ marginTop: '5px' }}>
        <QuantitySelectorDialog />
        <DialogTableProducts products={stockOptions} productsQuery={productsQuery} storesQuery={storesQuery}
        setVisibleSelectorQuantity={setVisibleSelectorQuantity} displayBasic={showTableProducts} closeDialog={() => setShowTableProducts(false)}></DialogTableProducts>
        <DialogTableRecords records={recordsOptions} supplierQuery={supplierQuery} customerQuery={customerQuery}
        setVisibleSelectorQuantity={setVisibleSelectorQuantity} displayBasic={showTableRecords} closeDialog={() => setShowTableRecords(false)}></DialogTableRecords>
        <Panel>
            <SaleDataBar customers={customerOptions} suppliers={suppliersOptions} recordTypes={recordTypesOptions} stores={storesOptions}
            selectedCustomer={selectedCustomer} selectedSupplier={selectedSupplier} selectedRecordType={selectedRecordType} selectedStore={selectedStore}
            changeCustomer={changeCustomer} changeSupplier={changeSupplier} changeStore={changeStore} changeRecordType={changeRecordType}
            recordLetter={recordLetter} recordNumber={recordNumber} recordPaidFor={recordPaidFor}/>
        </Panel>
        <Splitter style={{ height: '100%' }}>
            <SplitterPanel>
                <div className="card">
                    <ToolBarProducts recordName={selectedRecordType.recordName} setVisibleTableProducts={() => setShowTableProducts(true)} setVisibleTableRecords={() => setShowTableRecords(true)}></ToolBarProducts>
                </div>
                <div className='card'>
                    {tableRecord()}
                </div>
            </SplitterPanel>
            <SplitterPanel style={{ width: '90%' }}>
                <PanelTotal recordObservation={recordObservation} recordAdress={recordAdress} handleCreateNewRecord={handleCreateNewRecord}/>
            </SplitterPanel>
        </Splitter>
      </div>
    </div>
  )
}

export default NewRecord
