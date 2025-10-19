import api from "./api";
import util from "../../utils/utils";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from "../../utils/types";

class AuthService {
  async login(
    payload: LoginPayload,
    successFunction?: (data: LoginResponse) => void
  ) {
    const response = await api.post("/users/login", payload);
    const token = response.data?.data?.accessToken;
    if (token) {
      util.setToken(token);
      if (successFunction) successFunction(response?.data?.data);
    }

    return response.data;
  }
  async register(payload: RegisterPayload, successFunction?: () => void) {
    const response = await api.post("/users/register", payload);
    const token = response.data?.data?.accessToken;

    if (token) {
      util.setToken(token);
      if (successFunction) successFunction();
    }
    return response.data;
  }

  async logout() {
    const token = util.getToken();
    if (token) util.removeToken();
  }
}
export default new AuthService();
