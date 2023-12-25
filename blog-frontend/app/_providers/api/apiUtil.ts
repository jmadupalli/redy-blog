export const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
