// STYLE SHEET
import './AddListingForm.scss';

const ImageUpload = ({ fileChangeHandler, image, imagePreview }) => {
  return (
    <div className='image-upload'>
      {/* upload image section */}
      <label htmlFor='image'> Upload Image</label>
      <input
        onInput={(event) => fileChangeHandler(event)}
        type='file'
        name='image'
        id='image'
        accept='.jpeg, .png, .jpg'
      />
      {/* conditional rendering of image thumbnail */}
      {image ? (
        <div className='image-thumbnail'>
          <img src={imagePreview} alt='user image of produce' />
        </div>
      ) : null}
    </div>
  );
};

export default ImageUpload;
