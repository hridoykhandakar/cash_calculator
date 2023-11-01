import { Page, Text, View, Document } from "@react-pdf/renderer";

const Pdf = () => {
  return (
    <Document>
      <Page size="A4">
        <View>
          <Text>Section #1</Text>
        </View>
        <View>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};
export default Pdf;
