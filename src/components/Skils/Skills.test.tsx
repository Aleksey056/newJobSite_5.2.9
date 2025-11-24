import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Skills from './Skills';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import vacancyReducer from '../../store/vacancySlice'

const store = configureStore({
	reducer: { vacancy: vacancyReducer },
});

const renderWithProvider = (component: React.ReactNode) =>
	render(
		<Provider store={store}>
			<MantineProvider>
				{component}
			</MantineProvider>
		</Provider >
	)

describe('Skills', () => {
	it('рендер компонента', () => {
		renderWithProvider(<Skills />)
		expect(screen.getByText('Ключевые навыки'))
	})

	it('Добавляем новый тег(скилл) в инпут через Enter', async () => {
		renderWithProvider(<Skills />)
		const userClick = userEvent.click
		const userAddText = userEvent.type
		const state = store.getState().vacancy.filters;

		expect(state.searchSkills).toEqual(['TypeScript', 'React', 'Redux']);

		const skillsInput = screen.getByTestId('skillsInput')
		await userAddText(skillsInput, 'HTML')

		const buttonAddSkills = screen.getByTestId('buttonAddSkills')
		await userClick(buttonAddSkills);

		const newstate = store.getState().vacancy.filters;
		expect(newstate.searchSkills).toEqual(['TypeScript', 'React', 'Redux', 'HTML']);
	});
});