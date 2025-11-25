import './App.css'
import '@mantine/core/styles.css';
import Header from './components/Header/Header'
import { Navigate, Route, Routes } from 'react-router';
import VacancyPage from './components/VacancyPage/VacancyPage';
import HomePage from './components/HomePage/HomePage';
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Navigate to='vacancies/moscow' replace />} />
				<Route path='vacancies/moscow' element={<HomePage city='1' />} />
				<Route path='vacancies/petersburg' element={<HomePage city='2' />} />
				<Route path='vacancies/orenburg' element={<HomePage city='70' />} />
				<Route path='/vacancies/:id' element={<VacancyPage />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</>
	)
}
export default App
