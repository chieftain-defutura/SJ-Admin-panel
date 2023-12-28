import { Timestamp } from "firebase/firestore";

export interface IpostData {
  id: string;
  createdAt: Timestamp;

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

export interface IAdminData {
  id: string;
  userName: string;
  password: string;
  role: string[];
  actions: string;
  email: string;
  action: string;
}
export interface IProductdata {
  id: string;
  leftSide: boolean;
  frontSide: boolean;
  description: string;
  offerPrice: string;
  netWeight: string;
  sizes: {
    sizeVarients: {
      quantity: number;
      size: string;
      measurement: number;
      show: boolean;
    }[];
    country: string;
    gender: string;
  }[];
  backSide: boolean;
  productName: string;
  showTextDesign: boolean;
  colors: {
    color: string;
    colorName: string;
  }[];
  normalPrice: string;
  gender: string;
  styles: string;
  productImage: string;
  productVideo: string;
  type: string;
  showDesign: boolean;
  rightSide: boolean;
}

export interface IUserData {
  profile: string;
  email: string;
  confirmDetails: boolean;
  avatar: {
    gender: string;
    skinTone: string;
  };
  name: string;
  address: {
    saveAddressAs: string;
    addressOne: string;
    floor: string;
    addressTwo: string;
    phoneNo: string;
    country: string;
    isSelected: boolean;
    state: string;
    city: string;
    name: string;
    pinCode: string;
  }[];
  currency: {
    abrive: string;
    symbol: string;
    currency: string;
  };
  language: string;
  termsAndConditions: boolean;
  rate: number;
  phoneNo: string;
}

export interface IPremiumData {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  description: string;
  gender: string;
  offerPrice: string;
  giftMessage: {
    from: string;
    giftMessage: string;
  };
  productVideo: string;
  price: string;
  sizes: {
    country: string;
    sizeVarient: {
      size: string;
      quantity: number;
      measurement: number;
    };
  };
  paymentStatus: string;
  type: string;
  orderStatus: {
    delivery: {
      createdAt: null;
      description: string;
      status: boolean;
    };
    manufacturing: {
      createdAt: null;
      description: string;
      status: boolean;
    };
    orderplaced: {
      description: string;
      status: boolean;
      createdAt: null;
    };
    readyToShip: {
      createdAt: null;
      status: boolean;
      description: string;
    };
    shipping: {
      createdAt: null;
      status: boolean;
      description: string;
    };
  };
  userId: string;
  id: string;
  productImage: string;
  productName: string;
  styles: string;
}

export interface IPost {
  description: string;
  createdAt: Timestamp;
  gender: string;
  offerPrice: string;
  giftMessage: {
    from: string;
    giftMessage: string;
  };
  productVideo: string;
  price: string;
  sizes: {
    country: string;
    sizeVarient: {
      size: string;
      quantity: number;
      measurement: number;
    };
  };
  status: string;
  type: string;
  orderStatus: {
    delivery: {
      createdAt: null;
      description: string;
      status: boolean;
    };
    manufacturing: {
      createdAt: null;
      description: string;
      status: boolean;
    };
    orderplaced: {
      description: string;
      status: boolean;
      createdAt: null;
    };
    readyToShip: {
      createdAt: null;
      status: boolean;
      description: string;
    };
    shipping: {
      createdAt: null;
      status: boolean;
      description: string;
    };
  };
  userId: string;
  id: string;
  productImage: string;
  productName: string;
  styles: string;
}
export interface ISettingdata {
  showAccessoryPage: boolean;
  premiumComingSoonText: string;
}

export interface IMidLevelData {
  id: string;
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
  giftMessage: {
    from: string;
    giftMessage: string;
  };
  color: string;
  description: string;
  sizes: {
    country: string;
    sizeVarient: {
      measurement: number;
      quantity: string;
      size: string;
    };
  };
  gender: string;
  createdAt: Timestamp;

  paymentStatus: string;
  orderStatus: {
    delivery: {
      createdAt: null;
      description: string;
      status: boolean;
    };
    manufacturing: {
      createdAt: null;
      description: string;
      status: boolean;
    };
    orderplaced: {
      description: string;
      status: boolean;
      createdAt: null;
    };
    readyToShip: {
      createdAt: null;
      status: boolean;
      description: string;
    };
    shipping: {
      createdAt: null;
      status: boolean;
      description: string;
    };
  };
  userId: string;
  productName: string;
  offerPrice: string;
  productImage: string;
  totalamount: string;
  price: string;
  productId: string;
  textAndImage: {
    title: string;
    rate: number;
    position: string;
    designs: {
      hashtag: string;
      image: string;
      originalImage: string;
    };
  };
  type: string;
  style: string;
}
export interface IAccessoryLevel {
  id: string;
  createdAt: Timestamp;
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
  giftMessage: {
    from: string;
    giftMessage: string;
  };
  color: string;
  description: string;
  sizes: {
    country: string;
    sizeVarient: {
      measurement: number;
      quantity: string;
      size: string;
    };
  };
  gender: string;

  paymentStatus: string;
  orderStatus: {
    delivery: {
      createdAt: null;
      description: string;
      status: boolean;
    };
    manufacturing: {
      createdAt: null;
      description: string;
      status: boolean;
    };
    orderplaced: {
      description: string;
      status: boolean;
      createdAt: null;
    };
    readyToShip: {
      createdAt: null;
      status: boolean;
      description: string;
    };
    shipping: {
      createdAt: null;
      status: boolean;
      description: string;
    };
  };
  userId: string;
  productName: string;
  offerPrice: string;
  productImage: string;
  totalamount: string;
  price: string;
  productId: string;
  textAndImage: {
    title: string;
    rate: number;
    position: string;
    designs: {
      hashtag: string;
      image: string;
      originalImage: string;
    };
  };
  type: string;
  style: string;
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
      createdAt: null;
      description: string;
      status: boolean;
    };
    manufacturing: {
      createdAt: null;
      description: string;
      status: boolean;
    };
    orderplaced: {
      description: string;
      status: boolean;
      createdAt: null;
    };
    readyToShip: {
      createdAt: null;
      status: boolean;
      description: string;
    };
    shipping: {
      createdAt: null;
      status: boolean;
      description: string;
    };
  };
  userId: string;
  id: string;
  productImage: string;
  productName: string;

  styles: string;
  type: string;
}

export interface IReturnOrdersData {
  createdAt: Timestamp;
  issues: string;
  Image: string;
  refundStatus: {
    orderReturned: {
      discription: string;
      status: boolean;
      createdAt: Timestamp;
    };
    paymenyCompleted: {
      createdAt: null;
      status: boolean;
      discription: string;
    };
    paymentInitiated: {
      createdAt: null;
      status: boolean;
      discription: string;
    };
  };
  description: string;
  status: string;
  updatedAt: Timestamp;
  orderId: string;
  id: string;
}
export interface ISettingdata {
  showAccessoryPage: boolean;
  premiumComingSoonText: string;
}
export enum IProductCategory {
  MID = "MIDLEVEL-PRODUCTS",
  PREMIUM = "PREMIUM-PRODUCTS",
  ACCESSORY = "ACCESSORY-PRODUCTS",
  DESIGN_IMAGE = "design-images",
  TEXT_IMAGE = "text-images",
}

export enum IOrdersCategory {
  orderPlaced = "Placed orders",
  manufacturing = "Manufacturing",
  readyToShip = "Ready to ship",
  shipping = "Shipping",
  delivery = "Delivery",
}
