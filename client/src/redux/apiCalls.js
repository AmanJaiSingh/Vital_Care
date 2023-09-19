import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const Clogin = async (dispatch, user) => {
  dispatch(loginStart());
  // console.log("----here-----");
  try {
    const res = await publicRequest.post("/auth/Clogin", user);
    // const data = { type: "customer", ...res.data };
    dispatch(loginSuccess({ type: "customer", ...res.data }));
  } catch {
    // console.log("----here-----");
    dispatch(loginFailure());
  }
};
export const Dlogin = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/Dlogin", user);
    dispatch(loginSuccess({ type: "corporate", ...res.data }));
  } catch {
    dispatch(loginFailure());
  }
};
