<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>TuOportuniApp - Perfil</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <div class="header">
     <img src="TuOportuniApp.jpg" alt="Logo TuOportuniApp" class="logo">
      <div><div class="h1">Mi perfil</div><div class="small">Gestiona tu información</div></div>
    </div>

    <div class="row">
      <div class="col card">
        <h3>Información personal</h3>
        <p class="small"><strong>Nombre:</strong> Ana María Pérez</p>
        <p class="small"><strong>Cédula:</strong> 12345678</p>
        <p class="small"><strong>Correo:</strong> ana@correo.com</p>
        <button class="ghost" onclick="alert('Editar perfil')">Editar perfil</button>
      </div>

      <div class="col card">
        <h3>Hoja de vida</h3>
        <p class="small">Curriculum cargado: cv_ana.pdf</p>
        <div style="margin-top:10px">
          <button>Descargar CV</button>
          <button class="ghost" style="margin-left:8px">Actualizar CV</button>
        </div>
      </div>
    </div>

    <div class="footer">Última conexión: hace 2 horas</div>
  </div>
</body>
</html>
