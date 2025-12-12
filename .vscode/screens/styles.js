/* styles.css - paleta: azul, amarillo, rojo + neutrales */
:root{
  --azul: #2056b3;
  --amarillo: #ffd400;
  --rojo: #b8097de8;
  --gris-osc: #2b2b2b;
  --gris: #473f3f;
  --fondo: #b9b0b9;
  --blanco: #eee6ed;
  --radio: 10px;
  --maxwidth: 920px;
  --pad: 18px;
  font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color-scheme: light;
}

*{box-sizing:border-box}
body{
  margin:0;
  background:linear-gradient(180deg,var(--fondo),#f0f0ef);
  color:var(--gris-osc);
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  padding:24px;
}

.container{
  max-width:var(--maxwidth);
  margin:20px auto;
  background:var(--blanco);
  border-radius:12px;
  box-shadow:0 6px 24px rgba(32,86,179,0.08);
  padding:var(--pad);
}

.header{
  display:flex;
  align-items:center;
  gap:14px;
  margin-bottom:18px;
}
.logo{
  width:56px;height:56px;border-radius:8px;background:linear-gradient(135deg,var(--azul),var(--amarillo));
  display:flex;align-items:center;justify-content:center;color:#e61f1f;font-weight:700;
  font-size:18px;
}
.h1{font-size:20px;font-weight:700;color:var(--gris-osc)}

.row{display:flex;gap:16px;flex-wrap:wrap}
.col{flex:1;min-width:260px}

.card{
  background:linear-gradient(180deg,#fff, #fbfdff);
  border:1px solid #eef2ff;
  padding:16px;border-radius:10px;
}

label{display:block;font-size:14px;margin-bottom:6px;color:var(--gris)}
input[type="text"],input[type="password"],input[type="email"],input[type="date"],textarea,select{
  width:100%;padding:10px;border-radius:8px;border:1px solid #e6e9f8;background:#fff;
  font-size:14px;color:var(--gris-osc)
}
button{
  background:var(--azul);color:#fff;border:0;padding:10px 14px;border-radius:8px;font-weight:600;
  cursor:pointer;transition:all .15s ease;
}
button.secondary{background:var(--amarillo);color:var(--gris-osc)}
button.ghost{background:transparent;border:1px solid #e6e9f8;color:var(--gris-osc)}
button:hover{transform:translateY(-2px)}
.small{font-size:13px;color:var(--gris)}
.kpi{display:flex;gap:12px;align-items:center}
.kpi .value{font-size:18px;font-weight:700;color:var(--azul)}
.kpi .label{font-size:13px;color:var(--gris)}

.vacancy{border-left:4px solid var(--amarillo);padding:12px;border-radius:6px;background:#fff;margin-bottom:10px}
.chat-box{height:320px;overflow:auto;padding:12px;border-radius:8px;border:1px dashed #eef2ff;background:#fbfbff}
.msg {padding:8px 10px;border-radius:8px;margin-bottom:8px;max-width:78%}
.msg.user{background:linear-gradient(90deg,#eaf2ff,#fff);align-self:flex-end}
.msg.company{background:#a2eb67bd;border:1px solid #fff0c2}

.footer{display:flex;justify-content:space-between;align-items:center;margin-top:18px;color:var(--gris);font-size:13px}

/* responsive small */
@media (max-width:640px){
  .row{flex-direction:column}
  .logo{width:46px;height:46px}
}
