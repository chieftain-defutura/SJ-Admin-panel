import { collection, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { ORDERS_COLLECTION_NAME } from "../constants/firebaseCollection";

const Premium = collection(db, ORDERS_COLLECTION_NAME);

export const orderPlacedQuery = query(
  Premium,
  where("type", "==", "Premium-Level"),
  where("paymentStatus", "==", "SUCCESS"),
  where("orderStatus.orderPlaced.status", "==", true),
  where("orderStatus.manufacturing.status", "==", false)
);

export const manufacturingQuery = query(
  Premium,
  where("type", "==", "Premium-Level"),
  where("paymentStatus", "==", "SUCCESS"),

  where("orderStatus.manufacturing.status", "==", true),
  where("orderStatus.readyToShip.status", "==", false)
);

export const readyToShipQuery = query(
  Premium,
  where("type", "==", "Premium-Level"),
  where("paymentStatus", "==", "SUCCESS"),

  where("orderStatus.readyToShip.status", "==", true),
  where("orderStatus.shipping.status", "==", false)
);

export const shippingQuery = query(
  Premium,
  where("type", "==", "Premium-Level"),
  where("paymentStatus", "==", "SUCCESS"),

  where("orderStatus.shipping.status", "==", true),
  where("orderStatus.delivery.status", "==", false)
);
export const deliveryQuery = query(
  Premium,
  where("type", "==", "Premium-Level"),
  where("paymentStatus", "==", "SUCCESS"),

  where("orderStatus.delivery.status", "==", true)
);

export const orderPlacedQueryMid = query(
  Premium,
  where("type", "==", "MidLevel"),
  where("paymentStatus", "==", "SUCCESS"),

  where("orderStatus.orderPlaced.status", "==", true),
  where("orderStatus.manufacturing.status", "==", false)
);

export const manufacturingQueryMid = query(
  Premium,
  where("type", "==", "MidLevel"),
  where("paymentStatus", "==", "SUCCESS"),

  where("orderStatus.manufacturing.status", "==", true),
  where("orderStatus.readyToShip.status", "==", false)
);

export const readyToShipQueryMid = query(
  Premium,
  where("type", "==", "MidLevel"),
  where("paymentStatus", "==", "SUCCESS"),

  where("orderStatus.readyToShip.status", "==", true),
  where("orderStatus.shipping.status", "==", false)
);

export const shippingQueryMid = query(
  Premium,
  where("type", "==", "MidLevel"),
  where("paymentStatus", "==", "SUCCESS"),

  where("orderStatus.shipping.status", "==", true),
  where("orderStatus.delivery.status", "==", false)
);
export const deliveryQueryMid = query(
  Premium,
  where("type", "==", "MidLevel"),
  where("paymentStatus", "==", "SUCCESS"),

  where("orderStatus.delivery.status", "==", true)
);

export const orderPlacedQueryPost = query(
  Premium,
  where("type", "==", "PostLevel"),
  where("paymentStatus", "==", "SUCCESS"),

  where("orderStatus.orderPlaced.status", "==", true),
  where("orderStatus.manufacturing.status", "==", false)
);

export const manufacturingQueryPost = query(
  Premium,
  where("type", "==", "PostLevel"),
  where("paymentStatus", "==", "SUCCESS"),

  where("orderStatus.manufacturing.status", "==", true),
  where("orderStatus.readyToShip.status", "==", false)
);

export const readyToShipQueryPost = query(
  Premium,
  where("type", "==", "PostLevel"),
  where("paymentStatus", "==", "SUCCESS"),

  where("orderStatus.readyToShip.status", "==", true),
  where("orderStatus.shipping.status", "==", false)
);

export const shippingQueryPost = query(
  Premium,
  where("type", "==", "PostLevel"),
  where("paymentStatus", "==", "SUCCESS"),

  where("orderStatus.shipping.status", "==", true),
  where("orderStatus.delivery.status", "==", false)
);
export const deliveryQueryPost = query(
  Premium,
  where("type", "==", "PostLevel"),
  where("paymentStatus", "==", "SUCCESS"),

  where("orderStatus.delivery.status", "==", true)
);

export const orderPlacedQueryAccessory = query(
  Premium,
  where("type", "==", "Accessory-Level"),
  where("paymentStatus", "==", "SUCCESS"),

  where("orderStatus.orderPlaced.status", "==", true),
  where("orderStatus.manufacturing.status", "==", false)
);

export const manufacturingQueryAccessory = query(
  Premium,
  where("type", "==", "Accessory-Level"),
  where("paymentStatus", "==", "SUCCESS"),

  where("orderStatus.manufacturing.status", "==", true),
  where("orderStatus.readyToShip.status", "==", false)
);

export const readyToShipQueryAccessory = query(
  Premium,
  where("type", "==", "Accessory-Level"),
  where("paymentStatus", "==", "SUCCESS"),

  where("orderStatus.readyToShip.status", "==", true),
  where("orderStatus.shipping.status", "==", false)
);

export const shippingQueryAccessory = query(
  Premium,
  where("type", "==", "Accessory-Level"),
  where("paymentStatus", "==", "SUCCESS"),

  where("orderStatus.shipping.status", "==", true),
  where("orderStatus.delivery.status", "==", false)
);
export const deliveryQueryAccessory = query(
  Premium,
  where("type", "==", "Accessory-Level"),
  where("paymentStatus", "==", "SUCCESS"),

  where("orderStatus.delivery.status", "==", true)
);
