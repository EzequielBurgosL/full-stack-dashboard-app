import axios, { AxiosResponse } from "axios";
import { TimeRange } from "../types";

const BASE_PATH = process.env.REACT_APP_BASE_PATH || 'http://localhost:3001';
const BASE_ENDPOINT = process.env.REACT_APP_BASE_ENDPOINT || 'api/articles'

export async function getDetail(id: string, timeRange: string = TimeRange.TODAY) {
  const response: AxiosResponse = await axios.get(`${BASE_PATH}/${BASE_ENDPOINT}/${timeRange}/${id}`);

  return response;
}