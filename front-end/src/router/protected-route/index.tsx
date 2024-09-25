import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useToken } from '~/store/features/auth/selectors.ts'

import Footer from './Footer.tsx'
import Header from './Header.tsx'
import { Flex } from 'antd'

type LayoutProps = {
	redirectTo?: string
}

const ProtectedLayout = ({ redirectTo = '/login' }: LayoutProps) => {
	const token = useToken()
	const navigate = useNavigate()

	useEffect(() => {
		if (token === undefined) return
		if (token === null) {
			navigate(redirectTo)
		}
	}, [token])

	return (
		<Flex>
			<Header />
			<div>
				<Outlet />
			</div>
			<Footer />
		</Flex>
	)
}

export default ProtectedLayout
