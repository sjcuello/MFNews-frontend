import { combineReducers, configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articles';
import itemDrawerReducer from './itemDrawer';
import drawerReducer from './drawer';
import articleSelectedReducer from './articleSelected';

const rootReducer = combineReducers({
  articles: articlesReducer,
  itemDrawer: itemDrawerReducer,
  drawer: drawerReducer,
  articleSelected: articleSelectedReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
