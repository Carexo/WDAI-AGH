import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getArticle } from "../../../utils/localStorage.ts";
import { Article } from "../../../utils/Blog.types.ts";

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    setArticle(getArticle(id));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      {article ? (
        <>
          <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
          <p className="text-gray-700 leading-relaxed">{article.content}</p>
        </>
      ) : (
        <h2 className="text-2xl font-semibold text-red-500">
          Article not found
        </h2>
      )}
    </div>
  );
};

export default ArticlePage;
