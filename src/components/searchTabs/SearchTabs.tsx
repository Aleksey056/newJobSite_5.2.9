import { Tabs } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router';
import styles from './searchTabs.module.css'

function SearchTabs() {
	const navigate = useNavigate();
	const location = useLocation()

	const activeValue = () => {
		if (location.pathname.includes('/moscow')) return 'moscow'
		if (location.pathname.includes('/petersburg')) return 'petersburg'
		if (location.pathname.includes('/orenburg')) return 'orenburg'
	}

	const setTabs = (value: string | null) => {
		navigate(`/vacancies/${value}`)
	}

	return (
		<Tabs value={(activeValue())} onChange={setTabs} className={styles.tabsPage}>
			<Tabs.List>
				<Tabs.Tab value="moscow">Москва</Tabs.Tab>
				<Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
				<Tabs.Tab value="orenburg">Оренбург</Tabs.Tab>
			</Tabs.List>
		</Tabs>
	);
}

export default SearchTabs