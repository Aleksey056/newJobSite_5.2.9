import { Badge, Box, Button, Text } from '@mantine/core';
import styles from './VacancyCard.module.css'
import type { WorkFormat } from '../../types/vacancy';
import { Link } from 'react-router';

const CardVacancy = ({ isVacancyList = true, ...vacancy }) => {
	const { name, alternate_url, id, salary, area, work_format, employer, experience } = vacancy

	function formatSalary(
		salary: string | { from?: number; to?: number; currency?: string } | null
	): string {
		if (!salary) return 'Уровень дохода не указан';
		if (typeof salary === 'string') return salary;
		if (salary.from && salary.to) return `${salary.from} - ${salary.to} ${salary.currency || ''}`;
		if (salary.from) return ` от ${salary.from} ${salary.currency || ''}`;
		return 'Уровень дохода не указан';
	}

	const experienceConst = typeof experience === 'string' ? experience : experience?.name || 'не указано';

	const getWorkFormatTag = (formats?: WorkFormat[]) => {
		if (!formats || formats.length === 0) return null;
		return formats.map(format => {
			if (format.id === 'ON_SITE')
				return <Badge color="rgba(15, 15, 16, 0.5)" variant="light" key="on" radius='xs' size='sm' fw={700} fz={9}>офис</Badge>;
			if (format.id === 'REMOTE')
				return <Badge color="rgba(66, 99, 235, 1)" key="remote" radius='xs' size='sm' fw={700} fz={9} className={styles.bagde}>можно удалённо</Badge>;
			if (format.id === 'HYBRID')
				return <Badge color="black" key="hybrid" radius='xs' size='sm' fw={700} fz={9} className={styles.bagde}>гибрид</Badge>;
			return null;
		});
	};

	return (
		<Box className={styles.cardVacancy}>
			<Box className={styles.head}>
				<Text className={styles.head__name}>
					{name}
				</Text>
				<Box className={styles.head__total}>
					<Text className={styles.total__salary}>
						{formatSalary(salary)}
					</Text>
					<Text className={styles.total__experience}>
						{experienceConst}
					</Text>
				</Box>
			</Box>

			<Box className={styles.info}>
				<Text className={styles.info__employer}>
					{employer?.name || 'неизвестна'}
				</Text>
				<Box>
					<Box className={styles.info__workFormat}>
						{getWorkFormatTag(work_format)}
					</Box>
					<Text className={styles.info__city}>
						Город: {area?.name || 'не указан'}
					</Text>
				</Box>
			</Box>

			<Box className={styles.buttonGroup}>
				<Link to={`/vacancies/${id}`} >
					{isVacancyList ? <Button variant="filled" size="sm" color="black" fw={400} mr={12}>Смотреть вакансию</Button> : null}
				</Link>

				<Button
					size="sm"
					variant="light"
					color='black'
					component="a"
					href={alternate_url}
					target="_blank"
					fw={400}
				>
					Откликнуться
				</Button>
			</Box>
		</Box >
	);
}

export default CardVacancy;
