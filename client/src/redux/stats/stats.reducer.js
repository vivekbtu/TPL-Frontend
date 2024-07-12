import { STATS_ERROR, STATS_LOADING, STATS_SUCCESS } from "./stats.type";

const bankInitalState = {
  loading: false,
  statsData: [],
  error: false,
};
//stats reducer
export const statReducer = (state = bankInitalState, action) => {
  switch (action.type) {
    case STATS_SUCCESS: {
      return {
        ...state,
        statsData: action.payload,
        loading: false,
        error: false,
      };
    }
    case STATS_ERROR: {
      return {
        ...state,
        error: true,
        statsData: [],
        loading: false,
      };
    }
    case STATS_LOADING: {
      return {
        ...state,
        loading: true,
        statsData: [],
        error: false,
      };
    }

    default: {
      return state;
    }
  }
};
