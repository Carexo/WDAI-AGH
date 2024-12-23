export interface ArticlePayload {
  title: string;
  content: string;
}

export interface Article extends ArticlePayload {
  id: string;
}
