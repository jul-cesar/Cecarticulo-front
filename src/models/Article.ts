export interface Article {
  id: string;
  title: string;
  summary: string;
  publishedDate: string;
  authors: string[];
  categories: string[];
  pdfUrl: string;
  text: string;
  images: string[];
  keywords: string[];
}

interface Page {
size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };


export interface ArticlesResponse {
  content: Article[];
  page: Page;
}
