import {
  AliwangwangOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthService } from "~/services/auth";
import { SAColourScheme } from "~/utils/constants.ts";

interface FormRule {
  email: string;
  password: string;
  username: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm<FormRule>();

  const handleSubmit = async (values: FormRule) => {
    const response = await AuthService.register(values);

    if (response.data && response.data.uid) {
      message.success("You have successfully registered");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      message.error(response.message ?? response.error);
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
          <Form.Item name="username" rules={[{ required: true }]}>
            <Input
              size="large"
              placeholder="Enter display name"
              prefix={<AliwangwangOutlined />}
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
          htmlType="submit">
          Register
        </Button>
        <div
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}>
          <div
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              marginTop: "1rem",
            }}>
            <Typography.Link onClick={() => navigate("/login")}>
              Already have an account?{" "}
              <span
                style={{
                  fontWeight: "bold",
                  color: SAColourScheme.NAVY,
                }}>
                Login!
              </span>
            </Typography.Link>
          </div>
        </div>
      </Form>
    </div>
  );
}
