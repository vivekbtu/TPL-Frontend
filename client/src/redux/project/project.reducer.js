import {
  PROJECT_ERROR,
  PROJECT_LOADING,
  PROJECT_SUCCESS,
} from "./project.type";

const accInitalState = {
  loading: false,
  projects: [],
  total: 1,
  error: false,
};
//project reducer
export const projectReducer = (state = accInitalState, action) => {
  switch (action.type) {
    case PROJECT_SUCCESS: {
      return {
        ...state,
        projects: action.payload.result,
        total: action.payload.total,
        loading: false,
        error: false,
      };
    }
    case PROJECT_ERROR: {
      return {
        ...state,
        error: true,
        projects: [],
        total: 1,
        loading: false,
      };
    }
    case PROJECT_LOADING: {
      return {
        ...state,
        loading: true,
        projects: [],
        total: 1,
        error: false,
      };
    }

    default: {
      return state;
    }
  }
};
