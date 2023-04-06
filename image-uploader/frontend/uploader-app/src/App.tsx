import { useState } from 'react';
import './App.scss';
import ImageResult from './views/imageResult';
import Uploader from './views/uploader';

function App() {
  const [isSuccess, setIsSucess] = useState<boolean | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);

  return (
    <div className="App">
      {isSuccess === undefined && (
        <Uploader resultStatus={setIsSucess} resultMessage={setMessage} />
      )}
      {isSuccess === true && message && message.length > 0 && (
        <ImageResult imageSrc={message} />
      )}
      <div id="footer">
        <label>
          created by{' '}
          <a
            href="https://github.com/gDevCR/Challenges/tree/main/image-uploader"
            rel="noreferrer"
            target="_blank"
          >
            gDevCR
          </a>
          -
          <a href="https://devchallenges.io" rel="noreferrer" target="_blank">
            devChallenges.io
          </a>
        </label>
      </div>
    </div>
  );
}

export default App;
