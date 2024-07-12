import {
  legacy_createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/auth.reducer";
import { projectReducer } from "./project/project.reducer";
import { overviewReducer } from "./overview/overview.reducer";
import { statReducer } from "./stats/stats.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectReducer,
  overviewData: overviewReducer,
  statData: statReducer,
});

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let enhanser = composer(applyMiddleware(thunk));

export const store = legacy_createStore(rootReducer, enhanser);
