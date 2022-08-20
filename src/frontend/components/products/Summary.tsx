import { Card } from 'primereact/card'
import { SummaryProps } from '../../@types/frontend.types'

const Summary = ({ inStock, available, noStock }: SummaryProps) => {
  return (
    <div className="summary-section">
      <Card className="card-title" title="STOCK"></Card>
      <Card className="card-item" title={inStock} subTitle="En Stock"></Card>
      <Card className="card-item" title={noStock} subTitle="Sin Stock"></Card>
      <Card
        className="card-item"
        title={available}
        subTitle="Disponibles"
      ></Card>
    </div>
  )
}

export default Summary
