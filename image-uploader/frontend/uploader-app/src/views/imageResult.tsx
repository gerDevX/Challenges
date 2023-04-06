import { useState } from 'react';
import {
  Button,
  FormControl,
  InputGroup,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';
import './imageResult.scss';

interface props {
  imageSrc: string;
}

function ImageResult(props: props) {
  const [showCopiedLink, setShowCopiedLink] = useState(false);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(props.imageSrc);
    setShowCopiedLink(true);
  };

  return (
    <>
      <div id="result-area">
        <div id="result-content-area">
          <CheckCircleFill color="#219653" />
          <h3>Uploaded Successfully!</h3>
          <img src={props.imageSrc} alt="Result..." />
          <InputGroup>
            <FormControl
              type="text"
              aria-describedby="btnGroupAddon"
              defaultValue={props.imageSrc}
            />
            <Button variant="primary" onClick={handleCopyLink}>
              Copy Link
            </Button>
          </InputGroup>
        </div>
      </div>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="primary"
          show={showCopiedLink}
          onClose={() => setShowCopiedLink(false)}
          delay={3000}
          autohide
        >
          <Toast.Body>Image URL copied.</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default ImageResult;
