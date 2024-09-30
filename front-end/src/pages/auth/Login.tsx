import { SAColourScheme } from "~/utils/constants.ts";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Input, Typography, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks";
import { ROUTES } from "~/router/routes.tsx";

interface FormRule {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { Link } = Typography;
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm<FormRule>();

  const handleSubmit = async (values: FormRule) => {
    await signIn(values.email, values.password);
    navigate(ROUTES.HOME.path);
  };
  return (
    <div
      style={{
        backgroundColor: SAColourScheme.WHITE,
        borderRadius: 20,
        opacity: 0.96,
        justifyContent: "space-around",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "3rem 2rem",
      }}>
      <img
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI-h-e2hgz8mwGfCt4gvj4IgMG_wAUolVM6w&s"
        }
        alt="Work Assist Logo"
        width={80}
        height={60}
      />
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "100%",
        }}
        form={form}
        onFinish={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}>
          <Form.Item name="email" rules={[{ required: true }]}>
            <Input
              size="large"
              placeholder="Enter email"
              prefix={<UserOutlined />}
              value="vinhdep"
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
              value="vinhdep"
            />
          </Form.Item>
        </div>
        <div
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}>
          <Checkbox onChange={() => console.log("Remember me")}>
            Remember Me
          </Checkbox>
          <div
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
            }}>
            <MailOutlined style={{ paddingRight: 8 }} />
            <Link href="https://ant.design" target="_blank">
              Forgot password
            </Link>
          </div>
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
      </Form>
    </div>
  );
}
