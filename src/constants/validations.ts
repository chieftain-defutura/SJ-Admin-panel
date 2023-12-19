import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Product name is required"),
  normalPrice: Yup.string().required("Price is required"),
});
