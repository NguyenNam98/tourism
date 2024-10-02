import { get, post, ServicePrefix } from "./baseApiService";

interface CreateRestaurantDto {
  name: string;
  location: string;
  description: string;
}

interface CreateRestaurantTableDto {
  tableSize: number;
  tableNumber: number;
}

interface Restaurant {
  id: string;
  name: string;
  location: string;
  description: string;
}

interface RestaurantTable {
  id: string;
  tableSize: number;
  tableNumber: number;
}

export const RestaurantService = {
  createRestaurant: async (
    restaurantData: CreateRestaurantDto
  ): Promise<{ data: string }> => {
    return await post(
      `/${ServicePrefix.TableReservation}/restaurant`,
      restaurantData
    );
  },

  getListRestaurant: async (): Promise<{ data: Restaurant[] }> => {
    return await get(`/${ServicePrefix.TableReservation}/restaurant/list`);
  },

  getRestaurantById: async (
    restaurantId: string
  ): Promise<{
    data: { restaurant: Restaurant; tables: RestaurantTable[] };
  }> => {
    return await get(
      `/${ServicePrefix.TableReservation}/restaurant/${restaurantId}`
    );
  },

  createTable: async (
    restaurantId: string,
    tableData: CreateRestaurantTableDto
  ): Promise<{ data: string }> => {
    return await post(
      `/${ServicePrefix.TableReservation}/restaurant/table/${restaurantId}`,
      tableData
    );
  },

  getTableDetail: async (
    tableId: string
  ): Promise<{ data: RestaurantTable }> => {
    return await get(
      `/${ServicePrefix.TableReservation}/restaurant/table/${tableId}`
    );
  },
};
