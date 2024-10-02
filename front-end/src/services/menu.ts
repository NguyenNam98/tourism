import { get, post, ServicePrefix } from "./baseApiService";

interface CreateMenuItemDto {
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  is_valid: boolean;
  status: number;
}

export const MenuService = {
  createMenuItem: async (
    restaurantId: string,
    menuItem: CreateMenuItemDto
  ): Promise<{ data: string }> => {
    return await post(
      `/${ServicePrefix.OnlineMenu}/menu/${restaurantId}`,
      menuItem
    );
  },

  getMenuByRestaurantId: async (
    restaurantId: string
  ): Promise<{ data: MenuItem[] }> => {
    return await get(`/${ServicePrefix.OnlineMenu}/menu/${restaurantId}`);
  },

  getMenuItemById: async (menuItemId: string): Promise<{ data: MenuItem }> => {
    return await get(`/${ServicePrefix.OnlineMenu}/menu/item/${menuItemId}`);
  },

  getListMenuItems: async (): Promise<{ data: MenuItem[] }> => {
    return await get(`/${ServicePrefix.OnlineMenu}/menu/`);
  },
};
