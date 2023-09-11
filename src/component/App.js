import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimer, selectTimer } from '../features/timerSlice';
import { useStartTimerQuery, useResetTimerQuery } from '../features/timerApi';
import './App.css';


function App() {
  const dispatch = useDispatch();
  const timer = useSelector(selectTimer);

  const { refetch: startTimer, isLoading: isLoadingStart } = useStartTimerQuery();
  const { refetch: resetTimer, isLoading: isLoadingReset } = useResetTimerQuery();


  React.useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (message) => {
      console.log("WebSocket message received:", message);
      dispatch(setTimer(parseInt(message.data)));
    };

    ws.onerror = (error) => {
      console.log("WebSocket encountered an error:", error);
      // you can dispatch an error to Redux if you'd like
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

  }, [dispatch]);

  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs < 10 ? '0' : ''}${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  return (
    <div className="container">
      <h1>WebSocket Timer</h1>
      <div className="timer">
        {formatTime(timer)}
      </div>
      <div className="button-group">
        <button className="button" onClick={() => startTimer()} disabled={isLoadingStart}>START</button>
        <button className="button" onClick={() => resetTimer()} disabled={isLoadingReset}>RESET</button>
      </div>
    </div>
  );
}

export default App;
