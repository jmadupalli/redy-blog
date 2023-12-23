import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  withCredentials: true,
});

export type ApiError = {
  response: {
    data: {
      message: string;
      status: number;
    };
  };
} & AxiosError;
export const loginUser = async (loginDTO: {
  email: string;
  password: string;
}) => {
  return await axiosInstance.post<{
    firstName: string;
    lastName: string;
    expiresAt: string;
  }>(API_URL + "/auth/login", loginDTO);
};
