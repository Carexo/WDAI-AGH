import { IComment } from "./Comment.types.ts";
import { useState } from "react";
import styles from "./Comment.module.css";

const Comment = ({ id, body, postId, likes, user }: IComment) => {
  const [likesNumber, setLikesNumber] = useState(likes);

  const decreaseLike = () => {
    setLikesNumber((prevLikes) => {
      if (prevLikes === 0) {
        return 0;
      }

      return prevLikes - 1;
    });
  };

  const increaseLike = () => {
    setLikesNumber((prevLikes) => prevLikes + 1);
  };

  return (
    <div className={styles.post}>
      <h3>
        #{id} Komentarz - {postId}
      </h3>
      <p>
        #{user.id} - {user.fullName} ({user.username})
      </p>
      <p>{body}</p>
      <p>Likes: {likesNumber}</p>
      <div className={styles.buttons}>
        <button onClick={increaseLike}>Like</button>
        <button onClick={decreaseLike} disabled={likesNumber === 0}>
          Dislike
        </button>
      </div>
    </div>
  );
};

export default Comment;
