import type { NextPage } from 'next'
import Head from 'next/head'
import CardComponent from '../frontend/components/dashboard/Card'
import BarChartDemo from '../frontend/components/dashboard/Graph'
import { Card } from 'primereact/card'
import { useAxios } from '../frontend/hooks/useAxios'
import { Course } from '@prisma/client'
import BarChartCourses from '../frontend/components/dashboard/CourseDashBoard'

const Home: NextPage = () => {
  const { fetchedData, isLoading } = useAxios('/courses')
  return (
    <div>
      <Head>
        <title>Sistemas III</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="contenedor-dashboard">
        <CardComponent
          name="Ganancias"
          value="$40.000"
          icon="pi-dollar"
          color="green"
        />
        <CardComponent
          name="Ventas"
          value="+1.300"
          icon="pi-shopping-cart"
          color="red"
        />
        <CardComponent
          name="Alumnos"
          value="+45"
          icon="pi-users"
          color="green"
        />
      </div>
      <div className="contenedor-grafico">
        <Card className="card-graph">
          <BarChartDemo
            endpoint={'/dashboards/sales'}
            label={'sales'}
            color={'#75AAE1'}
            labels={['October', 'November', 'December', 'January', 'February']}
          />
        </Card>
        <Card className="card-graph">
          <BarChartDemo
            endpoint={'/dashboards/purchases'}
            label={'purchases'}
            color={'#950A21'}
            labels={['October', 'November', 'December', 'January', 'February']}
          />
          <BarChartCourses
            endpoint={'/dashboards/courses'}
            label={'courses'}
            color={'#950A21'}
            labels={
              isLoading && fetchedData?.map((item: Course) => item?.name)
            }
          />
        </Card>
      </div>
    </div>
  )
}

export default Home
