// import { record } from 'rrweb';
// import rrwebPlayer from 'rrweb-player';
import record from 'rrweb/es/rrweb/packages/rrweb/src/record/index';
import { Replayer } from 'rrweb/es/rrweb/packages/rrweb/src/replay/index';
import 'rrweb-player/dist/style.css';
import logo from '../logo.svg';


const events = [];
let stopFn;
let player;

export default function Debugger() {
  const handleRecord = () => {
    stopFn = record({
      emit(event) {
        console.log('rrweb', event);
        events.push(event);
      },
    });
  };

  const handleStop = () => {
    stopFn();
    handlePlayer();
  }

  const handlePlayer = () => {
    player = new Replayer(events, {
      root: document.getElementById('testAa')
    });
  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <input className='rr-mask' style={{ display: 'inline-block', margin: '20px 0' }} type="text" />

        <button onClick={handleRecord}>录制</button>
        <button onClick={handleStop} style={{ display: 'inline-block', margin: '20px 0' }}>停止</button>

      </div>

      <div className='player-wrap'>
        <div id="testAa" />
        <div className='operation'>
          <button onClick={() => {
            debugger
            player.play()
          }}>播放</button>
        </div>
      </div>
    </div>
  );
}
