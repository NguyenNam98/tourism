import { get, post, put, del, ServicePrefix } from "./baseApiService";

// Interfaces for order operations
interface CreateOrderDto {
  restaurantId: string;
  tableId: string;
  items: string[]; // Array of menu item IDs
}

interface UpdateOrderDto {
  items: string[]; // Updated list of menu item IDs
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface Order {
  id: string;
  restaurantId: string;
  tableId: string;
  items: string[];
  status: number;
  orderedItems: MenuItem[];
}

export const OrderService = {
  createOrder: async (order: CreateOrderDto): Promise<{ data: string }> => {
    return await post(`/${ServicePrefix.OnlineMenu}/order`, order);
  },

  getOrdersByUser: async (): Promise<{ data: Order[] }> => {
    return await get(`/${ServicePrefix.OnlineMenu}/order`);
  },

  updateOrder: async (
    orderId: string,
    order: UpdateOrderDto
  ): Promise<{ data: void }> => {
    return await put(`/${ServicePrefix.OnlineMenu}/order/${orderId}`, order);
  },

  cancelOrder: async (orderId: string): Promise<{ data: void }> => {
    return await del(`/${ServicePrefix.OnlineMenu}/order/${orderId}`);
  },
};
