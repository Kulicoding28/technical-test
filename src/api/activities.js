import axios from "axios";
import { BASE_URL, EMAIL } from "./config";

export const getAllActivities = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `${BASE_URL}/activity-groups?email=${EMAIL}`,
    });
    return res.data;
  } catch (error) {
    console.log("error getAllActivities", error);
    return error;
  }
};

export const createNewActivity = async () => {
  try {
    const res = await axios({
      method: "post",
      url: `${BASE_URL}/activity-groups`,
      data: {
        title: "New Activity",
        email: EMAIL,
      },
    });
    return res.data;
  } catch (error) {
    console.log("error createNewActivity", error);
    return error;
  }
};

export const getActivityById = async (id) => {
  try {
    const res = await axios({
      method: "get",
      url: `${BASE_URL}/activity-groups/${id}`,
    });
    return res.data;
  } catch (error) {
    console.log("error getActivityById", error);
    return error;
  }
};

export const updateActivityById = async ({ id, title }) => {
  try {
    const res = await axios({
      method: "get",
      url: `${BASE_URL}/activity-groups/${id}`,
      data: {
        title,
      },
    });
    return res.data;
  } catch (error) {
    console.log("error getActivityById", error);
    return error;
  }
};

export const deleteActivityById = async (id) => {
  try {
    const res = await axios({
      method: "get",
      url: `${BASE_URL}/activity-groups/${id}`,
    });
    return true;
  } catch (error) {
    console.log("error getActivityById", error);
    return error;
  }
};
