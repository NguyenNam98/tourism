import React from "react";
import type { IndexRouteProps, PathRouteProps } from "react-router-dom";
import ThankYou from "~/components/ThankYouPage";
import Home from "~/pages/home";
import OnlineMenu from "~/pages/online-menu";
import CurrentOrder from "~/pages/online-menu/CurrentOrder";
import TableReservation from "~/pages/table-reservation";
import TourBooking from "~/pages/tour-booking";
import BookTourOrder from "~/pages/tour-booking/CurrentOrder";

// const Home = React.lazy(() => import('~/pages/home'))
const LoginPage = React.lazy(() => import("~/pages/auth/Login.tsx"));

export const ROUTES: {
  [key: string]: (PathRouteProps | IndexRouteProps) & {
    isPrivate: boolean;
    title?: string;
    path: string;
    children?: (PathRouteProps | IndexRouteProps)[];
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
  ONLINE_MENU_CHECKOUT: {
    path: "/online-menu/checkout",
    element: <CurrentOrder />,
    isPrivate: true,
    index: true,
  },
  THANK_YOU: {
    path: "thank-you",
    element: <ThankYou />,
    isPrivate: true,
    index: true,
  },

  TABLE_RESERVATION: {
    path: "/table-reservation",
    element: <TableReservation />,
    isPrivate: true,
    index: true,
  },
  TABLE_RESERVATION_CHECKOUT: {
    path: "/table-reservation/checkout/:tourId",
    element: <BookTourOrder />,
    isPrivate: true,
    index: true,
  },
  TOUR_BOOKING: {
    path: "/tour-booking",
    element: <TourBooking />,
    isPrivate: true,
    index: true,
  },
  TOUR_BOOKING_CHECKOUT: {
    path: "/tour-booking/checkout/:tourId",
    element: <BookTourOrder />,
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
