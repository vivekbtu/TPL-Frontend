import axios from "axios";
import { STATS_ERROR, STATS_LOADING, STATS_SUCCESS } from "./stats.type";

const baseUrl = process.env.REACT_APP_BASE_URL;
//stats success action
export const statsSucc = (payload) => {
  return {
    type: STATS_SUCCESS,
    payload,
  };
};
// stats error action
export const statsError = () => {
  return {
    type: STATS_ERROR,
  };
};
// stats load action
export const statsLoad = () => {
  return {
    type: STATS_LOADING,
  };
};
// geting stat data
export const getStats = (data) => async (dispatch) => {
  dispatch(statsLoad());
  let headers = { Authorization: `Bearer ${data.token}` };

  try {
    let res = await axios.get(`${baseUrl}/project/status`, { headers });
    if (res.status === 200) {
      dispatch(statsSucc(res.data.project));
      return true;
    } else {
      dispatch(statsError());
      return false;
    }
  } catch (error) {
    dispatch(statsError());
    return false;
  }
};
