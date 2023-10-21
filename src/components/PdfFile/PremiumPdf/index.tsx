import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { IPremiumData } from "../../../constants/types";

interface PremiumPdfProps {
  data: IPremiumData;
}

const PremiumPdf: React.FC<PremiumPdfProps> = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* <Text>{data.description}</Text> */}
          {/* <Text>{data.gender}</Text> */}
          <Text>{data.status}</Text>
          <Text>{data.offerPrice}</Text>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default PremiumPdf;
