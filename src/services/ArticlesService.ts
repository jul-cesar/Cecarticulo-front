import axios from "axios";
import type { ArticlesResponse } from "../models/Article";
import type { Progress } from "../models/Progress";
import type { Response } from "../models/Response";

const API_URL = "http://localhost:8080";

export const getArticles = async (
    page: number,
    size: number
): Promise<Response<ArticlesResponse>> => {
  try {
    const res = await axios.get(`${API_URL}/articles`, {
      params: { page, size },
    });
    return {
      data: res.data,
      success: true,
      message: "Articles fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      data: { content: [], page: { size: 0, number: 0, totalElements: 0, totalPages: 0 } },
      success: false,
      message: "Error fetching articles",
    };
  }
};

export const searchArticles = async (
  query: string,
  maxResults: number
): Promise<Response<string>> => {
  try {
    const res = await axios.get(`${API_URL}/search`, {
      params: { query, maxResults },  
    });
    return {
      data: res.data,
      success: true,
      message: "Articles fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      data: "",
      success: false,
      message: "Error fetching articles",
    };
  }
};


export const getProgress = async (): Promise<Response<Progress>> => {
  try {
    const res = await axios.get(`${API_URL}/progress`);
    return {
      data: res.data,
      success: true,
      message: "Progress fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching progress:", error);
    return {
      data: { total: 0, procesados: 0, tiempoSegundos: 0 },
      success: false,
      message: "Error fetching progress",
    };
  }
};