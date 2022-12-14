import React from 'react'
import { Card } from 'primereact/card'
import { CardProps } from '../../@types/frontend.types'

const CardComponent = ({ name, value, icon, color }: CardProps) => {
  return (
    <Card
      className="card-item-dashboard"
      footer={
        <div>
          <p style={{ color, fontWeight: 'bold' }}>
            +20% <span>La última semana</span>
          </p>
        </div>
      }
      header={
        <div>
          <h2>{name} (Mensual)</h2>
        </div>
      }
    >
      <div className="card-body">
        <h2>{value}</h2>
        <i className={`pi ${icon} mr-2`} style={{ fontSize: '4em' }}></i>
      </div>
    </Card>
  )
}

export default CardComponent
