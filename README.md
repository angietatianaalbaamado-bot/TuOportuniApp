# TuOportuniApp 📱💼

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Android-green)
![License](https://img.shields.io/badge/license-Académico-orange)
![SENA](https://img.shields.io/badge/SENA-Proyecto%20Académico-red)

---

## 📌 Descripción general

**TuOportuniApp** es una aplicación móvil desarrollada para optimizar y modernizar los procesos de búsqueda de empleo y selección de personal en Colombia. La plataforma conecta de manera directa a candidatos y empresas, permitiendo gestionar vacantes, postulaciones, entrevistas y comunicación en tiempo real desde un solo lugar.

El proyecto surge como respuesta a problemáticas frecuentes del mercado laboral, tales como vacantes desactualizadas, procesos de selección lentos, baja comunicación entre reclutadores y aspirantes, y falta de transparencia en la información publicada.

---

## 🎯 Objetivo del proyecto

Desarrollar una plataforma móvil eficiente, intuitiva y segura que facilite:

- A los **candidatos**, encontrar oportunidades laborales reales y postularse fácilmente.
- A las **empresas**, gestionar procesos de selección de forma ágil y organizada.
- A los **administradores**, supervisar y controlar la información del sistema.

---

## 👥 Público objetivo

- Personas en búsqueda activa de empleo.
- Empresas pequeñas y medianas sin sistemas ATS.
- Reclutadores independientes.
- Administradores del sistema.

---

## 🚀 Funcionalidades del sistema

### 👤 Candidatos
- Registro e inicio de sesión.
- Creación y edición de perfil profesional.
- Carga de hoja de vida en formato PDF.
- Búsqueda de vacantes por filtros (ubicación, área, tipo de contrato).
- Visualización detallada de vacantes.
- Postulación a ofertas laborales.
- Chat directo con reclutadores.
- Agenda de entrevistas.
- Notificaciones en tiempo real.

### 🏢 Empresas
- Registro e inicio de sesión empresarial.
- Creación y gestión de vacantes.
- Visualización de postulaciones recibidas.
- Comunicación directa con candidatos.
- Programación de entrevistas.
- Panel con métricas básicas.

### 🛠 Administradores
- Gestión de usuarios.
- Supervisión de vacantes.
- Verificación de empresas.
- Generación de reportes.
- Auditoría del sistema.

---

## 🧱 Arquitectura del sistema

```
TuOportuniApp/
├── TuOportuniAppMobileNuevo/     # Frontend
│   ├── app/
│   │   ├── (auth)/               # Login, Registro, Bienvenida
│   │   ├── (drawer)/             # Pantallas principales
│   │   └── _layout.tsx           # Layout raíz con Splash
│   └── src/
│       └── services/             # Servicios API
└── TuOportuniAppBackend/         # Backend
    └── server/
        ├── routes/               # Rutas API REST
        ├── middleware/           # JWT Middleware
        └── db.js                 # Conexión PostgreSQL (Neon)
```

---

## 🛠 Tecnologías utilizadas

| Frontend | Backend | Base de datos | Despliegue |
|---|---|---|---|
| React Native | Node.js | PostgreSQL (Neon) | Render |
| Expo | Express.js | | Expo EAS |
| TypeScript | JWT + Bcrypt | | GitHub |
| Expo Router | Swagger UI | | |

---

## 🗂 Entidades del sistema

| Entidad | Descripción |
|---|---|
| Usuario | Candidatos, empresas y administradores |
| PerfilCandidato | Información profesional del candidato |
| Empresa | Datos de la empresa registrada |
| Vacante | Ofertas laborales publicadas |
| Postulación | Aplicaciones a vacantes |
| Chat | Conversaciones entre candidato y empresa |
| Mensaje | Mensajes dentro de un chat |
| Entrevista | Citas programadas |
| Notificación | Alertas del sistema |

---

## 📚 Documentación API

La API está documentada con **Swagger UI**.

Accede en: [https://tuoportuniappbackend.onrender.com/api-docs](https://tuoportuniappbackend.onrender.com/api-docs)

### Endpoints principales

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/registro` | Registro de usuario |
| POST | `/api/auth/login` | Inicio de sesión |
| GET | `/api/vacantes` | Listar vacantes |
| POST | `/api/vacantes` | Crear vacante |
| POST | `/api/postulaciones` | Postularse a una vacante |
| GET | `/api/postulaciones/mis-postulaciones` | Mis postulaciones |
| POST | `/api/chats` | Crear chat |
| GET | `/api/chats/:id/mensajes` | Ver mensajes |
| POST | `/api/chats/:id/mensajes` | Enviar mensaje |
| GET | `/api/notificaciones` | Ver notificaciones |
| POST | `/api/entrevistas` | Programar entrevista |
| GET | `/api/perfil` | Ver perfil |
| POST | `/api/perfil` | Actualizar perfil |

---

## ⚙️ Instalación local

### Requisitos
- Node.js v18+
- Expo Go (en el celular)

### Backend

```bash
git clone https://github.com/angietatianaalbaamado-bot/TuOportuniAppBackend.git
cd TuOportuniAppBackend
npm install
```

Crea `.env`:

```env
PORT=3000
JWT_SECRET=tu_secret
DATABASE_URL=tu_url_de_neon
```

```bash
node server/index.js
```

### Frontend

```bash
git clone https://github.com/angietatianaalbaamado-bot/TuOportuniApp.git
cd TuOportuniApp
npm install
```

Crea `.env`:

```env
EXPO_PUBLIC_API_URL=https://tuoportuniappbackend.onrender.com
EXPO_PUBLIC_APP_NAME=TuOportuniApp
```

```bash
npx expo start
```

---

## 📱 Despliegue en producción

| Componente | Servicio | URL |
|---|---|---|
| Backend | Render | [https://tuoportuniappbackend.onrender.com](https://tuoportuniappbackend.onrender.com) |
| Base de datos | Neon PostgreSQL | Activa ✅ |
| App Android | Expo EAS Build | Próximamente |

---

## ⭐ Valor agregado

- Vacantes verificadas.
- Comunicación directa sin intermediarios.
- Entrevistas dentro de la aplicación.
- Procesos 100% digitales.
- Información actualizada en tiempo real.

---

## 👩‍💻 Autora

**Angie Tatiana Alba Amado**
Tecnóloga en Análisis y Desarrollo de Software – SENA

[![GitHub](https://img.shields.io/badge/GitHub-angietatianaalbaamado--bot-black?logo=github)](https://github.com/angietatianaalbaamado-bot)

---

## 📄 Licencia

Este proyecto es de carácter académico y educativo.