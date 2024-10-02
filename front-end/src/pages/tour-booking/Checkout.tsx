import { LeftOutlined, LoadingOutlined } from "@ant-design/icons";
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
  Typography,
} from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AvatarProfile from "~/components/AvatarProfile";
import { Tour, TourBookingService } from "~/services/tour";

export default function CheckoutTourBooking() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { tourId } = useParams();
  const [currentTour, setCurrentTour] = useState<Tour | null>(null);
  const [participants, setParticipants] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TourBookingService.getDetailTour(String(tourId));
        setCurrentTour(response.data);
      } catch (err) {
        message.error("Failed to fetch restaurants.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(form.getFieldsValue());
  }, [form]);

  if (!currentTour) return <LoadingOutlined />;
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
            Select Tour
          </Button>
          <AvatarProfile />
        </HeaderContent>
        <Typography.Title>Current Order</Typography.Title>

        <StyledCard key={currentTour.id}>
          <Meta
            avatar={<Avatar src={currentTour.image} />}
            title={currentTour.title}
            description={currentTour.price.toString().concat("$ per person")}
          />
        </StyledCard>

        <Form layout="vertical" form={form}>
          <Typography.Title>Information</Typography.Title>

          <Form.Item label="Name" name="name">
            <Input placeholder="Vinh Nguyen" />
          </Form.Item>
          <Form.Item label="Mobile" name="mobile">
            <Input placeholder="123 456 789" />
          </Form.Item>

          <Form.Item label="Date" name="date">
            <DatePicker placeholder="01/01/2026" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Number of person" name="maxParticipants">
            <Input
              type="number"
              placeholder="10"
              min={1}
              onChange={(event) => setParticipants(+event.target.value)}
            />
          </Form.Item>

          <Typography.Title>Summary</Typography.Title>
          <RowFlexBox>
            <Typography.Text>Subtotal</Typography.Text>
            <Typography.Text>
              ${currentTour.price} x {participants} persons
            </Typography.Text>
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
              ${currentTour.price * participants}
            </Typography.Text>
          </RowFlexBox>

          <Typography.Title>Payment</Typography.Title>
          <Form.Item>
            <Radio checked={true}>Credit Card</Radio>
          </Form.Item>

          <Form.Item label="Card Number" name="cardNumber">
            <Input placeholder="1234 5678 9101 1213" />
          </Form.Item>
          <Form.Item label="Expiry Date" name="expiryDate">
            <DatePicker placeholder="01/01/2026" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="CVV" name="cvv">
            <Input placeholder="123" />
          </Form.Item>

          <StickyBox>
            <StickyBoxContent
              onClick={() => {
                const filledData = form.getFieldsValue();

                try {
                  TourBookingService.bookTour({
                    userId: localStorage.getItem("userId") || "",
                    tourId: String(tourId),
                    date: filledData.date,
                    name: filledData.name,
                    mobile: filledData.mobile,
                    maxParticipants: +filledData.maxParticipants,
                    cardNumber: filledData.cardNumber,
                    expiryDate: filledData.expiryDate,
                    cvv: filledData.cvv,
                  });
                  navigate("/thank-you");
                } catch (err) {
                  message.error("Error when booking");
                }
              }}>
              <CheckoutTitle>Book Now</CheckoutTitle>
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
