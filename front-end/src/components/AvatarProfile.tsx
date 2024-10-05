import { Avatar, Dropdown, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { avatarSrc } from "~/utils/constants";

export default function AvatarProfile() {
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <a
          onClick={() => {
            localStorage.clear();
            navigate("/history");
          }}>
          History
        </a>
      ),
    },
    {
      key: "1",
      label: (
        <a
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}>
          <b>SignOut</b>
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
