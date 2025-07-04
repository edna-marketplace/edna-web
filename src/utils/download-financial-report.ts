import { RevenuePeriod } from '@/api/get-monthly-revenue-by-period-metrics'
import { GetWeekCustomersMetricsResponse } from '@/api/get-week-customers-metrics'
import { GetWeekOrdersMetricsResponse } from '@/api/get-week-orders-metrics'
import { GetWeekRevenueMetricsResponse } from '@/api/get-week-revenue-metrics'
import jsPDF from 'jspdf'

interface FinancialReportData {
  weekOrders: GetWeekOrdersMetricsResponse
  weekRevenue: GetWeekRevenueMetricsResponse
  weekNewCustomers: GetWeekCustomersMetricsResponse
  revenueByPeriod: RevenuePeriod[]
}

export function downloadFinancialReport(data: FinancialReportData) {
  const doc = new jsPDF()

  // Colors for styling
  const colors = {
    primary: [255, 246, 216], // Blue
    secondary: [52, 73, 94], // Dark gray
    success: [39, 174, 96], // Green
    danger: [231, 76, 60], // Red
    light: [236, 240, 241], // Light gray
    dark: [44, 62, 80], // Dark blue-gray
  }

  // Helper function to draw rounded rectangle
  const drawRoundedRect = (
    x: number,
    y: number,
    width: number,
    height: number,
    radius = 3,
  ) => {
    doc.roundedRect(x, y, width, height, radius, radius)
  }

  // Helper function to draw card
  const drawCard = (
    x: number,
    y: number,
    width: number,
    height: number,
    title: string,
    value: string,
    change: string,
    isPositive: boolean,
  ) => {
    // Card background
    doc.setFillColor(colors.light[0], colors.light[1], colors.light[2])
    drawRoundedRect(x, y, width, height)
    doc.fill()

    // Card border
    doc.setDrawColor(220, 220, 220)
    doc.setLineWidth(0.5)
    drawRoundedRect(x, y, width, height)
    doc.stroke()

    // Title
    doc.setTextColor(
      colors.secondary[0],
      colors.secondary[1],
      colors.secondary[2],
    )
    doc.setFontSize(10)
    doc.text(title, x + 8, y + 12)

    // Value
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text(value, x + 8, y + 25)

    // Change indicator
    const changeValue = parseFloat(change)
    if (changeValue !== 0) {
      const changeColor = changeValue > 0 ? colors.success : colors.danger
      doc.setTextColor(changeColor[0], changeColor[1], changeColor[2])
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      const changeSign = changeValue > 0 ? '+' : '-'
      doc.text(`${changeSign}${Math.abs(changeValue)}%`, x + 8, y + 35)
    }

    // Reset font
    doc.setFont('helvetica', 'normal')
  }

  // Header with background
  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2])
  doc.rect(0, 0, 210, 50, 'F')

  // Title
  doc.setTextColor(79, 76, 66)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('Relatório Financeiro', 20, 25)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'normal')
  doc.text('Edna Marketplace', 20, 35)

  // Date
  const currentDate = new Date().toLocaleDateString('pt-BR')
  doc.setFontSize(10)
  doc.text(`Gerado em: ${currentDate}`, 20, 43)

  // Reset text color
  doc.setTextColor(0, 0, 0)

  // Section title
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
  doc.text('Métricas da Semana', 20, 70)
  doc.setFont('helvetica', 'normal')

  // Cards for weekly metrics
  const cardWidth = 55
  const cardHeight = 40
  const startY = 80

  // Orders card
  const ordersChange = parseFloat(data.weekOrders.percentageChange.toString())
  drawCard(
    20,
    startY,
    cardWidth,
    cardHeight,
    'Pedidos da Semana',
    data.weekOrders.newOrders.toString(),
    data.weekOrders.percentageChange.toString(),
    ordersChange >= 0,
  )

  // Revenue card
  const revenueChange = parseFloat(data.weekRevenue.percentageChange.toString())
  const revenueFormatted = (data.weekRevenue.weekRevenue / 100).toLocaleString(
    'pt-BR',
    {
      style: 'currency',
      currency: 'BRL',
    },
  )
  drawCard(
    80,
    startY,
    cardWidth,
    cardHeight,
    'Receita da Semana',
    revenueFormatted,
    data.weekRevenue.percentageChange.toString(),
    revenueChange >= 0,
  )

  // Customers card
  const customersChange = parseFloat(
    data.weekNewCustomers.percentageChange.toString(),
  )
  drawCard(
    140,
    startY,
    cardWidth,
    cardHeight,
    'Novos Clientes',
    data.weekNewCustomers.newCustomers.toString(),
    data.weekNewCustomers.percentageChange.toString(),
    customersChange >= 0,
  )

  // Monthly revenue section
  const tableStartY = 140
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
  doc.text('Receita Mensal - Últimos 12 Meses', 20, tableStartY)

  // Table styling
  const tableX = 20
  const tableY = tableStartY + 10
  const colWidth = 85
  const rowHeight = 12
  const headerHeight = 15

  // Table header
  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2])
  doc.rect(tableX, tableY, colWidth, headerHeight, 'F')
  doc.rect(tableX + colWidth, tableY, colWidth, headerHeight, 'F')

  doc.setTextColor(79, 76, 66)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Mês/Ano', tableX + 5, tableY + 10)
  doc.text('Receita', tableX + colWidth + 5, tableY + 10)

  // Table rows
  doc.setFont('helvetica', 'normal')
  let currentY = tableY + headerHeight

  data.revenueByPeriod.forEach((month, index) => {
    // Check if we need a new page
    if (currentY > 270) {
      doc.addPage()
      currentY = 20

      // Repeat header on new page
      doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2])
      doc.rect(tableX, currentY, colWidth, headerHeight, 'F')
      doc.rect(tableX + colWidth, currentY, colWidth, headerHeight, 'F')

      doc.setTextColor(79, 76, 66)
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('Mês/Ano', tableX + 5, currentY + 10)
      doc.text('Receita', tableX + colWidth + 5, currentY + 10)

      currentY += headerHeight
      doc.setFont('helvetica', 'normal')
    }

    // Alternate row colors
    if (index % 2 === 0) {
      doc.setFillColor(249, 249, 249)
      doc.rect(tableX, currentY, colWidth * 2, rowHeight, 'F')
    }

    // Row borders
    doc.setDrawColor(220, 220, 220)
    doc.setLineWidth(0.3)
    doc.rect(tableX, currentY, colWidth, rowHeight)
    doc.rect(tableX + colWidth, currentY, colWidth, rowHeight)

    // Month name
    const monthName = new Date(month.year, month.month - 1).toLocaleDateString(
      'pt-BR',
      {
        month: 'long',
        year: 'numeric',
      },
    )

    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
    doc.setFontSize(10)

    // Capitalize first letter
    const capitalizedMonth =
      monthName.charAt(0).toUpperCase() + monthName.slice(1)
    doc.text(capitalizedMonth, tableX + 5, currentY + 8)

    // Revenue value
    const revenueValue = (month.revenuePeriod / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    doc.text(revenueValue, tableX + colWidth + 5, currentY + 8)

    currentY += rowHeight
  })

  // Footer
  doc.setFontSize(8)
  doc.setTextColor(128, 128, 128)
  doc.text(
    'Relatório gerado automaticamente pelo sistema Edna Marketplace',
    20,
    285,
  )
  doc.text(`Página 1 de ${doc.getNumberOfPages()}`, 170, 285)

  // Save the PDF
  const today = new Date()
  const formattedDate = today.toISOString().split('T')[0]
  doc.save(`relatorio-financeiro-edna-${formattedDate}.pdf`)
}
