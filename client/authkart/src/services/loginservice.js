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
