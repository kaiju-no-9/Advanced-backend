import { useState, useEffect } from "react";
import { APITester } from "./APITester";
import "./index.css";


export function App() {
  const [soket, setsocket] = useState<null | WebSocket>(null)
  const [message, setMessage] = useState("")
  const [input, setInput] = useState("")
  useEffect(() => {
    // here we are utiliszing the websocket server runnig in background..
    // the server is running on port 8080 in backend ...
    const socket = new WebSocket('ws://localhost:8080')
    socket.onopen = () => {
      console.log("connected")
      setsocket(socket)
    }
    socket.onmessage = (message) => {
      console.log("message revied", message.data)
      setMessage(message.data)
    }
    setsocket(socket)
  }, [])
  if (!soket) {
    return (
      <div >
        Loding .......
      </div>
    );
  } else {
    return (
      <div >
        <input onChange={(e) => setInput(e.target.value)} />
        <button onClick={() => soket.send(input)}>Send</button>
        {message}

      </div>
    )

  }
}

export default App;
