import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import Logo from "../../../assets/logo/logo.png";
import GilroyBold from "../../../assets/fonts/Gilroy-Bold.ttf";
import GilroyMedium from "../../../assets/fonts/Gilroy-Medium.ttf";

Font.register({
  family: "GilroyBold",
  src: GilroyBold,
});

Font.register({
  family: "GilroyMedium",
  src: GilroyMedium,
});

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 42,
    paddingVertical: 8,
  },
  headContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 200,
  },
  taxText: {
    fontSize: 10,
    fontFamily: "GilroyBold",
  },
  textAlignRight: {
    display: "flex",
    alignItems: "flex-end",
  },
  originalText: {
    fontSize: 10,
    fontFamily: "GilroyMedium",
  },
  addressFlexWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 42,
  },
  head: {
    fontSize: 10,
    fontFamily: "GilroyBold",
  },
  text: {
    fontSize: 10,
    fontFamily: "GilroyMedium",
  },
  shippingAddressFlexWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 22,
  },
  flexContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  flexContents: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  table: {
    width: "100%",
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: "#000",
  },
  row: {
    flexDirection: "row",
  },

  tableCell: {
    flex: 1,
    fontSize: 10,
    fontFamily: "GilroyMedium",
    borderWidth: 0.5,
    borderColor: "#000",
    paddingVertical: 2,
    paddingHorizontal: 4,
    textAlign: "left",
  },
  tableHead: {
    fontSize: 10,
    fontFamily: "GilroyBold",
    textAlign: "left",
  },
  totalText: {
    fontSize: 10,
    fontFamily: "GilroyBold",
  },
  totalContent: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    borderLeft: "0.7px solid #000",
    borderRight: "0.7px solid #000",
    borderBottom: "0.7px solid #000",
    padding: 5,
  },
  totalHead: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  amountHead: {
    borderLeft: "0.7px solid #000",
    borderRight: "0.7px solid #000",
    borderBottom: "0.7px solid #000",
    padding: 5,
  },
  para: {
    maxWidth: 450,
    margin: "auto",
    textAlign: "center",
  },
  border: {
    border: "0.5px solid #000",
    marginTop: 22,
    display: "flex",
    flexDirection: "row",
  },
});

const tableData = [
  [
    "1",
    "boAt Stone 620 Bluetooth Speaker with 12W RMS Stereo Sound, 10HRS Playtime, TWS Feature, IPX4, Muli-Compatibility Mode(Black) | B09GFRV7L5 (B09GFRV7L5)",
    "1,694.07",
    "0.00",
    "1",
    "1,694.07",
    "18%",
    "IGST",
    "304.93",
    "1,999,0",
  ],
  [
    "",
    "Shipping Charges",
    "1,127.12",
    "-1.27.12",
    "",
    "0.00",
    "18%",
    "IGST",
    "0.00",
    "0.00",
  ],
];

