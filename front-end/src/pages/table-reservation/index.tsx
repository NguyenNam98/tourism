import { LeftOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AvatarProfile from "~/components/AvatarProfile";

export default function TableReservation() {
  const navigate = useNavigate();

  return (
    <Container>
      <MainContent>
        <HeaderContent>
          <Button
            type="link"
            shape="circle"
            icon={
              <LeftOutlined style={{ fontSize: "36px", color: "#ffffff" }} />
            }
            onClick={() => {
              navigate(-1);
            }}></Button>
          <AvatarProfile />
        </HeaderContent>
        <Content>
          <TextContent>
            <Typography.Title>Table Reservation</Typography.Title>
            <Typography.Text>Good food makes you happy</Typography.Text>
          </TextContent>
          <ButtonGroup>
            <Button
              onClick={() => {
                navigate(`/table-reservation/restaurant/Vietnam`);
              }}>
              Vietnam
            </Button>
            <Button
              onClick={() => {
                navigate(`/table-reservation/restaurant/Western`);
              }}>
              Western
            </Button>
            <Button
              onClick={() => {
                navigate(`/table-reservation/restaurant/French`);
              }}>
              French
            </Button>
          </ButtonGroup>
        </Content>
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
  background-image: url("https://thebigd4.files.wordpress.com/2023/01/header.jpg");
  background-size: cover;
  background-position: center;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 65vh;
  color: white;
`;

const TextContent = styled.div`
  padding-inline: 1rem;
  color: #ffffff;

  p,
  h1,
  span {
    color: #ffffff;
  }
`;

const ButtonGroup = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: 0 1rem;
`;
