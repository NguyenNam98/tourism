import {
  AppstoreOutlined,
  LeftOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Divider, Menu, message, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AvatarProfile from "~/components/AvatarProfile";
import { Order, OrderService } from "~/services/order";
import { Reservation, ReservationService } from "~/services/reservation";
import { BookingTour, TourBookingService } from "~/services/tour";

type MenuItem = Required<MenuProps>["items"][number];

export default function History() {
  const navigate = useNavigate();
  const [bookedTours, setBookedTours] = useState<BookingTour[]>([]);
  const [bookedReservations, setBookedReservations] = useState<Reservation[]>(
    []
  );
  const [bookedOrders, setBookedOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tours = await TourBookingService.getBookedTours();
        const reservations = await ReservationService.getBookedReservations();
        const orders = await OrderService.getOrdersByUser();

        setBookedTours(tours.data);
        setBookedReservations(reservations.data);
        setBookedOrders(orders.data);
      } catch (err) {
        message.error("Failed to fetch data.");
      }
    };

    fetchData();
  }, []);

  const items: MenuItem[] = [
    {
      key: "1",
      icon: <MailOutlined />,
      label: "Online Menu",
      children: bookedOrders.map((order) => ({
        key: order.id,
        label: (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              backgroundColor: "",
            }}>
            <Typography.Text>Name: {order.name}</Typography.Text>
            <Typography.Text>Mobile: {order.mobile}</Typography.Text>
            <Typography.Text>
              Date: {new Date(order.date).toLocaleDateString()}
            </Typography.Text>
            <Typography.Text>Total: {order.total}</Typography.Text>
            <Divider />
          </div>
        ),
      })),
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Tour Booking",
      children: bookedTours.map((tour) => ({
        key: tour.id,
        label: (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}>
            <Typography.Text>Name: {tour.name}</Typography.Text>
            <Typography.Text>Mobile: {tour.mobile}</Typography.Text>
            <Typography.Text>Date: {tour.date}</Typography.Text>
            <Typography.Text>
              Participants: {tour.maxParticipants}
            </Typography.Text>
            <Divider />
          </div>
        ),
      })),
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: "Table Reservation",
      children: bookedReservations.map((res) => ({
        key: res.id,
        label: (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}>
            <Typography.Text>Name: {res.name}</Typography.Text>
            <Typography.Text>Mobile: {res.mobile}</Typography.Text>
            <Typography.Text>
              Date: {new Date(res.date).toLocaleDateString()}
            </Typography.Text>
            <Typography.Text>Participants: {res.noPersons}</Typography.Text>
            <Divider />
          </div>
        ),
      })),
    },
  ];

  return (
    <Container>
      <MainContent>
        <HeaderContent>
          <Button
            type="link"
            icon={
              <LeftOutlined style={{ fontSize: "36px", color: "#000000" }} />
            }
            onClick={() => {
              navigate(-1);
            }}></Button>
          <AvatarProfile />
        </HeaderContent>
        <Menu
          mode="inline"
          style={{ width: "110%", marginInline: "-1rem", borderInlineEnd: 0 }}
          items={items}
        />
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .ant-menu-item {
    height: 100%;
  }
  .ant-menu-item.ant-menu-item-only-child {
    padding-top: 1rem;
    padding-left: 1rem !important;
  }
`;

const MainContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1rem;
  position: relative;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
