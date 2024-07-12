import {
  OVERVIEW_ERROR,
  OVERVIEW_LOADING,
  OVERVIEW_SUCCESS,
} from "./overview.type";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;


// overview success action
export const overviewSucc = (payload) => {
  return {
    type: OVERVIEW_SUCCESS,
    payload,
  };
};

// overview error action
export const overviewError = () => {
  return {
    type: OVERVIEW_ERROR,
  };
};

// overview load action
export const overviewLoad = () => {
  return {
    type: OVERVIEW_LOADING,
  };
};
//geting overview data by api
export const getOverview = (data) => async (dispatch) => {
  dispatch(overviewLoad());
  let headers = { Authorization: `Bearer ${data.token}` };

  try {
    let res = await axios.get(`${baseUrl}/project/overview`, { headers });

    if (res.status === 200) {
      dispatch(overviewSucc(res.data.project));
      return true;
    } else {
      dispatch(overviewError());
      return false;
    }
  } catch (error) {
    dispatch(overviewError());
    return false;
  }
};
