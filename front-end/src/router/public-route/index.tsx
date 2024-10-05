import { Flex } from "antd";
import { Fragment, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = ({ redirectTo = "/" }) => {
  const token = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (token === undefined) return;
    if (token) {
      navigate(redirectTo);
    }
  }, [token]);

  return (
    <Fragment>
      <Flex
        style={{
          zIndex: 1,
          position: "relative",
          height: "100%",
          width: "100%",
        }}
        align="center"
        justify={"center"}>
        <Outlet />
      </Flex>
    </Fragment>
  );
};
export default AuthLayout;
