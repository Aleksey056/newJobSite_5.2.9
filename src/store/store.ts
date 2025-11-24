import { configureStore } from '@reduxjs/toolkit';
import vacancyReducer from './vacancySlice';

export const store = configureStore({
	reducer: {
		vacancy: vacancyReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;