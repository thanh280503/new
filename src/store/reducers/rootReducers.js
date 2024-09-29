import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import TripReducers from './TripReducers';
import CarReducers from './CarReducers';
import UserReducers from "./UserReducers";

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducers = combineReducers({
  trips: TripReducers,
  cars: CarReducers,
  users: UserReducers
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));

export const persistor = persistStore(store);
