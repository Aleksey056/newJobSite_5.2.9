import { Box, Divider } from "@mantine/core"
import Search from "../Search/Search"
import Skills from "../Skils/Skills"
import VacancyList from "../VacancyList/VacancyList"
import styles from './HomePage.module.css'
import { useSearchParams } from 'react-router'
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux"
import { useEffect } from "react"
import { vacancyFetch } from "../../store/vacancySlice"
import SearchTabs from "../searchTabs/SearchTabs"

type CityType = {
	city?: string,
}

const HomePage = ({ city }: CityType) => {
	const dispatch = useTypedDispatch();
	const { filters, currentPage } = useTypedSelector(state => state.vacancy);
	const { searchText, searchCity, searchSkills } = filters
	const skillsParams = searchSkills.join(',')
	const [_, setSearchParams] = useSearchParams();

	useEffect(() => {
		const params: Record<string, string> = {};
		if (searchText) params.text = searchText;
		if (searchSkills) params.skills = skillsParams;
		setSearchParams(params);

		dispatch(vacancyFetch({
			searchText: searchText,
			searchCity: city,
			page: currentPage - 1,
		}))
	}, [searchCity, searchText, city, currentPage, searchSkills]);

	return (
		<Box >
			<Search />
			<Divider c={'#0F0F1033'} />
			<Box className={styles.homePage}>
				<Box className={styles.mainLeftSection}>
					<Skills />
				</Box>
				<Box>
					<SearchTabs />
					<VacancyList />
				</Box>
			</Box>
		</Box>
	)
}

export default HomePage


