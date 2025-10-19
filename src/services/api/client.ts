import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export default class Client {
  private api: AxiosInstance;

  constructor(baseURL: string, token?: string) {
    this.api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (token) {
      this.setToken(token);
    }

    this.api.interceptors.request.use((config) => {
      const authToken = localStorage.getItem("token");
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        const status = error.response?.status;
        if (status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }

        return Promise.reject(error);
      }
    );
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
    this.api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, body, config);
    return response.data;
  }

  async put<T>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(url, body, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(url, config);
    return response.data;
  }
}
