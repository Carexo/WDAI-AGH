import { Article } from "../utils/Blog.types.ts";
import { Link } from "react-router";

const ArticleItem = ({ id, title }: Article) => {
  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
      <h3 className="text-xl font-semibold">
        <Link to={`/article/${id}`} className="text-blue-500 hover:underline">
          {title}
        </Link>
      </h3>
    </div>
  );
};

export default ArticleItem;
