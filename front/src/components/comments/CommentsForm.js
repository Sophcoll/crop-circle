// STYLE SHEET
import './CommentForm.scss';

const CommentForm = ({ handleSubmit, setNewComment, newComment }) => {
  //----------------------------------------------------------------------
  // GLOBAL VARIABLE

  const placeholderMessage = 'Write your comment here';

  //----------------------------------------------------------------------
  return (
    <form onSubmit={handleSubmit} className='add-comment-form'>
      <textarea
        className='add-comment-form__input'
        onChange={(event) => setNewComment(event.target.value)}
        name='comment'
        id='comment'
        value={newComment}
        placeholder={placeholderMessage}
      />
      <button className='add-comment-form__button' type='submit'>
        Leave comment
      </button>
    </form>
  );
};

export default CommentForm;
