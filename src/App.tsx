import './App.css'
import '@mantine/core/styles.css';
import Header from './components/Header/Header'
import { Navigate, Route, Routes } from 'react-router';
import VacancyPage from './components/VacancyPage/VacancyPage';
import HomePage from './components/HomePage/HomePage';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/vacancies' element={<HomePage />} />
				<Route path='/vacancies/:id' element={<VacancyPage />} />
				<Route path='*' element={<Navigate to='/vacancies' replace />} />
			</Routes>
		</>
	)
}
export default App
