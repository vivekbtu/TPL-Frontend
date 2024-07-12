import {
  OVERVIEW_ERROR,
  OVERVIEW_LOADING,
  OVERVIEW_SUCCESS,
} from "./overview.type";

const cusInitalState = {
  loading: false,
  overviewData: {},
  error: false,
};

// overview reducer
export const overviewReducer = (state = cusInitalState, action) => {
  switch (action.type) {
    case OVERVIEW_SUCCESS: {
      return {
        ...state,
        overviewData: action.payload,
        loading: false,
        error: false,
      };
    }
    case OVERVIEW_ERROR: {
      return {
        ...state,
        error: true,
        overviewData: {},
        loading: false,
      };
    }
    case OVERVIEW_LOADING: {
      return {
        ...state,
        loading: true,
        overviewData: {},
        error: false,
      };
    }

    default: {
      return state;
    }
  }
};
