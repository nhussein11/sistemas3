import type { NextPage } from 'next'
import Head from 'next/head'
import { useRecoilState } from 'recoil'
import { globalFilterValueState } from '../frontend/atoms/globalFilterValueAtom'
import useRecordsQuery from '../frontend/hooks/records/useRecordsQuery'
import { filterProducts } from '../frontend/services/products/filterProducts'
import { Splitter, SplitterPanel } from 'primereact/splitter'
import { Panel } from 'primereact/panel'
import DialogTableProducts from '../frontend/components/sales/newSale/DialogTableProducts'
import ToolBarProducts from '../frontend/components/sales/newSale/ToolBarProducts'
import SaleDataBar from '../frontend/components/sales/newSale/SaleDataBar'
import PanelTotal from '../frontend/components/sales/newSale/PanelTotal'
import { useRef, useState } from 'react'

const NewSale: NextPage = () => {
  // aca tengo que definir el mutation
  const query = useRecordsQuery('products')
  const [globalFilterValue] = useRecoilState(globalFilterValueState)
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
        <DialogTableProducts products={filterProducts(query?.data?.products, globalFilterValue)}
        setVisibleSelectorQuantity={setVisibleSelectorQuantity}
        displayBasic={displayBasic} closeDialog={() => setDisplayBasic(false)}></DialogTableProducts>

        <Panel header="DATOS VENTA">
            <SaleDataBar/>
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

export default NewSale
