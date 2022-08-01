import { record } from 'rrweb';

const SAVE_KEY = '__rrweb_'
export const STATUS = {
  stop: 'stop',
  recording: 'recording',
}

export const LISTENER_TYPE = {
  onChange: 'onChange',
}

class Record {
  stopFn;
  events = [];
  listener = [];
  status = STATUS.stop

  start = () => {
    const that = this;
    that.stopFn = record({
      emit(event) {
        console.log('rrweb', event);
        that.events.push(event);
      },
    });
    this.status = STATUS.recording;
  }
  stop = () => {
    if (this.status === STATUS.recording) {
      this.stopFn();
      const data = this._getLocalData();
      this._setLocalData({ ...data, [Date.now()]: this.events });
    }
  }
  getCurrentEvents () {
    return this.events;
  }
  getEvents (recordId) {
    const data = this._getLocalData();
    if (recordId) {
      return data[recordId];
    }
    return data;
  }
  deleteEvent (recordId) {
    const data = this._getLocalData();
    if (data[recordId]) {
      delete data[recordId];
      this._setLocalData(data);
    }
  }
  on (type, fn) {
    if (LISTENER_TYPE[type]) {
      this.listener.push({ type, fn });
    }
  }
  off (type) {
    this.listener = this.listener.reduce((acc, curr) => {
      if (curr.type === type) {
        return acc;
      } else {
        return [...acc, curr];
      }
    }, []);
  }

  _getLocalData () {
    return JSON.parse(localStorage.getItem(SAVE_KEY)) || {};
  }
  _setLocalData (data) {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));

    this.listener
      .filter(o => o.type === LISTENER_TYPE.onChange)
      .forEach(o => o.fn(data))
  }
}

const Recorder = new Record();

export default Recorder;
