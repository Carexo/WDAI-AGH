import { useEffect, useState } from "react";
import { IComment } from "./Comment.types.ts";
import Comment from "./Comment.tsx";

const Comments = () => {
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/comments")
      .then((response) => response.json())
      .then((data: { comments: IComment[] }) => setComments(data.comments))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h3>Komentarze:</h3>
      <ul>
        {comments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </ul>
    </div>
  );
};

export default Comments;
