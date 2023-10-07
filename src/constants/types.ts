export interface IpostData {
  id: string;
  color: string;
  description: string;
  fontStyle: string;
  productName: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  productImage: string;
  material: string;
  price: string;
  royalties: string;
  giftVidio: string;
  Style: string;
  fontColor: string;
  username: string;
  hashTag: string;
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
  size: string[];
  status: string;
}

export interface IProductdata {
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
