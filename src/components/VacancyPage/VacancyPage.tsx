import { Box } from '@mantine/core'
import styles from './VacancyPage.module.css'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux'
import { fetchVacanciById } from '../../store/vacancySlice'
import VacancyCard from '../VacancyCard/VacancyCard'

const VacancyPage = () => {
	const { id } = useParams();

	const dispatch = useTypedDispatch()
	const vacancy = useTypedSelector(state => state.vacancy.vacancyId)

	useEffect(() => {
		dispatch(fetchVacanciById(id!))
	}, [dispatch, id])

	return (
		<Box className={styles.VacancyPage}>
			<VacancyCard {...vacancy} isVacancyList={false}/>
			<Box className={styles.boxInfo}>
				<div dangerouslySetInnerHTML={{ __html: vacancy?.description || '' }} />
			</Box>
		</Box>
	)
}

export default VacancyPage