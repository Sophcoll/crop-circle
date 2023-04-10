// COMPONENTS
import Comments from './Comments';
import CommentForm from './CommentsForm';

// STYLE SHEET
import './CommentSection.scss';


const CommentSection = ({
  commentsArray,
  handleCommentDelete,
  newComment,
  setNewComment,
  handleSubmit,
}) => {

  return (
    <div className='comments'>
      <header className='comments-header'>
        <div className='comments-header__title'>
          <h1>Comments</h1>
        </div>
      </header>
      <main className='comments-body'>
        <ul className='comments-body__list'>
          <Comments
            commentsArray={commentsArray}
            handleCommentDelete={handleCommentDelete}
          />
        </ul>
      </main>

      <footer className='comments-footer'>
        < CommentForm handleSubmit={handleSubmit} setNewComment={setNewComment} newComment={newComment}/>
      </footer>
    </div>
  );
};

export default CommentSection;
