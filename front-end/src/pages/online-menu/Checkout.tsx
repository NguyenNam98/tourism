import { LeftOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Radio,
  TimePicker,
  Typography,
} from "antd";
import Meta from "antd/es/card/Meta";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AvatarProfile from "~/components/AvatarProfile";
import { MenuItem } from "~/services/menu";
import { Order, OrderService } from "~/services/order";
import dayjs, { Dayjs } from "dayjs";

export default function CheckoutOnlineMenu() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const location = useLocation();
  const orderFood = location.state as (MenuItem & {
    quantity: number;
  })[];

  const [orderInfo, setOrderInfo] = useState<Partial<Order>>({
    name: "",
    mobile: "",
    date: new Date(),
    cardNumber: "",
    expiryDate: new Date(),
    cvv: "",
    orderItems: orderFood.map((item) => ({
      id: item.id,
      price: item.price,
      quantity: item.quantity,
    })),
    total: orderFood.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0),
  });

  const updateOrder = async (data: Partial<Order>) => {
    setOrderInfo({
      ...orderInfo,
      ...data,
    });
  };

  const combineDateTime = (
    date: Dayjs | null,
    time: Dayjs | null
  ): Date | null => {
    if (!date || !time) return date ? date.toDate() : null;

    const combinedDate = date
      .set("hour", time.hour())
      .set("minute", time.minute())
      .set("second", 0)
      .set("millisecond", 0);

    return combinedDate.toDate();
  };

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
            }}>
            Custom Order
          </Button>
          <AvatarProfile />
        </HeaderContent>
        <Typography.Title>Current Order</Typography.Title>

        {orderFood.map((food) => (
          <StyledCard key={food.id}>
            <Meta
              avatar={<Avatar src={food.image} />}
              title={food.title}
              description={`${food.price} x ${food.quantity} = ${
                food.price * food.quantity
              }$`}
            />
          </StyledCard>
        ))}

        <Typography.Title>Summary</Typography.Title>
        <RowFlexBox>
          <Typography.Text>Subtotal</Typography.Text>
          <Typography.Text>{orderInfo.total} $</Typography.Text>
        </RowFlexBox>
        <RowFlexBox>
          <Typography.Text>Discount</Typography.Text>
          <Typography.Text>0</Typography.Text>
        </RowFlexBox>
        <RowFlexBox>
          <Typography.Text>Total Tax</Typography.Text>
          <Typography.Text>0</Typography.Text>
        </RowFlexBox>
        <Divider style={{ padding: 0, margin: 0 }} />
        <RowFlexBox>
          <Typography.Text style={{ color: "#347928", fontWeight: 700 }}>
            Total
          </Typography.Text>
          <Typography.Text style={{ color: "#347928", fontWeight: 700 }}>
            {orderInfo.total} $
          </Typography.Text>
        </RowFlexBox>

        <Form layout="vertical" form={form}>
          <Typography.Title>Customer Information</Typography.Title>

          <Form.Item label="Name">
            <Input
              placeholder="Vinh Nguyen"
              onChange={(event) => updateOrder({ name: event.target.value })}
            />
          </Form.Item>
          <Form.Item label="Mobile">
            <Input
              placeholder="123 456 789"
              onChange={(event) => updateOrder({ mobile: event.target.value })}
            />
          </Form.Item>

          <Typography.Title>Pickup Information</Typography.Title>
          <Form.Item>
            <RowFlexBox>
              <Typography.Text>Address</Typography.Text>
              <Typography.Text>90 Crown Street</Typography.Text>
            </RowFlexBox>
          </Form.Item>
          <Form.Item>
            <RowFlexBox>
              <Typography.Text>Distance</Typography.Text>
              <Typography.Text>0.2 meters</Typography.Text>
            </RowFlexBox>
          </Form.Item>
          <Form.Item label="Date">
            <DatePicker
              placeholder="01/01/2026"
              style={{ width: "100%" }}
              onChange={(date: Dayjs | null) => {
                const currentTime = dayjs(orderInfo?.date);
                const combined = combineDateTime(date, currentTime);
                updateOrder({
                  date: combined ? combined : undefined,
                });
              }}
            />
          </Form.Item>
          <Form.Item label="Time">
            <TimePicker
              placeholder="11:00"
              style={{ width: "100%" }}
              onChange={(time: Dayjs | null) => {
                const currentDate = dayjs(orderInfo?.date);
                const combined = combineDateTime(currentDate, time);
                updateOrder({
                  date: combined ? combined : undefined,
                });
              }}
            />
          </Form.Item>

          <Typography.Title>Payment</Typography.Title>
          <Form.Item>
            <Radio checked={true}>Credit Card</Radio>
          </Form.Item>

          <Form.Item label="Card Number">
            <Input
              placeholder="1234 5678 9101 1213"
              onChange={(event) =>
                updateOrder({ cardNumber: event.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Expiry Date">
            <DatePicker
              placeholder="01/01/2026"
              style={{ width: "100%" }}
              onChange={(event) =>
                updateOrder({ expiryDate: dayjs(event).toDate() })
              }
            />
          </Form.Item>
          <Form.Item label="CVV">
            <Input
              placeholder="123"
              onChange={(event) => updateOrder({ cvv: event.target.value })}
            />
          </Form.Item>

          <StickyBox>
            <StickyBoxContent
              onClick={() => {
                try {
                  OrderService.createOrder({
                    userId: localStorage.getItem("userId") || "",
                    ...orderInfo,
                  });
                  navigate("/thank-you");
                } catch (err) {
                  message.error("Error when booking");
                }
              }}>
              <CheckoutTitle>Order Now</CheckoutTitle>
            </StickyBoxContent>
          </StickyBox>
        </Form>
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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

const StyledCard = styled(Card)`
  width: 100%;

  :where(.css-dev-only-do-not-override-1uq9j6g).ant-avatar {
    border: 1px solid transparent;
    width: 100px;
    height: 100px;
    border-radius: 0;
    margin-left: -1.6rem;
    margin-block: -1.3rem;
    border-top-left-radius: 8px;
  }
`;

const StickyBox = styled.div`
  position: sticky;
  left: 0;
  bottom: 10px;
  width: 100%;
  height: 50px;
  background-color: #001529;
  color: white;
  text-align: center;
  line-height: 50px;
  border-radius: 2rem;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    background-color: #1e3e62;
    opacity: 0.9;
    cursor: pointer;
  }
`;

const RowFlexBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StickyBoxContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-inline: 1rem;
`;

const CheckoutTitle = styled.p`
  font-size: 1rem;
  color: #ffffff;
`;
