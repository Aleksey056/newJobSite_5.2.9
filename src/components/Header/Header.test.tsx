import { render, screen } from '@testing-library/react';
import Header from './Header';
import { describe, expect, it } from 'vitest';
import { MantineProvider } from '@mantine/core';

const renderWithMantineProvider = (component: React.ReactNode) =>
	render(<MantineProvider>{component}</MantineProvider>);

describe('Header component', () => {
	it('рендерится', () => {
		renderWithMantineProvider(<Header />);
		expect(screen.getByText('.FrontEnd')).toBeInTheDocument();
		expect(screen.getByText('Вакансии FE')).toBeInTheDocument();
		expect(screen.getByText('Обо мне')).toBeInTheDocument();
	});
});
