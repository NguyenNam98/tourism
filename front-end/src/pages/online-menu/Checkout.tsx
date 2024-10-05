import { LeftOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  TimePicker,
  Typography,
} from "antd";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AvatarProfile from "~/components/AvatarProfile";
import { listFood } from "./data";

export default function CheckoutOnlineMenu() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

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

        {listFood.slice(3).map((food) => (
          <StyledCard key={food.id}>
            <Meta
              avatar={<Avatar src={food.image} />}
              title={food.name}
              description={food.price.toString().concat(" x 12 = 120$")}
            />
          </StyledCard>
        ))}

        <Typography.Title>Summary</Typography.Title>
        <RowFlexBox>
          <Typography.Text>Subtotal</Typography.Text>
          <Typography.Text>120.0</Typography.Text>
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
            120.0
          </Typography.Text>
        </RowFlexBox>

        <Form layout="vertical" form={form}>
          <Typography.Title>Customer Information</Typography.Title>

          <Form.Item label="Name">
            <Input placeholder="Vinh Nguyen" />
          </Form.Item>
          <Form.Item label="Mobile">
            <Input placeholder="123 456 789" />
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
          <Form.Item>
            <RowFlexBox>
              <Typography.Text>Date</Typography.Text>
              <Typography.Text>{new Date().toDateString()}</Typography.Text>
            </RowFlexBox>
          </Form.Item>

          <Form.Item label="Pickup Time">
            <TimePicker style={{ width: "100%" }} />
          </Form.Item>

          <Typography.Title>Payment</Typography.Title>
          <Form.Item>
            <Radio checked={true}>Credit Card</Radio>
          </Form.Item>

          <Form.Item label="Card Number">
            <Input placeholder="1234 5678 9101 1213" />
          </Form.Item>
          <Form.Item label="Expiry Date">
            <DatePicker placeholder="01/01/2026" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="CVV">
            <Input placeholder="123" />
          </Form.Item>

          <StickyBox>
            <StickyBoxContent
              onClick={() => {
                navigate("/thank-you");
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
