import { Flex } from "antd";
import { type ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // this happens when user signs in or out
  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, async (user) => {
    // 	if (user) {
    // 		await updateUserCredential({ user })
    // 	} else {
    // 		await signOut()
    // 	}
    // })
    // return () => unsubscribe()
  }, []);

  return (
    <Flex justify={"center"} component="main">
      <Flex
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
          background: "linear-gradient(to right, #c31432, #240b36)",
        }}>
        <div className="smartphone">
          <div className="content">{children}</div>
        </div>
      </Flex>
    </Flex>
  );
};

export default Layout;
