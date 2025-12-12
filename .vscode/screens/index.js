<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>TuOportuniApp - Prototipo</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <!-- Usa ruta relativa, el archivo debe estar en la misma carpeta -->
    <img src="TuOportuniApp.jpg" alt="Logo TuOportuniApp" class="logo">

    <!-- Pantalla 1: Validar autenticidad -->
    <section>
      <form class="form-autenticidad">
        <h2>Validar autenticidad de usuario</h2>
        <input type="text" placeholder="Usuario" required>
        <input type="password" placeholder="Contraseña" required>
        <button type="submit">Validar</button>
      </form>
      <div class="mensaje-error oculto">Usuario o contraseña incorrectos</div>
    </section>

    <!-- Pantalla 2: Ingreso de datos personales -->
    <section>
      <form class="form-datos">
        <h2>Registro de usuario</h2>
        <input type="text" placeholder="Nombres" required>
        <input type="text" placeholder="Apellidos" required>
        <input type="text" placeholder="Cédula" pattern="[0-9]{6,11}" required>
        <input type="date" required>
        <button type="submit">Registrar</button>
      </form>
    </section>

    <!-- Pantalla 3: Mensaje de error -->
    <section>
      <div class="error-info">
        <h2>Error</h2>
        <p>No se pudo completar el registro. Verifica los campos y vuelve a intentarlo.</p>
      </div>
    </section>
  </div>
</body>
</html>
<div class="paleta-colores">
  <h2>Paleta de colores utilizada en el proyecto</h2>
  <div class="fila-colores">
    <div class="color-circulo azul"></div>
    <div class="color-circulo amarillo"></div>
    <div class="color-circulo rojo"></div>
  </div>
  <div class="nombres-colores">
    <span>Azul (#2056b3)</span>
    <span>Amarillo (#ffd400)</span>
    <span>Rojo (#e30613)</span>
  </div>
</div>
