export interface Article {
  id: string;
  title: string;
  summary: string;
  publishedDate: string;
  authors: string[];
  categories: string[];
  pdfUrl: string;
  text: string;
  /**
   * Imagenes del artículo.
   * El backend puede enviar:
   *  - string: url absoluta, data URL (data:...), o cadena base64 sin prefijo
   *  - number[]: arreglo de bytes (byte[])
   */
  images: (string | number[])[];
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
