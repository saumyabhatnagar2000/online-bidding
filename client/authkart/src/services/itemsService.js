import hackathon from "./hackathon";

export const getItems = async (token) => {
  try {
    const response = await hackathon({
      url: "/items",
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const getItem = async (token) => {};

export const startAuctionApi = async (data, token) => {
  console.log(token);
  try {
    const response = await hackathon({
      url: "/start_auction",
      method: "POST",
      headers: {
        Authorization: token,
      },
      data,
    });
    return response;
  } catch (e) {
    throw new Error(e);
  }
};
