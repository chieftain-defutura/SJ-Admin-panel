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
import { IMidLevelData, IUserData } from "../../../constants/types";

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

interface IPdfData {
  userData: IUserData | undefined;
  data: IMidLevelData;
}

const MidLevelPdf: React.FC<IPdfData> = ({ data, userData }) => {
  var converter = require("number-to-words");

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
            <Text style={styles.text}>Sprinkle Nadar Private Ltd</Text>
            <Text style={styles.text}></Text>
            <Text style={styles.text}>Kovilpatti 628502</Text>
            <Text style={styles.text}>Tamilnadu</Text>
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

            <Text style={styles.text}>{userData?.name}</Text>
            <Text style={styles.text}>{userData?.email}</Text>
            <Text style={styles.text}>{userData?.phoneNo}</Text>

            {/* <Text style={styles.text}>
            No 6 A-block sterling little flower apartment,
          </Text>
          <Text style={styles.text}>Guduvanchery</Text>
          <Text style={styles.text}>
            NANDIVARAM GUDUVANCHERY, TAMIL NADU,
          </Text>
          <Text style={styles.text}>603202</Text>
          <Text style={styles.text}>IN</Text>
          <Text style={styles.head}>State/UT Code: 33</Text> */}
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
              <Text style={styles.text}> JRRPS7087A</Text>
            </View>
            <View style={styles.flexContent}>
              <Text style={styles.head}>GST Registration No: </Text>
              <Text style={styles.text}> 06AALCA0171E1Z3</Text>
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
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              width: "245px",
            }}
          >
            <Text style={styles.head}>Shipping Address :</Text>
            {userData?.address.map((f, i) => (
              <>
                {f.isSelected === true && (
                  <>
                    <Text style={styles.text}>{f.name}</Text>
                    <Text style={styles.text} key={i}>
                      {f.addressOne}
                    </Text>
                    <Text style={styles.text}>{f.city}</Text>
                    <Text style={styles.text}>{f.state}</Text>
                    <Text style={styles.text}>{f.pinCode}</Text>
                    <Text style={styles.text}>{f.country}</Text>
                    <Text style={styles.text}>{f.phoneNo}</Text>
                    <View style={styles.flexContent}>
                      <Text style={styles.head}>Place of supply: </Text>
                      <Text style={styles.text}> TAMIL NADU</Text>
                    </View>
                    <View style={styles.flexContent}>
                      <Text style={styles.head}>Place of delivery: </Text>
                      <Text style={styles.text}> {f.country}</Text>
                    </View>
                  </>
                )}

                {/* <Text style={styles.head}>State/UT Code: 33</Text> */}
              </>
            ))}
          </View>
        </View>
        <View style={styles.table}>
          <View style={[styles.row, { backgroundColor: "#B4B4B3" }]}>
            <Text style={[styles.tableCell, styles.tableHead]}>SI.No</Text>
            <Text style={[styles.tableCell, styles.tableHead, { flex: 4 }]}>
              Product Name
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
            {/* {datas.map((row, rowIndex) => ( */}
            <View style={styles.row}>
              {/* {row.map((cell, cellIndex) => ( */}
              <Text style={[styles.tableCell]}>1</Text>

              <Text style={[styles.tableCell, { flex: 4 }]}>
                {data.productName}
              </Text>
              <Text style={[styles.tableCell]}>{data.price}</Text>
              <Text style={[styles.tableCell]}>
                {data.offerPrice ? "-" : ""}
              </Text>
              <Text style={[styles.tableCell]}>1</Text>
              <Text style={[styles.tableCell]}>0</Text>
              <Text style={[styles.tableCell]}>0</Text>
              <Text style={[styles.tableCell]}>0</Text>
              <Text style={[styles.tableCell]}>0</Text>
              <Text style={[styles.tableCell]}>RS:{data.price}</Text>

              {/* ))} */}
            </View>
            {/* ))} */}
          </View>
        </View>
        <View style={styles.totalContent}>
          <Text style={styles.totalText}>TOTAL: </Text>
          {/* {datas.map((f, i) => (
          
          ))} */}
          <View style={styles.totalHead}>
            <Text style={[styles.tableHead, { fontSize: 11 }]}>
              {data.price}
            </Text>
            <Text style={[styles.tableHead, { fontSize: 11 }]}>
              {/* {f.price} */}
            </Text>
          </View>
        </View>
        <View style={styles.amountHead}>
          <Text style={styles.totalText}>Amount in Words: </Text>
          <Text style={styles.totalText}>{converter.toWords(data.price)}</Text>
        </View>
        <View style={styles.amountHead}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                padding: 6,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // borderBottom: "0.5px solid #000",
                // borderRight: "0.5px solid #000",
              }}
            >
              <Text style={styles.head}>Transaction Id: </Text>
              <Text style={styles.text}> {data.id}</Text>
            </View>
            <View>
              <Text style={styles.totalText}>Sprinkle Nadar Private Ltd:</Text>
              <Text style={styles.totalText}>Authorized Signatory</Text>
            </View>
          </View>
        </View>
        <Text style={[styles.text, { marginTop: 2 }]}>
          Whether tax is payable under reverse charge - No
        </Text>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              padding: 6,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.head}>Date </Text>
            <Text style={styles.text}>
              {data.createdAt.toDate().toISOString().split("T")[0]}
            </Text>
          </View>

          <View>
            {/* <View
            style={{
              padding: 6,
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text style={styles.head}>Invoice Value: </Text>
            <Text style={styles.text}> RS:{data.price}</Text>
          </View> */}

            <View
              style={{
                padding: 6,
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text style={styles.head}>Mode of Payment: </Text>
              <Text style={styles.text}>Online</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
    // </PDFViewer>
  );
};

export default MidLevelPdf;
