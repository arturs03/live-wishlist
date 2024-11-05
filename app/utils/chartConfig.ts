import type { IProductPriceData } from "@/types/chart"

export const getChartConfigData = (historyData: IProductPriceData) => ({
  labels: historyData.dates,
  datasets: [
    {
      label: 'Price',
      data: historyData.prices,
      fill: false,
      borderColor: '#10B981',
      tension: 0.1,
    },
  ],
})

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        display: true,
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: true,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
}
