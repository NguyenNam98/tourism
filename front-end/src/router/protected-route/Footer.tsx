import { Flex } from 'antd'

const Footer = () => {
	return (
		<Flex justify={'center'}>
			<div>{new Date().getFullYear()}</div>
		</Flex>
	)
}

export default Footer
