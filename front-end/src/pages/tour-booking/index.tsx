import { LeftOutlined } from "@ant-design/icons";
import type { GetProps } from "antd";
import { Button, Card, Image, Input, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { listTours } from "./data";
import AvatarProfile from "~/components/AvatarProfile";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

export default function TourBooking() {
  const navigate = useNavigate();

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

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
            }}></Button>
          <AvatarProfile />
        </HeaderContent>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}>
          <div>
            <Typography.Title>Tour Booking</Typography.Title>
            <Typography.Text>Let's Travel</Typography.Text>
          </div>
          <Image
            preview={false}
            width={200}
            height={200}
            src="https://img.freepik.com/premium-vector/airplane-illustration_961307-16846.jpg"
          />
        </div>

        <Typography.Text>Where do you want to go?</Typography.Text>

        <Search
          placeholder="Search here..."
          allowClear
          onSearch={onSearch}
          style={{ width: "100%" }}
        />

        <ListCardContent>
          {listTours.map((tour) => (
            <StyledCard
              onClick={() => {
                navigate(`/tour-booking/checkout/${tour.id}`);
              }}
              cover={<Image src={tour.image} />}
              key={tour.id}
              actions={[
                <CardText>A${tour.price}</CardText>,
                <CardText>{tour.rating} ⭐</CardText>,
              ]}>
              <Meta title={tour.name} description={tour.location} />
            </StyledCard>
          ))}
        </ListCardContent>
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

const ListCardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columns */
  gap: 1rem;
`;
const StyledCard = styled(Card)`
  width: 10rem;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .ant-card-body {
    padding: 0.5rem;
  }
  .ant-image-img {
    height: 7rem;
  }
  &:hover {
    cursor: pointer;
    background-color: #f5f5f7;
  }
`;

const CardText = styled.p`
  font-size: 1rem;
  margin: 0;
`;
