import {
  AppstoreOutlined,
  LeftOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AvatarProfile from "~/components/AvatarProfile";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    icon: <MailOutlined />,
    label: "Online Menu",
    children: [
      { key: "11", label: "Option 1" },
      { key: "12", label: "Option 2" },
      { key: "13", label: "Option 3" },
      { key: "14", label: "Option 4" },
    ],
  },
  {
    key: "2",
    icon: <AppstoreOutlined />,
    label: "Tour Booking",
    children: [
      { key: "21", label: "Option 1" },
      { key: "22", label: "Option 2" },
      {
        key: "23",
        label: "Submenu",
        children: [
          { key: "231", label: "Option 1" },
          { key: "232", label: "Option 2" },
          { key: "233", label: "Option 3" },
        ],
      },
      {
        key: "24",
        label: "Submenu 2",
        children: [
          { key: "241", label: "Option 1" },
          { key: "242", label: "Option 2" },
          { key: "243", label: "Option 3" },
        ],
      },
    ],
  },
  {
    key: "3",
    icon: <SettingOutlined />,
    label: "Table Reservation",
    children: [
      { key: "31", label: "Option 1" },
      { key: "32", label: "Option 2" },
      { key: "33", label: "Option 3" },
      { key: "34", label: "Option 4" },
    ],
  },
];
export default function History() {
  const navigate = useNavigate();

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
        <Menu
          mode="inline"
          style={{ width: "110%", marginInline: "-1rem", borderInlineEnd: 0 }}
          items={items}
        />
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
