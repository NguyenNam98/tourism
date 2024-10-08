import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Layout } from "antd";
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";

type LayoutProps = {
  redirectTo?: string;
};

const ProtectedLayout = ({ redirectTo = "/login" }: LayoutProps) => {
  const token = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (token === undefined) return;
    if (token === null) {
      navigate(redirectTo);
    }
  }, [token]);

  return (
    <Layout style={{ backgroundColor: "#ffffff" }}>
      <Header />
      <Outlet />
      <Footer />
    </Layout>
  );
};

export default ProtectedLayout;
