import { getArticles } from "../utils/localStorage.ts";
import ArticleItem from "./ArticleItem.tsx";

const Articles = () => {
  const articles = getArticles();

  return (
    <div className="flex flex-col gap-5">
      {articles.map((article) => (
        <ArticleItem key={article.id} {...article} />
      ))}
    </div>
  );
};

export default Articles;
