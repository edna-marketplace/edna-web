import jsPDF from "jspdf";

export interface StoreOrderDTO {
  orderId: string;
  customerName: string;
  clotheName: string;
  orderStatus: string;
  priceInCents: number;
  createdAt: string;
}

export function downloadOrdersReport(orders: StoreOrderDTO[]) {
  const doc = new jsPDF();

  const colors = {
    primary: [255, 246, 216], // Light yellow
    secondary: [52, 73, 94], // Dark gray
    success: [39, 174, 96], // Green
    danger: [231, 76, 60], // Red
    light: [236, 240, 241], // Light gray
    dark: [44, 62, 80], // Dark blue-gray
  };

  // Helper function to format price
  const formatPrice = (priceInCents: number): string => {
    return (priceInCents / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatRealPrice = (priceInCents: number): string => {
    return ((priceInCents * 0.86) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  // Helper function to get status display name
  const getStatusDisplayName = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      PENDING: "Pendente",
      AWAITING_WITHDRAWAL: "Aguardando Retirada",
      COMPLETED: "Concluído",
      CANCELED: "Cancelado",
    };
    return statusMap[status] || status;
  };

  // Header with background
  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.rect(0, 0, 210, 50, "F");

  // Title
  doc.setTextColor(79, 76, 66);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Relatório de Pedidos", 20, 25);
  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");
  doc.text("Edna Marketplace", 20, 35);

  // Date and summary
  const currentDate = new Date().toLocaleDateString("pt-BR");
  doc.setFontSize(10);
  doc.text(`Gerado em: ${currentDate}`, 20, 43);
  doc.text(`Total de pedidos: ${orders.length}`, 130, 43);

  // Reset text color
  doc.setTextColor(0, 0, 0);

  // Table configuration
  const tableStartY = 65;
  const tableX = 10;
  const colWidths = [25, 45, 40, 30, 25, 25]; // data, cliente, peça, status, valor
  const rowHeight = 12;
  const headerHeight = 15;

  // Calculate total revenue
  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.priceInCents,
    0
  );

  // Summary section
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
  doc.text(
    "A coluna 'Valor Real' representa o valor após o desconto da taxa de 14%",
    20,
    60
  );

  // Table header
  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  let currentX = tableX;

  // Draw header background
  doc.rect(
    tableX,
    tableStartY,
    colWidths.reduce((sum, width) => sum + width, 0),
    headerHeight,
    "F"
  );

  // Header text
  doc.setTextColor(79, 76, 66);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");

  const headers = [
    "Data",
    "Cliente",
    "Peça",
    "Status",
    "Valor Total",
    "Valor Real",
  ];
  headers.forEach((header, index) => {
    doc.text(header, currentX + 2, tableStartY + 10);
    currentX += colWidths[index];
  });

  // Table content
  doc.setFont("helvetica", "normal");
  let currentY = tableStartY + headerHeight;

  orders.forEach((order, index) => {
    // Check if we need a new page
    if (currentY > 270) {
      doc.addPage();
      currentY = 20;

      // Repeat header on new page
      doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      doc.rect(
        tableX,
        currentY,
        colWidths.reduce((sum, width) => sum + width, 0),
        headerHeight,
        "F"
      );

      doc.setTextColor(79, 76, 66);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");

      currentX = tableX;
      headers.forEach((header, index) => {
        doc.text(header, currentX + 2, currentY + 10);
        currentX += colWidths[index];
      });

      currentY += headerHeight;
      doc.setFont("helvetica", "normal");
    }

    // Alternate row colors
    if (index % 2 === 0) {
      doc.setFillColor(249, 249, 249);
      doc.rect(
        tableX,
        currentY,
        colWidths.reduce((sum, width) => sum + width, 0),
        rowHeight,
        "F"
      );
    }

    // Row borders
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.3);

    currentX = tableX;
    colWidths.forEach((width) => {
      doc.rect(currentX, currentY, width, rowHeight);
      currentX += width;
    });

    // Row data
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.setFontSize(8);

    currentX = tableX;
    const rowData = [
      formatDate(order.createdAt),
      order.customerName.length > 20
        ? order.customerName.substring(0, 20) + "..."
        : order.customerName,
      order.clotheName.length > 25
        ? order.clotheName.substring(0, 25) + "..."
        : order.clotheName,
      getStatusDisplayName(order.orderStatus),
      formatPrice(order.priceInCents),
      formatRealPrice(order.priceInCents),
    ];

    rowData.forEach((data, dataIndex) => {
      // Special styling for status
      if (dataIndex === 3) {
        switch (order.orderStatus) {
          case "COMPLETED":
            doc.setTextColor(
              colors.success[0],
              colors.success[1],
              colors.success[2]
            );
            break;
          case "CANCELED":
            doc.setTextColor(
              colors.danger[0],
              colors.danger[1],
              colors.danger[2]
            );
            break;
          case "PENDING":
            doc.setTextColor(220, 160, 0); // Yellow
            break;
          default:
            doc.setTextColor(
              colors.secondary[0],
              colors.secondary[1],
              colors.secondary[2]
            );
        }
      } else {
        doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      }

      // Right align for price column
      if (dataIndex === 4 || dataIndex === 5) {
        doc.text(data, currentX + colWidths[dataIndex] - 2, currentY + 8, {
          align: "right",
        });
      } else {
        doc.text(data, currentX + 2, currentY + 8);
      }

      currentX += colWidths[dataIndex];
    });

    currentY += rowHeight;
  });

  // Footer with statistics
  const completedOrders = orders.filter(
    (order) => order.orderStatus === "COMPLETED"
  ).length;
  const canceledOrders = orders.filter(
    (order) => order.orderStatus === "CANCELED"
  ).length;
  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "PENDING"
  ).length;

  // Add statistics at the bottom
  currentY += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
  doc.text("Estatísticas:", 20, currentY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Concluídos: ${completedOrders}`, 20, currentY + 8);
  doc.text(`Cancelados: ${canceledOrders}`, 60, currentY + 8);
  doc.text(`Pendentes: ${pendingOrders}`, 100, currentY + 8);
  doc.text(
    `Aguardando: ${
      orders.length - completedOrders - canceledOrders - pendingOrders
    }`,
    140,
    currentY + 8
  );

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text(
    "Relatório gerado automaticamente pelo sistema Edna Marketplace",
    20,
    285
  );
  doc.text(`Página 1 de ${doc.getNumberOfPages()}`, 170, 285);

  // Save the PDF
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  doc.save(`relatorio-pedidos-edna-${formattedDate}.pdf`);
}
