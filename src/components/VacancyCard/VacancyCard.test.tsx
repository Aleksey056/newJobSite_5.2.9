import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';
import VacancyCard from './VacancyCard';

const renderWithMantineProvider = (component: React.ReactNode) =>
	render(<MantineProvider>{component}</MantineProvider>);

const mockVacancy = {
	id: 1,
	name: 'React Developer',
	salary: '70000 - 150000 RUR',
	experience: 'Без опыта',
	employer: { name: 'Girby' },
	work_format: [{ id: 'REMOTE', name: 'Удалённо' }],
	area: { name: 'Москва' },
	alternate_url: 'https://google.com',
};

describe('VacancyCard', () => {
	it('Рендер вакансии, зп и компании', () => {
		renderWithMantineProvider(< VacancyCard vacancy={mockVacancy} />);
		expect(screen.getByText(/React developer/i)).toBeInTheDocument();
		expect(screen.getByText(/70000 - 150000/i)).toBeInTheDocument();
		expect(screen.getByText(/Girby/i)).toBeInTheDocument();
	});

	it('Рендер формата работы', () => {
		renderWithMantineProvider(< VacancyCard vacancy={mockVacancy} />);
		expect(screen.getByText(/удалённо/i)).toBeInTheDocument();
	});

	it('Рендер кнопки откликнуться', () => {
		renderWithMantineProvider(< VacancyCard vacancy={mockVacancy} />);
		expect(screen.getByRole('link', { name: /откликнуться/i })).toHaveAttribute(
			'href',
			mockVacancy.alternate_url
		);
	});
});
