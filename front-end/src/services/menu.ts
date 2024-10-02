import { get, post, ServicePrefix } from "./baseApiService";

// Interfaces for menu item operations
interface CreateMenuItemDto {
  name: string;
  description: string;
  price: number;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
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
};
