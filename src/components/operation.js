import React, { useState } from "react";
import Recorder, { STATUS } from '../utils/rrweb'

export default function Operation() {
  const [status, setStatus] = useState(STATUS.stop);

  return (
    <div className="operation-btn-wrap">
      <button
        onClick={() => {
          Recorder.start();
          setStatus(STATUS.recording);
        }}
      >
        {status === STATUS.recording ? (
          <span className="recording-icon" />
        ) : null}
        <span>录制</span>
      </button>
      <button
        onClick={() => {
          Recorder.stop();
          setStatus(STATUS.stop);
        }}
      >
        停止
      </button>
    </div>
  );
}
