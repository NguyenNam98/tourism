/**
 * @note
 * for hook alternative of route element composition:
 * - https://reactrouter.com/docs/en/v6/upgrading/v5#use-useroutes-instead-of-react-router-config
 * - https://reactrouter.com/docs/en/v6/examples/route-objects
 *
 * might need to take notes on:
 * - https://reactrouter.com/docs/en/v6/upgrading/v5#note-on-link-to-values
 */

import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import ProtectedLayout from './protected-route'
import AuthLayout from './public-route'
import { privateRoutes, publicRoutes } from './routes.tsx'

const Routings = () => {
	return (
		<Suspense>
			<Routes>
				<Route element={<AuthLayout />}>
					{publicRoutes.map((routeProps) => (
						<Route
							{...routeProps}
							key={`public-${routeProps.path as string}`}
						/>
					))}
				</Route>
				<Route element={<ProtectedLayout />}>
					{privateRoutes.map(({ element, ...privateRouteProps }) => (
						<Route
							element={element}
							{...privateRouteProps}
							key={`privateRoute-${privateRouteProps.path}`}
						/>
					))}
				</Route>
				<Route path="*" element={<div>Not found</div>} />
			</Routes>
		</Suspense>
	)
}

export default Routings
