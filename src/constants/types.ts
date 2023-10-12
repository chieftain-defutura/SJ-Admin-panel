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
const a = {
  textAndImage: {
    image:
      "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Freact-native-expo-project-45030dfd-a1a4-4930-b428-fcc1d700ed9c/ImagePicker/f2e74e55-4f13-4f89-a4a3-6a9f48a0b751.jpeg",
    position: "Front",
    title: "image",
  },
  sizes: {
    country: "India",
    sizeVarient: {
      unit: "cm",
      size: "S",
      measurement: 28,
    },
  },
  giftVideo: null,
  price: "400",
  style: "Round Neck",
  status: "pending",
};
