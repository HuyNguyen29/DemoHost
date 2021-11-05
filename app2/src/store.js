import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

let middlewares = [];
const sagaMiddleware = createSagaMiddleware();
middlewares = [sagaMiddleware];
const middleware = applyMiddleware(...middlewares);

function configureStore() {
  return createStore(rootReducer, middleware);
}

const store = configureStore();
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
