import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { setCurrentPage, vacancyFetch } from '../../store/vacancySlice';
import { Box, Loader, Pagination, Text } from '@mantine/core';
import CardVacancy from '../VacancyCard/VacancyCard';
import type { Vacancy } from '../../types/vacancy'
import styles from './VacancyList.module.css'
import { useSearchParams } from 'react-router';

const VacancyList = () => {

	const { items, status, error, totalPages, currentPage } = useTypedSelector(state => state.vacancy);
	const [searchParams, setSearchParams] = useSearchParams();
	const pageParams = Number(searchParams.get('page') || 1);

	const onPageChange = (page: any) => {
		setSearchParams({ page: page })
	};

	return (
		<Box className={styles.moduleVacancyList}>
			{status === 'loading' && <Loader color='cyan' size="xl" type="dots" w={659} />}
			{status === 'failed' && <Text>{error}</Text>}
			{status === 'succeeded' && items.length === 0 && <Text>Вакансии не найдены</Text>}
			{status === 'succeeded' &&
				items.map((vacancy: Vacancy) => (
					<CardVacancy key={vacancy.id} {...vacancy} isVacancyList={true} />
				))
			}
			{status === 'succeeded' && totalPages > 1 && (
				<Pagination
					total={totalPages}
					value={pageParams}
					onChange={onPageChange}
					mt="md"
					withEdges
					siblings={1}
					boundaries={1}
				/>
			)}
		</Box>
	);
};

export default VacancyList;
