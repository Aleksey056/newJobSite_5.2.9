import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter basename='/newJobSite_5.2.9'>
			<Provider store={store} >
				<MantineProvider>
					<App />
				</MantineProvider>
			</Provider>
		</BrowserRouter>
	</StrictMode>
)
