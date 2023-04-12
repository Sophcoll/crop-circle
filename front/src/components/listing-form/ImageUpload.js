// COMPONENTS
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

// STYLE SHEET
import './ListingForm.scss';

const ImageUpload = ({
  fileChangeHandler,
  image,
  imagePreview,
  emptyFields,
}) => {
  return (
    <div
      className={
        emptyFields && emptyFields.includes('image')
          ? 'image-upload error'
          : 'image-upload'
      }
    >
      {/* Conditionally render a preview image / thumbnail if an image has been chosen */}
      {image ? (
        <div className='image-thumbnail'>
          <figure className='image-thumbnail__img'>
            {imagePreview ? (
              <img src={imagePreview} alt='user image of produce' />
            ) : (
              <img src={image} alt='user image of produce' />
            )}
          </figure>

          <div className='image-thumbnail__input-wrapper'>
            <AddAPhotoOutlinedIcon className='image-thumbnail__icon' />
            <p>Change photo</p>
            <input
              onInput={(event) => fileChangeHandler(event)}
              type='file'
              name='image'
              id='image'
              accept='.jpeg, .png, .jpg'
            />
          </div>
        </div>
      ) : (
        <div className='image-upload__inner-wrapper'>
          <label htmlFor='image'> Upload Image</label>
          <div className='image-upload__input-wrapper'>
            <AddAPhotoOutlinedIcon className='image-upload__icon' />
            <input
              className='image-upload__input'
              onInput={(event) => fileChangeHandler(event)}
              type='file'
              name='image'
              id='image'
              accept='.jpeg, .png, .jpg'
            />
          </div>
          <p>Click the camera icon to upload an image</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
