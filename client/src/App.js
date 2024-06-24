import { useState, useEffect } from "react";
import connectToWSS from "./websockets";

function App() {

  const [ws, setWS] = useState(null);

  useEffect(() => {
    let isMounted = true;

    function setWebSockets() {
      connectToWSS((newWs) => {
        newWs.onopen = function () {
          if (!isMounted) return;
          setWS(ws);
          console.log("conexion a websockets activada");
          newWs.send(JSON.stringify({ saludo: "hola servidor" }));
        }

        newWs.onclose = function () {
          if (!isMounted) return;
          console.log("conexion a websockets cerrada, reabriendo...");
          setWebSockets();
        }

        newWs.onerror = function () {
          if (!isMounted) return;
          console.log("conexion a websockets fallida.");
          newWs.close();
        }
      });
    };

    if (!ws || ws.readyState !== WebSocket.OPEN) {
      setWebSockets();
    }

    return () => {
      isMounted = false;
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  },[]);

  return (
    <div className="App">
        checa consola del navegador
    </div>
  );
}

export default App;
