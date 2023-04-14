// HOOKS
import { useAuthContext } from '../../hooks/useAuthContext';

// COMPONENTS
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

// STYLE SHEET
import './Comments.scss';

const Comments = ({ commentsArray, handleCommentDelete }) => {
  //----------------------------------------------------------------------
  // USE CONTEXT

  const { user } = useAuthContext();

  //----------------------------------------------------------------------
  return (
    <>
      {commentsArray &&
        commentsArray.map((comment) => {
          return (
            <li key={comment._id} className='comment'>
              <div className='comment-header'>
                <p className='comment-header__author'>
                  {comment.author.firstName}
                </p>
                <p className='comment-header__created-at'>
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className='comment-main'>
                <p className='comment-main__message'>{comment.message}</p>
              </div>
              <button
                onClick={() => handleCommentDelete(comment._id)}
                className={
                  user.userId === comment.author._id
                    ? 'comment-main__delete-btn'
                    : 'hide'
                }
              >
                Delete Comment
              </button>
            </li>
          );
        })}
    </>
  );
};

export default Comments;
