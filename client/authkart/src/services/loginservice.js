import { AxiosHeaders } from "axios";
import hackathon from "./hackathon";

export const loginUser = async (email, password) => {
  try {
    const config = {
      url: "/user/login",
    };

    const response = await hackathon({
      url: config.url,
      method: "POST",
      data: { email, password },
    });
    return response;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const signOut = async (token) => {
  try {
    const response = await hackathon({
      url: "/user/logout",
      method: "POST",
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (e) {
    throw new Error(e);
  }
};
