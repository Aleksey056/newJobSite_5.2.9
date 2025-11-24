import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CitySelect from './CitySelect';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import vacancyReducer from '../../store/vacancySlice';
import userEvent from '@testing-library/user-event';

const store = configureStore({
	reducer: { vacancy: vacancyReducer },
});

const renderWithProvider = (component: React.ReactNode) =>
	render(
		<Provider store={store}>
			<MantineProvider>
				{component}
			</MantineProvider>;
		</Provider >
	)

describe('CitySelect component', () => {
	it('рендер компонента со списком', () => {
		renderWithProvider(<CitySelect />)
		expect(screen.getByPlaceholderText(/выберете вариант/i)).toBeInTheDocument();
		expect(screen.getByText(/Все города/i)).toBeInTheDocument();
		expect(screen.getByText(/Москва/i)).toBeInTheDocument();
		expect(screen.getByText(/Оренбург/i)).toBeInTheDocument();
	});

	it('изменение searchCity в store при изменение в компоненте CitySelect', async () => {
		renderWithProvider(<CitySelect />);

		const userClick = userEvent.click
	
		const resultSelectInput = screen.getByTestId('citySelectInput');
		expect(resultSelectInput).toHaveValue('Все города');

		const cityMoscow = screen.getByText('Москва');
		await userClick(cityMoscow);
		expect(resultSelectInput).toHaveValue('Москва');
		const state = store.getState().vacancy.filters;
		expect(state.searchCity).toBe('1');

		const cityOrenburg = screen.getByText('Оренбург');
		await userClick(cityOrenburg);
		expect(resultSelectInput).toHaveValue('Оренбург');
		const newState = store.getState().vacancy.filters;
		expect(newState.searchCity).toBe('70');
	});
});
