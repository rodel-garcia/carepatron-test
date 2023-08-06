import axios, { AxiosRequestConfig, Method } from 'axios';

const API_URL = 'http://localhost:5044';

const apiClient = {
	get: async <T>(uri: string): Promise<T> =>
		axios
			.get<T>(`${API_URL}/${uri}`)
			.then((response) => response.data)
			.catch((error) => {
				throw new Error(error.response);
			}),
	post: async <T>(uri: string, data: any, onUploadProgress?: (progressEvent: any) => void): Promise<T> =>
		axios
			.post<T>(`${API_URL}/${uri}`, data, { onUploadProgress })
			.then((response) => response.data)
			.catch((error) => {
				throw new Error(error.response);
			}),
	put: async <T>(uri: string, data: any): Promise<T> =>
		axios
			.put<T>(`${API_URL}/${uri}`, data)
			.then((response) => response.data)
			.catch((error) => {
				throw new Error(error.response);
			}),
	patch: async <T>(uri: string, data: any): Promise<T> =>
		axios
			.patch<T>(`${API_URL}/${uri}`, data)
			.then((response) => response.data)
			.catch((error) => {
				throw new Error(error.response);
			}),
	delete: async <T>(uri: string): Promise<T> =>
		axios
			.delete<T>(`${API_URL}/${uri}`)
			.then((response) => response.data)
			.catch((error) => {
				throw new Error(error.response);
			}),
};

export default apiClient;
