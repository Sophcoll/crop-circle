// STYLE SHEET
import './CommentForm.scss';

const CommentForm = ({ handleSubmit, setNewComment, newComment }) => {

  //----------------------------------------------------------------------
  return (
    <form onSubmit={handleSubmit} className='add-comment-form'>
      <textarea
        placeholder='Write your comment here'
        className='add-comment-form__input'
        onChange={(event) => setNewComment(event.target.value)}
        name='comment'
        id='comment'
        value={newComment}
      />
      <button className='add-comment-form__button' type='submit'>
        Leave comment
      </button>
    </form>
  );
};

export default CommentForm;
