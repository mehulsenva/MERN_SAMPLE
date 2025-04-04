import axios, {AxiosRequestConfig} from 'axios';

const BASE_URL = 'https://mern-sample-api-mu.vercel.app';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ApiRequestParams {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

export const apiRequest = async ({
  endpoint,
  method = 'GET',
  body,
  headers = {},
  params = {},
}: ApiRequestParams): Promise<any> => {
  try {
    const response = await axiosInstance({
      url: endpoint,
      method,
      data: method !== 'GET' ? body : undefined,
      params: method === 'GET' ? params : undefined,
      headers,
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data) {
        return error.response.data;
      }

      return {success: false, message: error.message || 'Something went wrong'};
    }

    return {success: false, message: 'Unexpected error occurred'};
  }
};
