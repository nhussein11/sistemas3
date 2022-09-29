/* eslint-disable react/prop-types */
import React from 'react'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

export default function SaleDataBar () {
  const payments = ['EFECTIVO', 'LISTA']

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <span className="p-float-label">
            <InputText id="comment" />
            <label htmlFor="comment">Comentario</label>
        </span>
        <div className="field">
            <Dropdown options={['NOMBRE', 'NOMBRE2']} placeholder="Seleccionar Cliente"/>
            <Button style={{ borderRadius: '10%' }} icon="pi pi-plus" className="p-button-rounded p-button-warning" />
        </div>
        <div className="field">
            <Dropdown options={payments} placeholder="Seleccionar Forma Pago"/>
        </div>
    </div>
  )
}
