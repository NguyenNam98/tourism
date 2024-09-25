import React from 'react'
import type { IndexRouteProps, PathRouteProps } from 'react-router-dom'

// const Home = React.lazy(() => import('~/pages/home'))
const LoginPage = React.lazy(() => import('~/pages/auth/Login.tsx'))

export const ROUTES: {
	[key: string]: (PathRouteProps | IndexRouteProps) & {
		isPrivate: boolean
		title?: string
    path: string
	}
} = {
	HOME: {
		path: '/',
		element: <div>Home</div>,
		isPrivate: true,
		index: true,
	},
	LOGIN: {
		path: '/login',
		element: <LoginPage />,
		isPrivate: false,
	},
}

export const publicRoutes = Object.values(ROUTES).filter(
	({ isPrivate }) => !isPrivate
)

export const privateRoutes = Object.values(ROUTES).filter(
	({ isPrivate }) => isPrivate
)
