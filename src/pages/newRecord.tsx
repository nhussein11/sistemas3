import type { NextPage } from 'next'
import Head from 'next/head'
import { Splitter, SplitterPanel } from 'primereact/splitter'
import { Panel } from 'primereact/panel'
import DialogTableProducts from '../frontend/components/records/newRecord/DialogTableProducts'
import ToolBarProducts from '../frontend/components/records/newRecord/ToolBarProducts'
import SaleDataBar from '../frontend/components/records/newRecord/SaleDataBar'
import TableAddedProducts from '../frontend/components/records/newRecord/TableAddedProducts'
import PanelTotal from '../frontend/components/records/newRecord/PanelTotal'
import { useRef, useState } from 'react'
import useNewRecordMutation from '../frontend/hooks/records/useNewRecordMutation'
import { selectedRecordDetailsState } from '../frontend/atoms/records/selectedRecordDetails'
import { useRecoilState } from 'recoil'
import QuantitySelectorDialog from '../frontend/components/records/newRecord/QuantitySelectorDialog'

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
    recordObservation,
    recordAdress,
    recordLetter,
    recordNumber,
    recordPaidFor,
    productsQuery,
    storesQuery
  } = useNewRecordMutation('records')
  const [selectedRecordDetails] = useRecoilState(selectedRecordDetailsState)
  const [displayBasic, setDisplayBasic] = useState(false)
  const [, setVisibleSelectorQuantity] = useState(false)
  const idRef = useRef('')
  const addProductBarCode = async (e: any) => {
    if (e.key === 'Enter') {
      alert('buscar prod x cod barra')
      // esto abre el dialog quantity
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
        setVisibleSelectorQuantity={setVisibleSelectorQuantity} displayBasic={displayBasic} closeDialog={() => setDisplayBasic(false)}></DialogTableProducts>

        <Panel header="DATOS COMPROBANTE">
            <SaleDataBar customers={customerOptions} suppliers={suppliersOptions} recordTypes={recordTypesOptions} stores={storesOptions}
            selectedCustomer={selectedCustomer} selectedSupplier={selectedSupplier} selectedRecordType={selectedRecordType} selectedStore={selectedStore}
            changeCustomer={changeCustomer} changeSupplier={changeSupplier} changeStore={changeStore} changeRecordType={changeRecordType}
            recordObservation={recordObservation} recordAdress={recordAdress} recordLetter={recordLetter} recordNumber={recordNumber} recordPaidFor={recordPaidFor}/>
        </Panel>
        <Splitter style={{ height: '100%' }}>
            <SplitterPanel>
                <div className="card">
                    <ToolBarProducts idRef={idRef} addProductBarCode={addProductBarCode} setVisibleTableProducts={() => setDisplayBasic(true)} ></ToolBarProducts>
                </div>
                <div className='card'>
                    <TableAddedProducts products={selectedRecordDetails} productsQuery={productsQuery} storesQuery={storesQuery} ></TableAddedProducts>
                </div>
            </SplitterPanel>
            <SplitterPanel style={{ width: '90%' }}>
                <PanelTotal handleCreateNewRecord={handleCreateNewRecord}/>
            </SplitterPanel>
        </Splitter>
      </div>
    </div>
  )
}

export default NewRecord
