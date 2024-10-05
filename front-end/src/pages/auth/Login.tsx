import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/router/routes.tsx";
import { SAColourScheme } from "~/utils/constants.ts";
import { useAuth } from "./hooks";

interface FormRule {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { Link } = Typography;
  const { signIn, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm<FormRule>();

  const handleSubmit = async (values: FormRule) => {
    await signIn(values.email, values.password);

    if (!error) {
      navigate(ROUTES.HOME.path);
    }
  };

  return (
    <div
      style={{
        backgroundColor: SAColourScheme.WHITE,
        borderRadius: 20,
        opacity: 0.96,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "2rem",
      }}>
      <img
        src={
          "https://png.pngtree.com/png-clipart/20230802/original/pngtree-summer-vacation-cartoon-with-travel-essentials-and-tourism-items-picture-image_7831681.png"
        }
        alt="Work Assist Logo"
        width={250}
        height={250}
      />
      <Form
        style={{
          display: "flex",
          flexDirection: "column",

          width: "100%",
        }}
        form={form}
        onFinish={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}>
          <Form.Item name="email" rules={[{ required: true }]}>
            <Input
              size="large"
              placeholder="Enter email"
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password
              size="large"
              placeholder="Enter password"
              prefix={<LockOutlined />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </div>

        <Button
          style={{
            textAlign: "center",
            backgroundColor: SAColourScheme.NAVY,
            marginTop: 20,
          }}
          type="primary"
          size="large"
          htmlType="submit"
          loading={loading}>
          Sign In
        </Button>

        <div
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}>
          <div
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              marginTop: "1rem",
            }}>
            <Link onClick={() => navigate("/register")}>
              Don't have an account?{" "}
              <span
                style={{
                  fontWeight: "bold",
                  color: SAColourScheme.NAVY,
                }}>
                Register!
              </span>
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
}
