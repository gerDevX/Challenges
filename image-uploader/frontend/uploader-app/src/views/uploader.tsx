import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Alert, ProgressBar } from 'react-bootstrap';
import './uploader.scss';
import ImageUploader from '../assets/imgs/image.svg';
import { isProduction } from '../utilitaries';

interface props {
  resultStatus: (result: boolean) => void;
  resultMessage: (result: string) => void;
}

function Uploader(result: props) {
  const fileInput = useRef<any>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [fileSize, setFileSize] = useState(0);
  const [message, setMessage] = useState('');

  const triggerProgress = (total: number) => {
    const chunk = total / 20;
    const chunkPercent = (chunk / total) * 100;
    let currentPercent = uploadPercent;
    if (currentPercent < 100) {
      currentPercent += chunkPercent;
      setUploadPercent(currentPercent);
    }
  };

  const uploadFile = (target: any) => {
    const baseURL =
      (isProduction() ? 'https://jkj5mw.deta.dev' : 'http://localhost:8080') +
      '/upload';

    const formData = new FormData();
    formData.append('file', target.files[0]);

    setShowLoader(true);
    setFileSize(target.files[0].size);
    axios
      .post(baseURL, formData, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
      .then((res) => {
        const data = res.data;
        if (data) {
          if (data.error) {
            setShowWarning(true);
            setShowLoader(false);
            setMessage(data.message);
          } else {
            setShowWarning(false);
            result.resultMessage(data.url);
            result.resultStatus(true);
          }
        }
      })
      .catch((ex) => {
        setShowWarning(true);
        setShowLoader(false);
        setMessage(ex.message);
      });
  };
  const handleClick = () => {
    fileInput.current.click();
  };
  const handleFileUpload = (event: any) => {
    setShowLoader(true);
    uploadFile(event.target);
  };
  const handleOnDragOver = (event: any) => {
    event.preventDefault();
  };
  const handleOnDrop = (event: any) => {
    //prevent the browser from opening the image
    event.preventDefault();
    event.stopPropagation();
    uploadFile(event.dataTransfer);
  };

  useEffect(() => {
    if (showLoader && uploadPercent < 100) {
      setTimeout(() => {
        triggerProgress(fileSize);
      }, 200);
    }
  });

  return (
    <>
      {!showLoader && (
        <div id="uploader">
          {showWarning && (
            <Alert
              variant="warning"
              onClose={() => setShowWarning(false)}
              dismissible
            >
              <Alert.Heading>Warning!</Alert.Heading>
              <p>{message}</p>
            </Alert>
          )}
          <div id="content-area">
            <h3>Upload your image</h3>
            <p>File should be Jpeg, Png,...</p>
            <div
              id="dragAndDrop-area"
              onDragOver={handleOnDragOver}
              onDrop={handleOnDrop}
            >
              <img src={ImageUploader} alt="Upload..." />
              <p>Drag & Drop your image here</p>
            </div>
            <p id="divisor">Or</p>
            <button className="button" onClick={handleClick}>
              Choose a File
            </button>
            <input
              onChange={handleFileUpload}
              ref={fileInput}
              type="file"
              hidden
            />
          </div>
        </div>
      )}
      {showLoader && (
        <div id="loader-area">
          <div id="loader-elem">
            <h3>Uploading...</h3>
            <ProgressBar now={uploadPercent} />
          </div>
        </div>
      )}
    </>
  );
}

export default Uploader;
