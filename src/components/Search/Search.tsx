import { Box, Text, TextInput, Button, Image } from '@mantine/core';
import styles from './Search.module.css';
import { useState } from 'react';
import { useTypedDispatch } from '../../hooks/redux';
import { setFilters } from '../../store/vacancySlice';
import iconSearch from '../../assets/search.svg'
import { useSearchParams } from 'react-router';

const Search = () => {
	const dispatch = useTypedDispatch()
	const [searchParams,] = useSearchParams();
	const searchText = searchParams.get('text') || '';
	const [text, setText] = useState(searchText)
	
	const setSearchText = (text: string) => dispatch(setFilters({ searchText: text }))

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') setSearchText(text);
	};

	return (
		<Box className={styles.section1}>
			<Box className={styles.section1__title}>
				<Text className={styles.section1__text1}>Список вакансий</Text>
				<Text className={styles.section1__text2}> по профессии Frontend-разработчик</Text>
			</Box>
			<Box className={styles.section1__search}>
				<TextInput
					radius='md'
					placeholder='Должность или название компании'
					value={text}
					onChange={(e) => setText(e.target.value)}
					className={styles.search__input}
					onKeyDown={handleKeyDown}
					data-testid='searchInput'
					leftSection={<Image src={iconSearch} className={styles.iconSearch} alt='iconSearch' />}
				/>
				<Button type='submit' onClick={() => setSearchText(text)} className={styles.section1__button} data-testid='button'>
					Найти
				</Button>
			</Box>
		</Box >
	)
};

export default Search;
