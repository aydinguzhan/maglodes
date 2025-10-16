class Utils {
  setToken = (token: string) => {
    localStorage.setItem("accessToken", token);
  };

  getToken = (): string | null => {
    return localStorage.getItem("accessToken");
  };

  removeToken = () => {
    localStorage.removeItem("accessToken");
  };
}

export default new Utils();
