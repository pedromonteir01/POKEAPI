import { useRef } from 'react';
import styles from './uploading.module.css'

export const FileUploader = ({handleFile}) => {
    const hiddenFileInput = useRef(null); 

    const handleClick = event => {
      hiddenFileInput.current.click();
    };

    const handleChange = event => {
      const fileUploaded = event.target.files[0];
      handleFile(fileUploaded);
    };


  return(
    <>
      <button className={styles.button_upload} onClick={handleClick}>
        Upload a file
      </button>
      <input
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{display: 'none'}}
      />
    </>
  )
}
