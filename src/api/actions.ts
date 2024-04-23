import axios, { AxiosError } from "axios";

// URL for API call
const API_URL = "https://scaling-space-waffle-g4q96rggg656hwgv7-3000.app.github.dev/api";

// Calls API and stores results in variables, catches and returns any errors
export const getUserData = async (user: string): Promise<SocialMediaData> => {
  return new Promise<SocialMediaData>((resolve, reject) => {
    axios
      .get(`${API_URL}/userdata/${user}`)
      .then((res) => {
        resolve({
          username: user,
          pfp: res.data.pfp,
          followercount: res.data.followercount,
          followingcount: res.data.followingcount,
          postsnum: res.data.postsnum
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("User not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};
