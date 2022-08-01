import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import rrwebPlayer from 'rrweb-player';

import Recorder from '../utils/rrweb'

export default function Play() {
  const { recordId } = useParams();
  const player = useRef(null);

  useEffect(() => {
    if (recordId && !player.current) {
      // 初始化播放器
      const events = Recorder.getEvents(recordId);
      if (Array.isArray(events) && events.length) {
        player.current = new rrwebPlayer({
          target: document.getElementById('rrwebPlayerContainer'),
          props: {
            events,
            autoPlay: false,
            width: 624,
            height: 400,
          },
        });
      }
    }
  }, [recordId]);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
      }}
    >
      <div style={{ width: '624px', textAlign: 'left', marginBottom: '12px' }}>
        <button  onClick={() => window.history.back()}>返回</button>
      </div>
      <div id="rrwebPlayerContainer" />
    </div>
  );
}
