import React from 'react'
import { Chart } from 'primereact/chart'
import { useAxios } from '../../hooks/useAxios'
import { ProgressSpinner } from 'primereact/progressspinner'
const getLightTheme = () => {
  const basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    }
  }

  const horizontalOptions = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    }
  }

  const stackedOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      tooltips: {
        mode: 'index',
        intersect: false
      },
      legend: {
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        stacked: true,
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    }
  }

  const multiAxisOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      },
      tooltips: {
        mode: 'index',
        intersect: true
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          min: 0,
          max: 100,
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
          color: '#ebedef'
        },
        ticks: {
          min: 0,
          max: 100,
          color: '#495057'
        }
      }
    }
  }

  return {
    basicOptions,
    horizontalOptions,
    stackedOptions,
    multiAxisOptions
  }
}
type props = {
  salesColor: string
  purchasesColor: string
  salesEndpoint: string
  purchasesEndpoint: string
  labels: string[]
}

const SalesPurchasesDashBoard = ({
  salesColor,
  purchasesColor,
  salesEndpoint,
  purchasesEndpoint,
  labels
}: props) => {
  const { fetchedData: fetchedSalesData, isLoading } = useAxios(salesEndpoint)
  const { fetchedData: fetchedPurchasesData, isLoading: isLoading2 } =
    useAxios(purchasesEndpoint)
  const { basicOptions } = getLightTheme()
  const salesData = Array.isArray(fetchedSalesData)
    ? fetchedSalesData.map((item) => item?.subtotal)
    : []
  const purchasesData = Array.isArray(fetchedPurchasesData)
    ? fetchedPurchasesData.map((item) => item?.subtotal)
    : []
  return (
    <div>
      {isLoading || isLoading2
        ? (
        <ProgressSpinner />
          )
        : (
        <div className="card">
          <Chart
            type="bar"
            data={{
              labels,
              datasets: [
                {
                  label: 'Sales',
                  backgroundColor: salesColor,
                  data: salesData
                },
                {
                  label: 'Purchases',
                  backgroundColor: purchasesColor,
                  data: purchasesData
                }
              ]
            }}
            options={basicOptions}
            width={'400px'}
            height={'300px'}
          />
        </div>
          )}
    </div>
  )
}
export default SalesPurchasesDashBoard
