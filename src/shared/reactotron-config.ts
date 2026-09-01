import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Reactotron from "reactotron-react-native";
import {
  QueryClientManager,
  reactotronReactQuery,
} from "reactotron-react-query";

import { api, queryClient } from "@/api";

type TTronRequestConfig = InternalAxiosRequestConfig & {
  metadata?: { startTime: number };
};

const queryClientManager = new QueryClientManager({
  queryClient,
});

Reactotron.configure({
  name: "class-controll",
  onDisconnect: () => {
    queryClientManager.unsubscribe();
  },
})
  .use(reactotronReactQuery(queryClientManager))
  .useReactNative({
    asyncStorage: false,
    // Pretender (Mirage) owns XMLHttpRequest. Reactotron's networking plugin
    // patches it on connect and breaks mocked requests on the next app launch.
    networking: false,
  })
  .connect();

function getRequestUrl(config: InternalAxiosRequestConfig) {
  const baseURL = config.baseURL ?? "";
  const url = config.url ?? "";
  return `${baseURL}${url}`;
}

function getDuration(config: TTronRequestConfig) {
  return Date.now() - (config.metadata?.startTime ?? Date.now());
}

api.interceptors.request.use((config) => {
  (config as TTronRequestConfig).metadata = { startTime: Date.now() };
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    const config = response.config as TTronRequestConfig;
    const method = (config.method ?? "get").toUpperCase();
    const url = getRequestUrl(config);

    Reactotron.display({
      name: `${method} ${url}`,
      preview: `${response.status} · ${getDuration(config)}ms`,
      value: {
        request: {
          method,
          url,
          params: config.params,
          data: config.data,
        },
        response: {
          status: response.status,
          data: response.data,
        },
      },
    });

    return response;
  },
  (error: AxiosError) => {
    const config = (error.config ?? {}) as TTronRequestConfig;
    const method = (config.method ?? "get").toUpperCase();
    const url = getRequestUrl(config);

    Reactotron.display({
      name: `${method} ${url}`,
      preview: error.response
        ? `${error.response.status} · ${getDuration(config)}ms`
        : error.message,
      value: {
        request: {
          method,
          url,
          params: config.params,
          data: config.data,
        },
        response: error.response
          ? {
              status: error.response.status,
              data: error.response.data,
            }
          : error.message,
      },
      important: true,
    });

    return Promise.reject(error);
  },
);
