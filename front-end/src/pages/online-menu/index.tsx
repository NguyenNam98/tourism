import {
  EnvironmentOutlined,
  LeftOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import type { GetProps } from "antd";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Image,
  Input,
  message,
  Typography,
} from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AvatarProfile from "~/components/AvatarProfile";
import { MenuItem, MenuService } from "~/services/menu";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

export default function OnlineMenu() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState<(MenuItem & { quantity: number })[]>([]);

  const onSearch: SearchProps["onSearch"] = (value) => {
    const keyword = value.toLowerCase();
    const searchedMenu = menu.filter(
      (food) =>
        food.title.toLowerCase().includes(keyword) ||
        food.description.toLowerCase().includes(keyword)
    );
    setMenu(searchedMenu);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MenuService.getListMenuItems();
        setMenu(
          response.data.map((item) => ({
            ...item,
            quantity: 0,
          }))
        );
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
        <Typography.Title>Online Menu</Typography.Title>
        <Image
          preview={false}
          src="https://media.licdn.com/dms/image/sync/v2/D4D27AQGb3KfhV4MNMw/articleshare-shrink_800/articleshare-shrink_800/0/1715828082828?e=2147483647&v=beta&t=8MbmrPStwgtIBVBrHnsMsvwqDubILGvFmJ_7RgSRUbM"
        />
        <Typography.Text>What are you going to eat today?</Typography.Text>
        <Typography.Text>
          <EnvironmentOutlined /> Wollongong, Australia
        </Typography.Text>
        <Search
          placeholder="Search here..."
          allowClear
          onSearch={onSearch}
          style={{ width: "100%" }}
        />

        {menu.map((food) => (
          <StyledCard
            key={food.id}
            actions={[
              <MinusOutlined
                key="minus"
                onClick={() => {
                  if (food.quantity <= 0) return;

                  const newMenu = menu.map((item) => {
                    if (item.id === food.id) {
                      return {
                        ...item,
                        quantity: --item.quantity,
                      };
                    }
                    return item;
                  });

                  setMenu(newMenu);
                }}
              />,
              <QuantityNumber>{food.quantity}</QuantityNumber>,
              <PlusOutlined
                key="add"
                onClick={() => {
                  const newMenu = menu.map((item) => {
                    if (item.id === food.id) {
                      return {
                        ...item,
                        quantity: ++item.quantity,
                      };
                    }
                    return item;
                  });

                  setMenu(newMenu);
                }}
              />,
            ]}>
            <Meta
              avatar={<Avatar src={food.image} />}
              title={food.title}
              description={food.price}
            />
          </StyledCard>
        ))}
        <CheckoutBox>
          <CheckoutWrapper
            onClick={() => {
              const orderedItems = menu.filter((item) => item.quantity > 0);

              if (orderedItems.length <= 0) return;
              navigate("/online-menu/checkout", {
                state: menu.filter((item) => item.quantity > 0),
              });
            }}>
            <CheckoutTitle>Checkout</CheckoutTitle>
            <MyCartTitle>
              <ShoppingCartOutlined />
              My Cart{" "}
              <Badge
                count={menu.reduce((acc, item) => {
                  return acc + item.quantity;
                }, 0)}
                showZero
                color="#001F3F"
              />
            </MyCartTitle>
          </CheckoutWrapper>
        </CheckoutBox>
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

const QuantityNumber = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const CheckoutBox = styled.div`
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

const CheckoutWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1rem;
`;

const CheckoutTitle = styled.p`
  font-size: 1rem;
  color: #ffffff;
`;

const MyCartTitle = styled.p`
  font-size: 0.875rem;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  color: #c4d7ff;
`;
