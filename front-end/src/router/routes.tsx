import React from "react";
import type { IndexRouteProps, PathRouteProps } from "react-router-dom";
import Home from "~/pages/home";
import OnlineMenu from "~/pages/online-menu";
import TableReservation from "~/pages/table-reservation";
import TourBooking from "~/pages/tour-booking";

// const Home = React.lazy(() => import('~/pages/home'))
const LoginPage = React.lazy(() => import("~/pages/auth/Login.tsx"));

export const ROUTES: {
  [key: string]: (PathRouteProps | IndexRouteProps) & {
    isPrivate: boolean;
    title?: string;
    path: string;
  };
} = {
  HOME: {
    path: "/",
    element: <Home />,
    isPrivate: true,
    index: true,
  },
  ONLINE_MENU: {
    path: "/online-menu",
    element: <OnlineMenu />,
    isPrivate: true,
    index: true,
  },
  TABLE_RESERVATION: {
    path: "/table-reservation",
    element: <TableReservation />,
    isPrivate: true,
    index: true,
  },
  TOUR_BOOKING: {
    path: "/tour-booking",
    element: <TourBooking />,
    isPrivate: true,
    index: true,
  },
  LOGIN: {
    path: "/login",
    element: <LoginPage />,
    isPrivate: false,
  },
};

export const publicRoutes = Object.values(ROUTES).filter(
  ({ isPrivate }) => !isPrivate
);

export const privateRoutes = Object.values(ROUTES).filter(
  ({ isPrivate }) => isPrivate
);
