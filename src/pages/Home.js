import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Recorder, { LISTENER_TYPE } from "../utils/rrweb";
import { formatDate } from "../utils";

export default function Home() {
  const [recordList, setRecordList] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const data = Object.keys(Recorder.getEvents());
    setRecordList(data.reverse());

    Recorder.on(LISTENER_TYPE.onChange, (newData) => {
      setRecordList(Object.keys(newData).reverse());
    })

    return () => {
      Recorder.off(LISTENER_TYPE.onChange);
    }
  }, []);

  const handleCLickRecord = (recordKey) => {
    history(`/play/${recordKey}`);
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "50px auto 0",
        background: "white",
        padding: "20px 12px",
        borderRadius: "5px",
        boxShadow: "0 24px 48px rgb(17 16 62 / 12%)",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "12px" }}>可回溯列表</h3>
      {recordList.map((o) => {
        return (
          <div
            key={o}
            style={{ padding: "15px", cursor: "pointer", display: "flex" }}
            className="hover-under-line"
          >
            <span style={{ flex: 1 }}>{formatDate(Number(o))}</span>
            <button
              style={{ marginRight: '12px' }}
              onClick={() => {
                handleCLickRecord(o);
              }}
            >
              播放
            </button>
            <button
              onClick={() => {
                if (window.confirm("确定是否需要删除？")) {
                  // /* eslint-disable camelcase */
                  Recorder.deleteEvent(o);
                }
              }}
            >
              删除
            </button>
          </div>
        );
      })}
    </div>
  );
}
