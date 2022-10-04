import type { NextPage } from 'next'
import Head from 'next/head'
import { Splitter, SplitterPanel } from 'primereact/splitter'
import { Panel } from 'primereact/panel'
import DialogTableProducts from '../frontend/components/records/newRecord/DialogTableProducts'
import ToolBarProducts from '../frontend/components/records/newRecord/ToolBarProducts'
import SaleDataBar from '../frontend/components/records/newRecord/SaleDataBar'
import PanelTotal from '../frontend/components/records/newRecord/PanelTotal'
import { useRef, useState } from 'react'
import useNewRecordMutation from '../frontend/hooks/records/useNewRecordMutation'

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
  // const [selectedRecordDetails] = useRecoilState(selectedRecordDetailsState)

  const [displayBasic, setDisplayBasic] = useState(false)
  const [, setVisibleSelectorQuantity] = useState(false)
  const idRef = useRef('')
  const addProductBarCode = async (e: any) => {
    if (e.key === 'Enter') {
      alert('buscar prod x cod barra')
      // esto abre el dialog quantity
    }
  }
  console.log('PRODUCTOS STOCK NR')
  console.log(stockOptions)
  console.log('')
  console.log(storesOptions)
  return (
    <div>
      <Head>
        <title>Nueva Venta</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main-container">
        {/* <QuantitySelector product={product} visibleSelectorQuantity={visibleSelectorQuantity} closeDialog={() => setVisibleSelectorQuantity(false)} showQuantitySelector={showQuantitySelector} quantityRef={quantityRef}></QuantitySelector> */}

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
                    {/* <TableAddedProducts data={addedProducts} remove={deleteProduct}></TableAddedProducts> */}
                </div>
            </SplitterPanel>
            <SplitterPanel>
                <PanelTotal handleCreateNewRecord={handleCreateNewRecord}/>
            </SplitterPanel>
        </Splitter>
      </div>
    </div>
  )
}

export default NewRecord
