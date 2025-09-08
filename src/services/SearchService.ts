import axios from "axios";
import type { ArticlesResponse } from "../models/Article";
import type { Response } from "../models/Response";

const API_URL = "http://localhost:8080/articles";

export const getArticles = async (
    page: number,
    size: number
): Promise<Response<ArticlesResponse>> => {
  try {
    const res = await axios.get(API_URL, {
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