const AccessoryPdf: React.FC = () => {
  return (
    // <PDFViewer style={{ width: "100vw", height: "100vh" }}>
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={styles.headContent}>
          <Image source={Logo} style={styles.logo} />
          <View>
            <Text style={styles.taxText}>
              Tax Invoice/Bill of Supply/Cash Memo
            </Text>
            <View style={styles.textAlignRight}>
              <Text style={styles.originalText}>(Original for Recipient)</Text>
            </View>
          </View>
        </View>

        <View style={styles.addressFlexWrapper}>
          <View style={{ width: "245px" }}>
            <Text style={styles.head}>Sold By :</Text>
            <Text style={styles.text}>Appario Retail Private Ltd</Text>
            <Text style={styles.text}>
              * Kh No 18//21, 19//25, 34//5, 6, 7/1 min, 14/2/2 min, 15/1 min,
              27, 35//1, 7, 8, 9/1, 9/2, 10/1, 10/2, 11 min, 12, 13, 14, Village
              - Jamalpur
            </Text>
            <Text style={styles.text}>Gurgaon, Haryana, 122503</Text>
            <Text style={styles.text}>IN</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              width: "245px",
            }}
          >
            <Text style={styles.head}>Billing Address :</Text>
            <Text style={styles.text}>Arun</Text>
            <Text style={styles.text}>
              No 6 A-block sterling little flower apartment,
            </Text>
            <Text style={styles.text}>Guduvanchery</Text>
            <Text style={styles.text}>
              NANDIVARAM GUDUVANCHERY, TAMIL NADU,
            </Text>
            <Text style={styles.text}>603202</Text>
            <Text style={styles.text}>IN</Text>
            <Text style={styles.head}>State/UT Code: 33</Text>
          </View>
        </View>

        <View style={styles.shippingAddressFlexWrapper}>
          <View
            style={{
              width: "245px",
              display: "flex",
              alignSelf: "flex-start",
            }}
          >
            <View style={styles.flexContent}>
              <Text style={styles.head}>PAN No:</Text>
              <Text style={styles.text}> AALCA0171E</Text>
            </View>
            <View style={styles.flexContent}>
              <Text style={styles.head}>GST Registration No: </Text>
              <Text style={styles.text}> 06AALCA0171E1Z3</Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              width: "245px",
            }}
          >
            <Text style={styles.head}>Shipping Address :</Text>
            <Text style={styles.text}>Arun</Text>
            <Text style={styles.text}>
              No 6 A-block sterling little flower apartment,
            </Text>
            <Text style={styles.text}>Guduvanchery</Text>
            <Text style={styles.text}>
              NANDIVARAM GUDUVANCHERY, TAMIL NADU,
            </Text>
            <Text style={styles.text}>603202</Text>
            <Text style={styles.text}>IN</Text>
            <Text style={styles.head}>State/UT Code: 33</Text>
            <View style={styles.flexContent}>
              <Text style={styles.head}>Place of supply: </Text>
              <Text style={styles.text}> TAMIL NADU</Text>
            </View>
            <View style={styles.flexContent}>
              <Text style={styles.head}>Place of delivery: </Text>
              <Text style={styles.text}> TAMIL NADU</Text>
            </View>
            <View style={styles.flexContents}>
              <Text style={styles.head}>Invoice Number: </Text>
              <Text style={styles.text}> DEL4- 1831037</Text>
            </View>
            <View style={styles.flexContent}>
              <Text style={styles.head}>Invoice Details: </Text>
              <Text style={styles.text}> HR-DEL4- 1034-2324</Text>
            </View>
            <View style={styles.flexContent}>
              <Text style={styles.head}>Invoice Date: </Text>

              <Text style={styles.text}> 24.08.2023</Text>
            </View>
          </View>
        </View>
        <View style={styles.table}>
          <View style={[styles.row, { backgroundColor: "#B4B4B3" }]}>
            <Text style={[styles.tableCell, styles.tableHead]}>SI.No</Text>
            <Text style={[styles.tableCell, styles.tableHead, { flex: 4 }]}>
              Discription
            </Text>
            <Text style={[styles.tableCell, styles.tableHead]}>Unit Price</Text>
            <Text style={[styles.tableCell, styles.tableHead]}>Discount</Text>
            <Text style={[styles.tableCell, styles.tableHead]}>Qty</Text>
            <Text style={[styles.tableCell, styles.tableHead]}>Net Amount</Text>
            <Text style={[styles.tableCell, styles.tableHead]}>Tax Rate</Text>
            <Text style={[styles.tableCell, styles.tableHead]}>Tax Type</Text>
            <Text style={[styles.tableCell, styles.tableHead]}>Tax Amount</Text>
            <Text style={[styles.tableCell, styles.tableHead]}>
              Total Amount
            </Text>
          </View>
          <View>
            {tableData.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cell, cellIndex) => (
                  <Text
                    key={cellIndex}
                    style={[
                      styles.tableCell,
                      { flex: cellIndex === 1 ? 4 : 1 },
                    ]}
                  >
                    {cell}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </View>
        <View style={styles.totalContent}>
          <Text style={styles.totalText}>TOTAL: </Text>
          <View style={styles.totalHead}>
            <Text style={[styles.tableHead, { fontSize: 11 }]}>304.93</Text>
            <Text style={[styles.tableHead, { fontSize: 11 }]}>1,999.00</Text>
          </View>
        </View>
        <View style={styles.amountHead}>
          <Text style={styles.totalText}>Amount in Words: </Text>
          <Text style={styles.totalText}>
            One Thousand Nine Hundred Ninety-nine only
          </Text>
        </View>
        <View style={styles.amountHead}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Text style={styles.totalText}>
              For Appario Retail Private Ltd:
            </Text>
            <Text style={styles.totalText}>Authorized Signatory</Text>
          </View>
        </View>
        <Text style={[styles.text, { marginTop: 2 }]}>
          Whether tax is payable under reverse charge - No
        </Text>
        <View style={styles.border}>
          <View style={{ width: 150 }}>
            <View
              style={{
                padding: 6,
                borderBottom: "0.5px solid #000",
                borderRight: "0.5px solid #000",
              }}
            >
              <Text style={styles.head}>Payment Transaction ID: </Text>
              <Text style={styles.text}> 11106AALCA0171E1Z3</Text>
            </View>
            <View style={{ padding: 6, borderRight: "0.5px solid #000" }}>
              <Text style={styles.head}>Payment Transaction ID: </Text>
              <Text style={styles.text}> BS106AALCA0171E1Z3</Text>
            </View>
          </View>
          <View style={{ width: 150 }}>
            <View
              style={{
                padding: 6,
                borderBottom: "0.5px solid #000",
                borderRight: "0.5px solid #000",
              }}
            >
              <View style={styles.flexContent}>
                <Text style={styles.head}>Date & Time:</Text>
                <Text style={styles.text}> 24/08/2023</Text>
              </View>
              <Text style={styles.text}> 00:39:27 hrs</Text>
            </View>
            <View style={{ padding: 6, borderRight: "0.5px solid #000" }}>
              <View style={styles.flexContent}>
                <Text style={styles.head}>Date & Time:</Text>
                <Text style={styles.text}> 24/08/2023</Text>
              </View>
              <Text style={styles.text}> 00:39:27 hrs</Text>
            </View>
          </View>
          <View
            style={{
              padding: 6,
              borderRight: "0.5px solid #000",
              paddingTop: 23,
              width: 80,
            }}
          >
            <Text style={styles.head}>Invoice Value: </Text>
            <Text style={styles.text}>1,999.00</Text>
          </View>
          <View style={{ width: 130 }}>
            <View
              style={{
                padding: 6,
                borderBottom: "0.5px solid #000",
              }}
            >
              <Text style={styles.head}>Mode of Payment: </Text>
              <Text style={styles.text}>GiftCard</Text>
            </View>
            <View
              style={{
                padding: 6,
              }}
            >
              <Text style={styles.head}>Mode of Payment: </Text>
              <Text style={styles.text}>GiftCard</Text>
            </View>
          </View>
        </View>
        <View style={styles.para}>
          <Text style={[styles.text, { color: "#9E9FA5" }]}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit illo
            corrupti minus ipsam et, rerum consequatur consequuntur ad delectus.
            Libero error commodi eum voluptas laborum molestiae ut velit fuga
            odio.
          </Text>
        </View>
      </Page>
    </Document>
    // </PDFViewer>
  );
};

export default AccessoryPdf;
