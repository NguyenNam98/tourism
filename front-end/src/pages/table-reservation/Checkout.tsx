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
  TimePicker,
  Typography,
} from "antd";
import Meta from "antd/es/card/Meta";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AvatarProfile from "~/components/AvatarProfile";
import { Reservation, ReservationService } from "~/services/reservation";
import { Restaurant, RestaurantService } from "~/services/restaurant";

export default function CheckoutTableReservation() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { restaurantId } = useParams();

  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(
    null
  );
  const [reservation, setReservation] = useState<Partial<Reservation>>({
    userId: "",
    restaurantId: "",
    date: new Date(),
    name: "",
    mobile: "",
    noPersons: 0,
    note: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantService.getRestaurantById(
          String(restaurantId)
        );
        setCurrentRestaurant(response.data);
      } catch (err) {
        message.error("Failed to fetch data.");
      }
    };

    fetchData();
  }, []);

  const updateReservation = async (data: Partial<Reservation>) => {
    setReservation({
      ...reservation,
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
            Select Restaurant
          </Button>
          <AvatarProfile />
        </HeaderContent>
        <Typography.Title>Current Order</Typography.Title>

        {currentRestaurant && (
          <StyledCard key={currentRestaurant.id}>
            <Meta
              avatar={<Avatar src={currentRestaurant.image} />}
              title={currentRestaurant.name}
              description={currentRestaurant.location}
            />
          </StyledCard>
        )}

        <Form layout="vertical" form={form}>
          <Typography.Title>Information</Typography.Title>

          <Form.Item label="Name">
            <Input
              placeholder="Vinh Nguyen"
              onChange={(event) =>
                updateReservation({ name: event.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Mobile">
            <Input
              placeholder="123 456 789"
              onChange={(event) =>
                updateReservation({ mobile: event.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Date">
            <DatePicker
              placeholder="01/01/2026"
              style={{ width: "100%" }}
              onChange={(date: Dayjs | null) => {
                const currentTime = dayjs(reservation?.date);
                const combined = combineDateTime(date, currentTime);
                updateReservation({
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
                const currentDate = dayjs(reservation?.date);
                const combined = combineDateTime(currentDate, time);
                updateReservation({
                  date: combined ? combined : undefined,
                });
              }}
            />
          </Form.Item>
          <Form.Item label="Number of person">
            <Input
              type="number"
              placeholder="10"
              min={1}
              onChange={(event) =>
                updateReservation({ noPersons: +event.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Note">
            <Input
              placeholder="Please provide 2 chairs"
              onChange={(event) =>
                updateReservation({ note: event.target.value })
              }
            />
          </Form.Item>

          <Typography.Title>Summary</Typography.Title>
          <RowFlexBox>
            <Typography.Text>Name</Typography.Text>
            <Typography.Text>{reservation?.name ?? ""}</Typography.Text>
          </RowFlexBox>
          <RowFlexBox>
            <Typography.Text>Phone</Typography.Text>
            <Typography.Text>{reservation?.mobile ?? ""}</Typography.Text>
          </RowFlexBox>
          <RowFlexBox>
            <Typography.Text>Date</Typography.Text>
            <Typography.Text>
              {reservation?.date
                ? dayjs(reservation.date).format("DD/MM/YYYY")
                : ""}
            </Typography.Text>
          </RowFlexBox>
          <RowFlexBox>
            <Typography.Text>Time</Typography.Text>
            <Typography.Text>
              {reservation?.date ? dayjs(reservation.date).format("HH:mm") : ""}
            </Typography.Text>
          </RowFlexBox>
          <RowFlexBox>
            <Typography.Text>Number of person</Typography.Text>
            <Typography.Text>{reservation?.noPersons ?? ""}</Typography.Text>
          </RowFlexBox>
          <RowFlexBox>
            <Typography.Text>Note</Typography.Text>
            <Typography.Text>{reservation?.note ?? ""}</Typography.Text>
          </RowFlexBox>
          <Divider />
          <StickyBox>
            <StickyBoxContent
              onClick={async () => {
                console.log(currentRestaurant);
                try {
                  const response = await ReservationService.bookTable({
                    ...reservation,
                    userId: localStorage.getItem("userId") || "",
                    restaurantId: currentRestaurant?.id,
                  });

                  if (response.error) {
                    message.error(response.message ?? "Invalid information");
                    return;
                  }
                  navigate("/thank-you");
                } catch (err) {
                  message.error("Error when booking");
                }
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
