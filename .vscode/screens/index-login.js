<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>TuOportuniApp - Iniciar sesión</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <div class="header">
    <img src="TuOportuniApp.jpg" alt="Logo TuOportuniApp" class="logo">
      <div>
        <div class="h1">TuOportuniApp</div>
        <div class="small">Inicia sesión para continuar</div>
      </div>
    </div>

    <div class="card row">
      <div class="col">
        <form aria-label="Formulario de inicio de sesión">
          <label for="email">Correo electrónico</label>
          <input id="email" type="email" placeholder="tucorreo@ejemplo.com" required>
          <label for="pass">Contraseña</label>
          <input id="pass" type="password" placeholder="********" required>
          <div style="margin-top:12px;display:flex;gap:8px;justify-content:flex-end">
            <button type="submit">Validar</button>
            <button type="button" class="ghost" onclick="location.href='register.html'">Crear cuenta</button>
          </div>
        </form>
        <p class="small" style="margin-top:10px">¿Olvidaste tu contraseña? <a href="#">Recuperar</a></p>
      </div>

      <div class="col" style="display:flex;flex-direction:column;gap:8px;justify-content:center">
        <div class="kpi card">
          <div>
            <div class="value">+1.200</div>
            <div class="label">Vacantes activas</div>
          </div>
        </div>
        <div class="card small">
          Accede de forma segura con tu correo. La plataforma verifica puestos y notifica en tiempo real.
        </div>
      </div>
    </div>

    <div class="footer">TuOportuniApp · Versión de prototipo</div>
  </div>
</body>
</html>
