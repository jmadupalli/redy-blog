export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ApiError = {
  message: string;
  status: number;
};

export type OnBoardDTO = {
  siteName: string;
  siteCaption: string;
  pageSize: number;
  showLogin: boolean;
  userDTO: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
};

export const loginUser = async (loginDTO: {
  email: string;
  password: string;
}) => {
  return await fetch(API_URL + "/auth/login", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(loginDTO),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const onBoard = async (body: OnBoardDTO) => {
  return await fetch(API_URL + "/onboard", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
