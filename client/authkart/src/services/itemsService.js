import hackathon from "./hackathon";

export const getItems = async (authData) => {
  try {
    const response = await hackathon.get({});
    return response;
  } catch (e) {
    throw new Error(e);
  }
};
