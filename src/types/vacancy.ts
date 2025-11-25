export type WorkFormat = {
	id: string | number;
	name: string;
}

export type Vacancy = {
	id: string | number;
	name: string;
	salary: | string | { from?: number; to?: number; currency?: string } | null;
	experience?: string | { name: string } | null;
	employer?: { name: string; } | null;
	work_format?: WorkFormat[];
	area?: { name: string; } | null;
	alternate_url: string;
	description?: string,
	vacancy: string[],
}

export type vacancyFetchType = {
	searchText?: string,
	searchCity?: string,
	searchSkills?: string[];
	page: number,
}

export type initialStateType = {
	items: [],
	status: string,
	error: null | string,
	totalPages: number,
	currentPage: number,
	vacancyId: Vacancy | null,
	filters: {
		searchText: string,
		searchCity: string,
		searchSkills: string[];
	}
}

export type CityType = {
	city?: string,
}