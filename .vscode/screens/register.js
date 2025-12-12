<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>TuOportuniApp - Registro</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="TuOportuniApp.jpg" alt="Logo TuOportuniApp" class="logo">
      <div><div class="h1">Registro de usuario</div><div class="small">Completa tus datos</div></div>
    </div>

    <div class="card">
      <form aria-label="Formulario de registro">
        <div class="row">
          <div class="col">
            <label for="nombres">Nombres</label>
            <input id="nombres" type="text" placeholder="Ana María" required>
          </div>
          <div class="col">
            <label for="apellidos">Apellidos</label>
            <input id="apellidos" type="text" placeholder="Pérez López" required>
          </div>
        </div>

        <div class="row" style="margin-top:12px">
          <div class="col">
            <label for="cedula">Cédula</label>
            <input id="cedula" type="text" pattern="[0-9]{6,11}" placeholder="12345678" required>
          </div>
          <div class="col">
            <label for="fecha">Fecha de nacimiento</label>
            <input id="fecha" type="date" required>
          </div>
        </div>

        <div style="margin-top:14px;display:flex;gap:8px;justify-content:flex-end">
          <button type="submit">Registrar</button>
          <button type="button" class="ghost" onclick="location.href='index-login.html'">Volver</button>
        </div>
      </form>
    </div>

    <div class="footer">Datos protegidos y encriptados | TuOportuniApp</div>
  </div>
</body>
</html>
