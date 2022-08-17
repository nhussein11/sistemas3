import { Card } from 'primereact/card'

const Summary = () => {
  return (<div className='summary-section'>
  <Card className='card-title' title="STOCK"></Card>
  <Card className='card-item' title="49" subTitle="En Stock"></Card>
  <Card className='card-item' title="10" subTitle="Sin Stock"></Card>
  <Card className='card-item' title="4" subTitle="Disponibles"></Card>
</div>)
}

export default Summary
