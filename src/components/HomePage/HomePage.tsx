import { Box, Divider } from "@mantine/core"
import Search from "../Search/Search"
import Skills from "../Skils/Skills"
import VacancyList from "../VacancyList/VacancyList"
import styles from './HomePage.module.css'
import { useSearchParams } from 'react-router'
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux"
import { useEffect } from "react"
import { setFilters, setCurrentPage, vacancyFetch } from "../../store/vacancySlice"
import SearchTabs from "../searchTabs/SearchTabs"

type CityType = {
	city?: string,
}

const HomePage = ({ city }: CityType) => {
	const dispatch = useTypedDispatch();
	const { filters, currentPage } = useTypedSelector(state => state.vacancy);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const searchTextParams = searchParams.get('text') || '';
		const pageParams = Number(searchParams.get('page') || 1);
		if (searchTextParams !== filters.searchText || '') dispatch(setFilters(searchTextParams));
		if (city !== filters.searchCity || '') dispatch(setFilters(city || ''));
		if (pageParams !== currentPage || '') dispatch(setCurrentPage(pageParams));

		dispatch(vacancyFetch({
			searchText: searchTextParams,
			searchCity: city,
			page: currentPage - 1,
		}))
	}, [searchParams, city]);


	// useEffect(() => {
	// 	const params: Record<string, string> = {};
	// 	if (filters.searchText) params.text = filters.searchText;
	// 	if (filters.searchCity) params.area = filters.searchCity;
	// 	setSearchParams(params);
	// }, [filters.searchCity, filters.searchText]);



	// const updateURL = (updates: { searchText?: string; city?: string | null; page?: number }) => {
	// 	const params = new URLSearchParams(searchParams)
	// 	if (updates.searchText !== undefined) {
	// 		if (updates.searchText) {
	// 			params.set("search", updates.searchText);
	// 		} else { params.delete("search"); }
	// 		params.delete("page");
	// 	}
	// 	if (updates.city !== undefined) {
	// 		if (updates.city) {
	// 			params.set("city", updates.city);
	// 		} else { params.delete("city"); }
	// 		params.delete("page");
	// 	}
	// 	if (updates.page !== undefined) {
	// 		if (updates.page > 1) {
	// 			params.set("page", String(updates.page))
	// 		} else { params.delete("page") }
	// 	}
	// 	setSearchParams(params);
	// }

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


