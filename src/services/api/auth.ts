import api from "./api";
import Util from "../../utils/utils";

type LoginPayload = {
  eposta: string;
  password: string;
};

type RegisterPayload = {
  fullName: string;
  eposta: string;
  password: string;
};

class AuthService {
  async login(payload: LoginPayload) {
    const res = await api.post("/users/login", payload);
    const token = res.data?.data?.accessToken;
    if (token) Util.setToken(token);
    return res.data;
  }
  async register(payload: RegisterPayload) {
    const res = await api.post("/users/register", payload);
    const token = res.data?.data?.accessToken;
    if (token) Util.setToken(token);
    return res.data;
  }
}
export default AuthService;
