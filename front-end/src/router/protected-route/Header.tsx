// import { useLocation, useNavigate } from 'react-router-dom'

// import { ROUTES } from '../routes'
// import { findTitleByPath } from '../utils'
// import { Button, Menu } from 'antd'

const Header = () => {
	// const location = useLocation()
	// const navigate = useNavigate()

	// const onNavigateHome = () => navigate(ROUTES.HOME.path as string)
	// const logout = useLogout()
	// const handleLogout = () => {
	// 	logout()
	// 	navigate(ROUTES.LOGIN.path as string)
	// }

	// const renderLeftHeading = () => {
	// 	if (location.pathname === ROUTES.HOME.path)
	// 		// {
	// 		//   return (
	// 		//     <Text
	// 		//       variant="gradient"
	// 		//       gradient={{
	// 		//         from: "#0036D0",
	// 		//         to: "#B31010",
	// 		//         deg: 45,
	// 		//       }}
	// 		//       style={{ fontSize: 28 }}
	// 		//       fw={800}
	// 		//     >
	// 		//       Header
	// 		//     </Text>
	// 		//   );
	// 		// }
	// 		return <p>ettxt</p>

	// 	return (
	// 		<Button onClick={onNavigateHome}>
	// 			{findTitleByPath(location.pathname)}
	// 		</Button>
	// 	)
	// }

	// const renderRightHeading = () => {
	// 	return (
	// 		<Menu>
	// 			{/* <Menu.Target>
	// 				<Button
	// 					leftSection={<IconUser />}
	// 					variant="default"
	// 					size="compact-xl"
	// 					color="dark"
	// 				>
	// 					{username}
	// 				</Button>
	// 			</Menu.Target>

	// 			<Menu.Dropdown>
	// 				<Menu.Item onClick={handleLogout}>Logout</Menu.Item>
	// 			</Menu.Dropdown> */}
	// 		</Menu>
	// 	)
	// }
	return (
		<div>Hello</div>
		// <Paper
		// 	bg={'white'}
		// 	px={'md'}
		// 	py={'lg'}
		// 	w={'100%'}
		// 	shadow="xs"
		// 	style={{
		// 		position: 'sticky',
		// 		top: 0,
		// 		zIndex: 10,
		// 	}}
		// >
		// 	<Flex justify={'space-between'}>
		// 		{renderLeftHeading()}
		// 		{renderRightHeading()}
		// 	</Flex>
		// </Paper>
	)
}

export default Header
