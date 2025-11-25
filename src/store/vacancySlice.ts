import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { vacancyFetchType, initialStateType } from '../types/vacancy'

export const vacancyFetch = createAsyncThunk(
	'vacancy/vacancyFetch',
	async ({ searchText = '', searchCity = '', page }: vacancyFetchType, { rejectWithValue }) => { // 
		try {
			const param = new URLSearchParams({
				industry: '7', professional_role: '96', per_page: '10',
			})
			if (searchText) param.append('text', searchText)
			if (searchCity && searchCity !== '') param.append('area', searchCity)
			if (page !== undefined) param.append('page', page.toString())
			const url = `https://api.hh.ru/vacancies?${param.toString()}`
			const response = await fetch(url);
			if (!response.ok) throw new Error('Ошибка при получении данных с HH')
			const data = await response.json();
			return data;
		}
		catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const fetchVacanciById = createAsyncThunk(
	'vacancy/fetchVacanciById',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await fetch(`https://api.hh.ru/vacancies/${id}`)
			if (!response.ok) throw new Error("Ошибка при получении данных c HH");
			const data = await response.json()
			const result = {
				...data,
				snippet: {
					requirement: data.snippet?.requirement || data.description || 'Не указано',
					responsibility: data.snippet?.responsibility || data.description || 'Не указано',
				},
			}
			return result;
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

const initialState: initialStateType = {
	items: [],
	status: 'idle',
	error: null,
	totalPages: 0,
	currentPage: 1,
	vacancyId: null,
	filters: {
		searchText: '',
		searchCity: '',
		searchSkills: ['TypeScript', 'React', 'Redux'],
	}
}

const vacancySlice = createSlice({
	name: 'vacancy',
	initialState,
	reducers: {
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setFilters(state, action) {
			state.filters = { ...state.filters, ...action.payload }
			state.currentPage = 1
		},
	},
	extraReducers: (builder) => {
		builder.addCase(vacancyFetch.pending, (state) => {
			state.status = 'loading'
			state.error = null
		})
		builder.addCase(vacancyFetch.fulfilled, (state, action) => {
			state.items = action.payload.items
			state.totalPages = action.payload.pages
			state.status = 'succeeded'
		})
		builder.addCase(vacancyFetch.rejected, (state, action) => {
			state.status = 'failed'
			state.error = action.error.message || 'Ошибка в запросе данных с сервера'
		})
		builder.addCase(fetchVacanciById.fulfilled, (state, action) => {
			state.vacancyId = action.payload
		})
	}
})

export const { setFilters, setCurrentPage } = vacancySlice.actions
export default vacancySlice.reducer