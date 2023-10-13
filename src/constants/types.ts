export interface IpostData {
  id: string;
  productCaption: string;
  offerPrice: string;
  quantity: string;
  color: string;
  gender: string;
  detailedFeatures: {
    materials: string;
    cloth: string;
  }[];
  userId: string;
  productName: string;
  textAndImage: {
    image: string;
    position: string;
    title: string;
  };
  sizes: {
    country: string;
    sizeVarient: {
      unit: string;
      size: string;
      measurement: number;
    };
  };
  giftVideo: null;
  price: string;
  style: string;
  status: string;
  type: string;
}

export interface IProductdata {
  id: string;
  country: string;
  offerPrice: string;
  productImage: string;
  sizes: {
    sizeVarients: {
      type: string;
      value: number;
    }[];
    country: string;
    gender: string;
  };
  detailedFutures: {
    materials: string;
    cloth: string;
  }[];
  normalPrice: string;
  styles: string;
  productName: string;
  colors: string[];
}
export enum IProductCategory {
  MID = "MIDLEVEL-PRODUCTS",
  PREMIUM = "PREMIUM-PRODUCTS",
  ACCESSORY = "ACCESSORY-PRODUCTS",
  DESIGN_IMAGE = "design-images",
  TEXT_IMAGE = "text-images",
}
