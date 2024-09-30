import { Flex } from "antd";
import { type ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();

  const childDivRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (childDivRef.current) {
      childDivRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return (
    <Flex justify={"center"} component="main">
      <Flex
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
          background: "linear-gradient(to right, #c31432, #240b36)",
        }}>
        <div className="smartphone">
          <div className="content">
            <div
              ref={childDivRef}
              style={{
                backgroundColor: "#ffffff",
                overflowY: "auto",
                height: "100%",
              }}>
              {children}
            </div>
          </div>
        </div>
      </Flex>
    </Flex>
  );
};

export default Layout;
