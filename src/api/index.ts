import axios, { AxiosResponse } from "axios";

const BASE_PATH = process.env.REACT_APP_BASE_PATH || 'http://localhost:3001';
const BASE_ENDPOINT = process.env.REACT_APP_BASE_ENDPOINT || 'api/articles'

export async function getDetail(id: string, timeRange: string = 'today') {
  const response: AxiosResponse = await axios.get(`${BASE_PATH}/${BASE_ENDPOINT}/${id}/${timeRange}`);

  return response;
}