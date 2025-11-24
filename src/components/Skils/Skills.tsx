import { Box, Button, Group, Pill, PillsInput, Text, TextInput } from '@mantine/core';
import styles from './Skills.module.css';
import { setFilters } from '../../store/vacancySlice';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { useState } from 'react';


const Skills = () => {
	const dispatch = useTypedDispatch()
	const { filters } = useTypedSelector(state => state.vacancy)
	const searchSkills = filters.searchSkills
	const [inputValue, setInputValue] = useState('');

	const setSearchSkills = (skills: string[]) => {
		dispatch(setFilters({ searchSkills: skills }))
	}

	const addSkills = () => {
		if (inputValue.trim() && !searchSkills.includes(inputValue.trim())) {
			setSearchSkills([...filters.searchSkills, inputValue.trim()]);
			setInputValue('');
		}
	}

	const removeSkills = (skill: string) => {
		setSearchSkills(searchSkills.filter(s => s !== skill));
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			addSkills();
		}
	};

	return (
		<Box className={styles.moduleSkils}>
			<Text className={styles.title}>Ключевые навыки</Text>
			<Group gap={8}>
				<TextInput
					radius="md"
					w={215}
					size="xs"
					placeholder="Навык"
					value={inputValue}
					onChange={(e) => setInputValue(e.currentTarget.value)}
					onKeyDown={handleKeyDown}
					data-testid='skillsInput'>
				</TextInput>
				<Button onClick={addSkills} className={styles.button} data-testid='buttonAddSkills' />
			</Group>

			<PillsInput variant="unstyled" >
				{searchSkills.map((skill) => (
					<Pill
						style={{ marginRight: 4, marginBottom: 6 }}
						key={skill}
						size='md'
						fz={12}
						fw={400}
						ff={'Open Sans'}
						withRemoveButton
						onRemove={() => removeSkills(skill)}
					>
						{skill}
					</Pill>
				))}
			</PillsInput>
		</Box>
	)
}

export default Skills;
