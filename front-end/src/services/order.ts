import { del, get, post, ServicePrefix } from "./baseApiService";

export interface Order {
  id: string;
  userId: string;
  name: string;
  mobile: string;
  date: Date;
  cardNumber: string;
  expiryDate: Date;
  cvv: string;

  orderItems: {
    id: string;
    price: number;
    quantity: number;
  }[];
  total: number;
}

export const OrderService = {
  createOrder: async (
    order: Partial<Order>
  ): Promise<{ data: string; error: string; message: string }> => {
    return await post(`/${ServicePrefix.OnlineMenu}/order`, order);
  },

  getOrdersByUser: async (): Promise<{ data: Order[] }> => {
    return await get(`/${ServicePrefix.OnlineMenu}/order`);
  },

  cancelOrder: async (orderId: string): Promise<{ data: void }> => {
    return await del(`/${ServicePrefix.OnlineMenu}/order/${orderId}`);
  },
};
