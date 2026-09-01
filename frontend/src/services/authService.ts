import api from "../api/axios";


export interface RegisterData {
  full_name: string;
  email: string;
  password: string;
}


export const registerUser = async (
  data: RegisterData
) => {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
};


export const loginUser = async (
  email: string,
  password: string
) => {
  const formData = new URLSearchParams();

  formData.append("username", email);
  formData.append("password", password);

  const response = await api.post(
    "/auth/login",
    formData,
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};


export const getCurrentUser = async () => {
  const response = await api.get(
    "/users/me"
  );

  return response.data;
};