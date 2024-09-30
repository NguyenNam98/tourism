import { LeftOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  TimePicker,
  Typography,
} from "antd";
import Meta from "antd/es/card/Meta";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AvatarProfile from "~/components/AvatarProfile";
import { listRestaurants } from "./data";

export default function CheckoutTableReservation() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { restaurantId } = useParams();

  return (
    <Container>
      <MainContent>
        <HeaderContent>
          <Button
            type="link"
            shape="circle"
            icon={
              <LeftOutlined style={{ fontSize: "36px", color: "#000000" }} />
            }
            onClick={() => {
              navigate(-1);
            }}>
            Select Restaurant
          </Button>
          <AvatarProfile />
        </HeaderContent>
        <Typography.Title>Current Order</Typography.Title>

        {listRestaurants
          .filter((restaurant) => restaurant.id === +(restaurantId ?? 0))
          .map((restaurant) => (
            <StyledCard key={restaurant.id}>
              <Meta
                avatar={<Avatar src={restaurant.image} />}
                title={restaurant.name}
                description={restaurant.location}
              />
            </StyledCard>
          ))}

        <Form layout="vertical" form={form}>
          <Typography.Title>Information</Typography.Title>

          <Form.Item label="Name">
            <Input placeholder="Vinh Nguyen" />
          </Form.Item>
          <Form.Item label="Mobile">
            <Input placeholder="123 456 789" />
          </Form.Item>

          <Form.Item label="Date">
            <DatePicker placeholder="01/01/2026" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Time">
            <TimePicker placeholder="11:00" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Number of person">
            <Input type="number" placeholder="10" min={1} />
          </Form.Item>

          <Form.Item label="Note">
            <Input placeholder="Please provide 2 chairs" />
          </Form.Item>

          <Typography.Title>Summary</Typography.Title>
          <RowFlexBox>
            <Typography.Text>Name</Typography.Text>
            <Typography.Text>Vinh Nguyen</Typography.Text>
          </RowFlexBox>
          <RowFlexBox>
            <Typography.Text>Phone</Typography.Text>
            <Typography.Text>0123 123 123</Typography.Text>
          </RowFlexBox>
          <RowFlexBox>
            <Typography.Text>Date</Typography.Text>
            <Typography.Text>20/01/2000</Typography.Text>
          </RowFlexBox>
          <RowFlexBox>
            <Typography.Text>Time</Typography.Text>
            <Typography.Text>20:00</Typography.Text>
          </RowFlexBox>
          <RowFlexBox>
            <Typography.Text>Number of person</Typography.Text>
            <Typography.Text>3</Typography.Text>
          </RowFlexBox>
          <Divider />
          <StickyBox>
            <StickyBoxContent
              onClick={() => {
                navigate("/thank-you");
              }}>
              <CheckoutTitle>Confirm Reservation</CheckoutTitle>
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
