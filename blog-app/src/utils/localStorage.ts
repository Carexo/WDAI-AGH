import { Article, ArticlePayload } from "./Blog.types.ts";

export const getArticles = (): Article[] => {
  const articles = localStorage.getItem("articles");
  return articles ? JSON.parse(articles) : ([] as Article[]);
};

export const saveArticle = (article: ArticlePayload) => {
  localStorage.setItem(
    "articles",
    JSON.stringify([...getArticles(), { id: crypto.randomUUID(), ...article }]),
  );
};

export const getArticle = (id: string | undefined): Article | null => {
  if (!id) return null;

  return getArticles().find((article) => article.id === id) || null;
};
