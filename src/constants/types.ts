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

export interface IPost {
  color: string;
  description: string;
  gender: string;
  giftVideo: string;
  id: string;
  offerPrice: string;
  orderStatus: {
    delivery: {
      status: boolean;
      description: string;
      createdAt: null;
    };
    manufacturing: {
      createdAt: null;
      description: string;
      status: boolean;
    };
    orderplaced: {
      createdAt: null;
      description: string;
      status: boolean;
    };
    readyToShip: {
      description: string;
      status: boolean;
      createdAt: null;
    };
    shipping: {
      createdAt: null;
      description: string;
      status: boolean;
    };
  };
  price: string;
  productCaption: string;
  productName: string;
  quantity: string;
  sizes: {
    country: string;
    sizeVarient: {
      measurement: number;
      size: string;
      quantity: number;
    }[];
  };
  status: string;
  style: string;
  textAndImage: {
    position: string;
    title: string;
    image: string;
  };
  type: string;
  userId: string;
}

export interface IMidLevelData {
  approved: boolean;
  color: string;
  description: string;
  gender: string;
  id: string;
  offerPrice: string;
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
  price: string;
  productId: string;
  productName: string;
  quantity: string;
  sizes: {
    country: string;
    sizeVarient: {
      measurement: string;
      size: string;
      quantity: string;
    };
  };
  style: string;
  textAndImage: {
    position: string;
    title: string;
    designs: {
      hashtag: string;
      image: string;
    };
  };
  type: string;
  userId: string;
}

export interface IAccessoryLevel {
  description: string;
  id: string;
  offerPrice: string;
  orderStatus: {
    delivery: {
      status: boolean;
      description: string;
      createdAt: null;
    };
    manufacturing: {
      status: boolean;
      createdAt: null;
      description: string;
    };
    orderplaced: {
      status: boolean;
      description: string;
      createdAt: null;
    };
    readyToShip: {
      createdAt: null;
      description: string;
      status: boolean;
    };
    shipping: {
      description: string;
      createdAt: null;
      status: boolean;
    };
  };
  price: string;
  productName: string;
  status: string;
  type: string;
  userId: string;
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

export enum IOrdersCategory {
  orderPlaced = "Placed orders",
  manufacturing = "Manufacturing",
  readyToShip = "Ready to ship",
  shipping = "Shipping",
  delivery = "Delivery",
}
