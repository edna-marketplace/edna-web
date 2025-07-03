import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 10,
    paddingTop: 35,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 30,
    backgroundColor: "#FFFFFF",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#1F2937",
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 25,
    color: "#6B7280",
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  metricCard: {
    width: "23%",
    padding: 15,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  metricTitle: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 3,
  },
  metricChange: {
    fontSize: 8,
    color: "#059669",
  },
  metricChangeNegative: {
    fontSize: 8,
    color: "#DC2626",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1F2937",
  },
  chartContainer: {
    marginBottom: 30,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  chartText: {
    fontSize: 12,
    color: "#6B7280",
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#F9FAFB",
    flexDirection: "row",
    fontWeight: "bold",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    padding: 8,
    fontSize: 9,
  },
  footer: {
    position: "absolute",
    bottom: 15,
    left: 50,
    right: 50,
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 8,
  },
  monthlyData: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  monthItem: {
    width: "16.66%",
    textAlign: "center",
    padding: 5,
  },
  monthName: {
    fontSize: 8,
    color: "#6B7280",
    marginBottom: 2,
  },
  monthValue: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1F2937",
  },
});
