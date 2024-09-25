import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import Routings from '~/router/Routings.tsx'

import Layout from './Layout.tsx'
import { persistor, store } from '~/store'

const App = () => (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<Router>
				<Layout>
					<Routings />
				</Layout>
			</Router>
		</PersistGate>
	</Provider>
)

export default App
