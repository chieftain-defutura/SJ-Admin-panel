export interface IpostData {
  id: string;
  productCaption: string;
  normalPrice: string;
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
  gender: string;
  offerPrice: string;
  productImage: string;
  sizes: {
    sizeVarients: {
      measurement: number;
      quantity: number;
      show: boolean;
      size: string;
    }[];
    country: string;
    gender: string;
  }[];
  description: string;
  normalPrice: string;
  styles: string;
  productName: string;
  colors?: string[];
}

export interface IUserData {
  address: null;
  avatar: string;
  email: string;
  id: string;
  name: string;
  phoneNo: string;
  profile: string;
}

export interface IPremiumData {
  description: string;
  gender: string;
  offerPrice: string;
  productVideo: string;
  price: string;
  sizes: {
    country: string;
    sizeVarient: {
      size: string;
      measurement: number;
    };
    status: string;
    type: string;
  };
  orderStatus: {
    delivery: {
      status: boolean;
      createdAt: null;
      description: string;
    };
    manufacturing: {
      createdAt: null;
      status: boolean;
      description: string;
    };
    orderplaced: {
      status: boolean;
      createdAt: null;
      description: string;
    };
    readyToShip: {
      status: boolean;
      description: string;
      createdAt: null;
    };
    shipping: {
      createdAt: null;
      description: string;
      status: boolean;
    };
  };
  userId: string;
  id: string;
  productImage: string;
  productName: string;

  styles: string;
  type: string;
}

export interface IFetchData extends IUserData {
  description: string;
  gender: string;
  offerPrice: string;
  productVideo: string;
  price: string;
  sizes: {
    country: string;
    sizeVarient: {
      size: string;
      measurement: number;
    };
    status: string;
    type: string;
  };
  orderStatus: {
    delivery: {
      status: boolean;
      createdAt: null;
      description: string;
    };
    manufacturing: {
      createdAt: null;
      status: boolean;
      description: string;
    };
    orderplaced: {
      status: boolean;
      createdAt: null;
      description: string;
    };
    readyToShip: {
      status: boolean;
      description: string;
      createdAt: null;
    };
    shipping: {
      createdAt: null;
      description: string;
      status: boolean;
    };
  };
  userId: string;
  id: string;
  productImage: string;
  productName: string;

  styles: string;
  type: string;
}
export enum IProductCategory {
  MID = "MIDLEVEL-PRODUCTS",
  PREMIUM = "PREMIUM-PRODUCTS",
  ACCESSORY = "ACCESSORY-PRODUCTS",
  DESIGN_IMAGE = "design-images",
  TEXT_IMAGE = "text-images",
}
