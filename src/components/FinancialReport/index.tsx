import { Document, Font, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";
import { GetWeekCustomersMetricsResponse } from "@/api/get-week-customers-metrics";
import { GetWeekOrdersMetricsResponse } from "@/api/get-week-orders-metrics";
import { GetWeekRevenueMetricsResponse } from "@/api/get-week-revenue-metrics";
import { GetMonthRevenueMetricsResponse } from "@/api/get-month-revenue-metrics";
import { RevenuePeriod } from "@/api/get-monthly-revenue-by-period-metrics";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
});

interface FinancialReportProps {
  weekNewCustomers: GetWeekCustomersMetricsResponse;
  weekOrders: GetWeekOrdersMetricsResponse;
  weekRevenue: GetWeekRevenueMetricsResponse;
  monthRevenue: GetMonthRevenueMetricsResponse;
  revenueByPeriod: RevenuePeriod[];
  reportDate?: Date;
}

export default function FinancialReport({
  weekNewCustomers,
  weekOrders,
  weekRevenue,
  monthRevenue,
  revenueByPeriod,
  reportDate = new Date(),
}: FinancialReportProps) {
  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(1)}%`;
  };

  const getMonthName = (monthNumber: number) => {
    const months = [
      "JAN",
      "FEV",
      "MAR",
      "ABR",
      "MAI",
      "JUN",
      "JUL",
      "AGO",
      "SET",
      "OUT",
      "NOV",
      "DEZ",
    ];
    return months[monthNumber - 1] || "N/A";
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Relatório Financeiro</Text>
        <Text style={styles.subtitle}>
          Dashboard de E-commerce - {reportDate.toLocaleDateString("pt-BR")}
        </Text>

        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>Pedidos da Semana</Text>
            <Text style={styles.metricValue}>{weekOrders.newOrders}</Text>
            <Text
              style={
                weekOrders.percentageChange >= 0
                  ? styles.metricChange
                  : styles.metricChangeNegative
              }
            >
              {formatChange(weekOrders.percentageChange)}
            </Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>Novos Clientes</Text>
            <Text style={styles.metricValue}>
              {weekNewCustomers.newCustomers}
            </Text>
            <Text
              style={
                weekNewCustomers.percentageChange >= 0
                  ? styles.metricChange
                  : styles.metricChangeNegative
              }
            >
              {formatChange(weekNewCustomers.percentageChange)}
            </Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>Receita Semanal</Text>
            <Text style={styles.metricValue}>
              {formatCurrency(weekRevenue.weekRevenue)}
            </Text>
            <Text
              style={
                weekRevenue.percentageChange >= 0
                  ? styles.metricChange
                  : styles.metricChangeNegative
              }
            >
              {formatChange(weekRevenue.percentageChange)}
            </Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>Receita Mensal</Text>
            <Text style={styles.metricValue}>
              {formatCurrency(monthRevenue.weekRevenue)}
            </Text>
            <Text
              style={
                monthRevenue.percentageChange >= 0
                  ? styles.metricChange
                  : styles.metricChangeNegative
              }
            >
              {formatChange(monthRevenue.percentageChange)}
            </Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Receita por Período</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartText}>Gráfico de Receita por Período</Text>
          </View>
          <View style={styles.monthlyData}>
            {revenueByPeriod.map((period, index) => (
              <View key={index} style={styles.monthItem}>
                <Text style={styles.monthName}>
                  {getMonthName(period.month)}/{period.year}
                </Text>
                <Text style={styles.monthValue}>
                  {formatCurrency(period.revenuePeriod)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Resumo do Período</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={[styles.tableCol, { width: "50%" }]}>
              <Text style={styles.tableCell}>Métrica</Text>
            </View>
            <View style={[styles.tableCol, { width: "30%" }]}>
              <Text style={styles.tableCell}>Valor</Text>
            </View>
            <View style={[styles.tableCol, { width: "20%" }]}>
              <Text style={styles.tableCell}>Variação</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: "50%" }]}>
              <Text style={styles.tableCell}>Pedidos da Semana</Text>
            </View>
            <View style={[styles.tableCol, { width: "30%" }]}>
              <Text style={styles.tableCell}>{weekOrders.newOrders}</Text>
            </View>
            <View style={[styles.tableCol, { width: "20%" }]}>
              <Text style={styles.tableCell}>
                {formatChange(weekOrders.percentageChange)}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: "50%" }]}>
              <Text style={styles.tableCell}>Novos Clientes</Text>
            </View>
            <View style={[styles.tableCol, { width: "30%" }]}>
              <Text style={styles.tableCell}>
                {weekNewCustomers.newCustomers}
              </Text>
            </View>
            <View style={[styles.tableCol, { width: "20%" }]}>
              <Text style={styles.tableCell}>
                {formatChange(weekNewCustomers.percentageChange)}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: "50%" }]}>
              <Text style={styles.tableCell}>Receita Semanal</Text>
            </View>
            <View style={[styles.tableCol, { width: "30%" }]}>
              <Text style={styles.tableCell}>
                {formatCurrency(weekRevenue.weekRevenue)}
              </Text>
            </View>
            <View style={[styles.tableCol, { width: "20%" }]}>
              <Text style={styles.tableCell}>
                {formatChange(weekRevenue.percentageChange)}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: "50%" }]}>
              <Text style={styles.tableCell}>Receita Mensal</Text>
            </View>
            <View style={[styles.tableCol, { width: "30%" }]}>
              <Text style={styles.tableCell}>
                {formatCurrency(monthRevenue.weekRevenue)}
              </Text>
            </View>
            <View style={[styles.tableCol, { width: "20%" }]}>
              <Text style={styles.tableCell}>
                {formatChange(monthRevenue.percentageChange)}
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages} - Relatório gerado em ${new Date().toLocaleDateString(
              "pt-BR"
            )} às ${new Date().toLocaleTimeString("pt-BR")}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
