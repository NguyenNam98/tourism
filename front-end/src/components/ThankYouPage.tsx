import { CheckOutlined, LeftOutlined } from "@ant-design/icons";
import { Avatar, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { avatarSrc } from "~/utils/constants";

export default function ThankYou() {
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
              navigate("/");
            }}></Button>
          <Avatar size={48} src={avatarSrc} />
        </HeaderContent>

        <ContentDetail>
          <SuccessBox>
            <CheckOutlined style={{ fontSize: "102px" }} />
          </SuccessBox>

          <Typography.Title style={{ textAlign: "center" }}>
            Thank you!
          </Typography.Title>
        </ContentDetail>

        <StickyBox>
          <StickyBoxContent
            onClick={() => {
              navigate("/");
            }}>
            <CheckoutTitle>Home Page</CheckoutTitle>
          </StickyBoxContent>
        </StickyBox>
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
const ContentDetail = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-inline: 1rem;
`;
const SuccessBox = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #73ec8b;
  border-radius: 50%;
`;
