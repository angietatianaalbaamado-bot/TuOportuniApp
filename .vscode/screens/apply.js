<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>TuOportuniApp - Postulación</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <img src="TuOportuniApp.jpg" alt="Logo TuOportuniApp" class="logo"> 

    <div class="card">
      <form aria-label="Formulario de postulación">
        <p class="small">Tu CV actual: <strong>cv_ana.pdf</strong></p>
        <label for="mensaje">Mensaje corto al reclutador (opcional)</label>
        <textarea id="mensaje" rows="4" placeholder="Hola, tengo experiencia en..."></textarea>

        <div style="margin-top:12px;display:flex;gap:8px;justify-content:flex-end">
          <button type="submit">Enviar postulación</button>
          <button type="button" class="ghost" onclick="location.href='vacancies-list.html'">Cancelar</button>
        </div>
      </form>
    </div>

    <div class="footer">Postulación enviada automáticamente. Espera respuesta inmediata.</div>
  </div>
</body>
</html>
