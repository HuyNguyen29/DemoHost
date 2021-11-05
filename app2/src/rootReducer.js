import { combineReducers } from "redux";
import testReducer from "./redux/reducerTest";

const rootReducer = combineReducers({
  testReducer: testReducer,
});
export default rootReducer;
