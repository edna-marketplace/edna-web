import axios from "axios";
import { parseCookies } from "nookies";

export const api = axios.create({
  baseURL: "https://edna-marketplace.shop",
});

api.interceptors.request.use(
  (config) => {
    const excludedRoutes = ["/auth", "/public"];

    const shouldExclude = excludedRoutes.some((route) =>
      config.url?.startsWith(route)
    );

    if (!shouldExclude) {
      const { "@edna:auth-token": token } = parseCookies();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
