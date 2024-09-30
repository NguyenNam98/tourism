import { LeftOutlined } from "@ant-design/icons";
import { Avatar, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { avatarSrc } from "~/utils/constants";

export default function TourBooking() {
  const navigate = useNavigate();

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
          <Avatar size={48} src={avatarSrc} />
        </HeaderContent>
        <Typography.Title>Tour Booking</Typography.Title>
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
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
