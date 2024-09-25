import { SAColourScheme } from '~/utils/constants.ts'
import {
	UserOutlined,
	LockOutlined,
	EyeTwoTone,
	EyeInvisibleOutlined,
	MailOutlined,
} from '@ant-design/icons'
import { Button, Checkbox, Input, Typography, Form } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './hooks'
import { ROUTES } from '~/router/routes.tsx'

interface FormRule {
	email: string
	password: string
}

export default function LoginPage() {
	const { Text, Link } = Typography
	const { signIn, loading } = useAuth()
	const navigate = useNavigate()
	const [form] = Form.useForm<FormRule>()

	const handleSubmit = async (values: FormRule) => {
		await signIn(values.email, values.password)
		navigate(ROUTES.HOME.path)
	}
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				height: '100vh',
				justifyContent: 'center',
				alignItems: 'center',
				objectFit: 'cover',
			}}
		>
			<div
				style={{
					backgroundColor: SAColourScheme.WHITE,
					borderRadius: 20,
					opacity: 0.96,
					justifyContent: 'space-between',
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
					padding: 32,
					paddingTop: 40,
					gap: 40,
				}}
			>
				<img
					src={`/assets/WorkAssistLogo.svg`}
					alt="Work Assist Logo"
					width={131.91}
					height={124.15}
				/>
				<Form
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 20,
						width: '100%',
					}}
					form={form}
					onFinish={handleSubmit}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 20,
						}}
					>
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
					<div
						style={{
							justifyContent: 'space-between',
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'row',
							gap: 20,
						}}
					>
						<Checkbox onChange={() => console.log('Remember me')}>
							Remember Me
						</Checkbox>
						<div
							style={{
								justifyContent: 'space-between',
								alignItems: 'center',
								display: 'flex',
								flexDirection: 'row',
							}}
						>
							<MailOutlined style={{ paddingRight: 8 }} />
							<Link href="https://ant.design" target="_blank">
								Forgot password
							</Link>
						</div>
					</div>
					<Button
						style={{
							textAlign: 'center',
							backgroundColor: SAColourScheme.NAVY,
							marginTop: 20,
						}}
						// onClick={() => router.push('/homePage')}
						type="primary"
						size="large"
						htmlType="submit"
						loading={loading}
					>
						Sign In
					</Button>
				</Form>
				<div
					style={{
						justifyContent: 'space-between',
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
						maxWidth: '100%',
					}}
				>
					<Text>
						If you do not have an account, please{' '}
						<Link href="https://ant.design" target="_blank" underline>
							Register
						</Link>{' '}
					</Text>
					<div
						style={{
							justifyContent: 'space-between',
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'row',
							gap: 12,
						}}
					>
						<Link href="https://ant.design" target="_blank">
							Terms and Conditions
						</Link>
						<Text>|</Text>
						<Link href="https://ant.design" target="_blank">
							Privacy Policy
						</Link>
					</div>
					<Text>© Copyright 2024</Text>
				</div>
			</div>
		</div>
	)
}
