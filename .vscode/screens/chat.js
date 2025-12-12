<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>TuOportuniApp - Chat</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <img src="TuOportuniApp.jpg" alt="Logo TuOportuniApp" class="logo"> 

    <div class="card" style="display:flex;flex-direction:column;gap:8px">
      <div class="chat-box" aria-live="polite" role="log" style="display:flex;flex-direction:column">
        <div class="msg company">Hola Ana, gracias por postular. ¿Puedes confirmar disponibilidad? <span class="small" style="display:block;margin-top:6px">Empresa · 10:02</span></div>
        <div class="msg user">Sí, estoy disponible. <span class="small" style="display:block;margin-top:6px">Tú · 10:04</span></div>
      </div>

      <div style="display:flex;gap:8px;margin-top:8px">
        <input type="text" placeholder="Escribe un mensaje..." style="flex:1">
        <button>Enviar</button>
      </div>
    </div>

    <div class="footer">Chat en tiempo real (WebSocket) · Mensajes encriptados</div>
  </div>
</body>
</html>
