import { LeftOutlined } from "@ant-design/icons";
import type { GetProps } from "antd";
import { Button, Card, Input, message, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AvatarProfile from "~/components/AvatarProfile";
import { Restaurant, RestaurantService } from "~/services/restaurant";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

export default function ListRestaurants() {
  const navigate = useNavigate();
  const { cuisineType } = useParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const onSearch: SearchProps["onSearch"] = (value) => {
    const keyword = value.toLowerCase();

    const searchedRestaurants = restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(keyword) ||
        restaurant.description.toLowerCase().includes(keyword)
    );
    setRestaurants(searchedRestaurants);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantService.getListRestaurantByType(
          String(cuisineType)
        );
        setRestaurants(response.data);
      } catch (err) {
        message.error("Failed to fetch restaurants.");
      }
    };

    fetchData();
  }, []);

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
        <Typography.Title>Table Reservation</Typography.Title>
        <Typography.Text>Where do you want to go?</Typography.Text>

        <Search
          placeholder="Search here..."
          allowClear
          onSearch={onSearch}
          style={{ width: "100%" }}
        />

        <ListCardContent>
          {restaurants
            .filter((res) => res.type === cuisineType)
            .map((res) => (
              <StyledCard
                onClick={() => {
                  navigate(`/table-reservation/checkout/${res.id}`);
                }}
                cover={<img src={res.image} />}
                key={res.id}
                actions={[
                  <CardText>Starting {res.priceRange}</CardText>,
                  <CardText>{res.rating} ⭐</CardText>,
                ]}>
                <Meta
                  title={res.name}
                  description={
                    <p>
                      {res.location}
                      <br />
                      <br />
                      {res.description}
                    </p>
                  }
                />
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
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
`;
const StyledCard = styled(Card)`
  width: "100%";
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .ant-card-body {
    padding: 0.5rem;
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
