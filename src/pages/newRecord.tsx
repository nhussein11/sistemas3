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
    recordPaidFor
  } = useNewRecordMutation('records')

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
        <title>Nueva Venta</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main-container">
        {/* <QuantitySelector product={product} visibleSelectorQuantity={visibleSelectorQuantity} closeDialog={() => setVisibleSelectorQuantity(false)} showQuantitySelector={showQuantitySelector} quantityRef={quantityRef}></QuantitySelector> */}

        {/* <ClientFormComponent clientDialog={clientDialog} closeDialog={() => setClientDialog(false)} saveClient={saveClient}></ClientFormComponent> */}
        <DialogTableProducts products={stockOptions}
        setVisibleSelectorQuantity={setVisibleSelectorQuantity}
        displayBasic={displayBasic} closeDialog={() => setDisplayBasic(false)}></DialogTableProducts>

        <Panel header="DATOS COMPROBANTE">
            <SaleDataBar customers={customerOptions} suppliers={suppliersOptions} selectedCustomer={selectedCustomer} selectedSupplier={selectedSupplier} changeCustomer={changeCustomer} changeSupplier={changeSupplier}/>
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
                <PanelTotal/>
            </SplitterPanel>
        </Splitter>
      </div>
    </div>
  )
}

export default NewRecord
