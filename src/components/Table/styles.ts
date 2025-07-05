import { styled } from "@edna-ui/react";

export class Table {
  static Container = styled("div", {
    width: "100%",
    overflow: "auto",
    borderRadius: "12px",
    border: "1px solid #e8e1cc",
    backgroundColor: "#fdf6e7",
  });

  static Root = styled("table", {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
    color: "#333",
  });

  static Header = styled("thead", {
    backgroundColor: "#f9f4e4",
    "& tr": {
      borderBottom: "1px solid #e8e1cc",
    },
  });

  static Body = styled("tbody", {
    "& tr:last-child": {
      borderBottom: "none",
    },
  });

  static Footer = styled("tfoot", {
    backgroundColor: "#f3f1e7",
    fontWeight: 500,
    borderTop: "1px solid #e8e1cc",
  });

  static Row = styled("tr", {
    borderBottom: "1px solid #e8e1cc",
    transition: "background-color 0.2s",
    verticalAlign: "middle",
  });

  static Head = styled("th", {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: 700,
    color: "#8b856e",
    textTransform: "uppercase",
  });

  static Cell = styled("td", {
    padding: "16px",
    verticalAlign: "middle",
    height: "100%",
    fontSize: "14px",
    color: "#474434",
  });

  static Caption = styled("caption", {
    marginTop: "16px",
    fontSize: "12px",
    color: "#888",
  });

  static DetailsButton = styled("button", {
    all: "unset",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    padding: "$2",

    border: "1px solid transparent",
    borderRadius: "$md",

    background: "$base500",

    "$:hover": {
      border: "1px solid $base400",
      cursor: "pointer",
    },
  });
}
