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
  label: string
  color: string
  endpoint: string
}

const BarChartDemo = ({ label, color, endpoint }:props) => {
  const { fetchedData, isLoading } = useAxios(endpoint)
  const { basicOptions } = getLightTheme()
  const data = Array.isArray(fetchedData) ? fetchedData.map(item => item?.subtotal) : []
  return (
    <div>
      {isLoading
        ? (
          <ProgressSpinner/>
          )
        : (
        <div className="card">
          <Chart
            type="bar"
            data={{
              labels: [
                'October',
                'November',
                'December',
                'January',
                'February'
              ],
              datasets: [
                {
                  label,
                  backgroundColor: color,
                  data
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
export default BarChartDemo
