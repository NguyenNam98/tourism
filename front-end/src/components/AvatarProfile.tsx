import { Avatar, Dropdown, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { avatarSrc } from "~/utils/constants";

export default function AvatarProfile() {
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          onClick={() => {
            sessionStorage.clear();
            navigate("/login");
          }}>
          SignOut
        </a>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}>
      <Avatar size={48} src={avatarSrc} />
    </Dropdown>
  );
}
