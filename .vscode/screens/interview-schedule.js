<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>TuOportuniApp - Programar entrevista</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
  <img src="TuOportuniApp.jpg" alt="Logo TuOportuniApp" class="logo">

    <div class="card">
      <form aria-label="Programar entrevista">
        <label for="fecha">Fecha</label>
        <input id="fecha" type="date" required>
        <label for="hora">Hora</label>
        <input id="hora" type="text" placeholder="Ej: 10:30 AM" required>
        <label for="modalidad">Modalidad</label>
        <select id="modalidad">
          <option>Videollamada</option>
          <option>Presencial</option>
        </select>

        <div style="margin-top:12px;display:flex;gap:8px;justify-content:flex-end">
          <button type="submit">Solicitar</button>
          <button type="button" class="ghost" onclick="location.href='vacancies-list.html'">Cancelar</button>
        </div>
      </form>
    </div>

    <div class="footer">Integración con calendarios y recordatorios por notificaciones.</div>
  </div>
</body>
</html>
