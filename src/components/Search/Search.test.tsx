import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import vacancyReducer from '../../store/vacancySlice';
import Search from './Search';
import { describe, expect, it } from 'vitest';
import { MantineProvider } from '@mantine/core';
import userEvent from '@testing-library/user-event';

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

describe('Search component', () => {
	it('рендер компонента', () => {
		renderWithProvider(<Search />)
		expect(screen.getByText(/Список вакансий/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/Должность или название компании/i)).toBeInTheDocument();
	});

	it('изменение searchText в store при изменение в компоненте Search', async () => {
		renderWithProvider(<Search />);

		const userClick = userEvent.click
		const userAddText = userEvent.type

		const searchInput = screen.getByTestId('searchInput')
		await userClick(searchInput)
		await userAddText(searchInput, 'React')
		expect(searchInput).toHaveValue('React');

		const button = screen.getByTestId('button')
		await userClick(button);

		const state = store.getState().vacancy.filters;
		expect(state.searchText).toBe('React');
	});
});
