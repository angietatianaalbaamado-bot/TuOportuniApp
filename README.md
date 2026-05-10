# TuOportuniApp 📱💼

Aplicación móvil desarrollada para optimizar y modernizar los procesos de búsqueda de empleo y selección de personal en Colombia. Conecta directamente a candidatos y empresas, permitiendo gestionar vacantes, postulaciones, entrevistas y comunicación en tiempo real.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Android-green)
![License](https://img.shields.io/badge/license-Académico-orange)

---

## 📸 Capturas de pantalla

| Bienvenida | Inicio | Perfil |
|---|---|---|
| Pantalla de bienvenida con logo | Lista de vacantes con búsqueda | Perfil del candidato |

---

## 🎯 Objetivo

Desarrollar una plataforma móvil eficiente, intuitiva y segura que facilite:

- A los **candidatos**: encontrar oportunidades laborales reales y postularse fácilmente.
- A las **empresas**: gestionar procesos de selección de forma ágil y organizada.
- A los **administradores**: supervisar y controlar la información del sistema.

---

## 🚀 Funcionalidades

### 👤 Candidatos
- Registro e inicio de sesión
- Creación y edición de perfil profesional
- Carga de hoja de vida en formato PDF
- Búsqueda de vacantes por filtros (ubicación, tipo de contrato)
- Postulación a ofertas laborales
- Chat directo con reclutadores
- Agenda de entrevistas
- Notificaciones en tiempo real

### 🏢 Empresas
- Registro e inicio de sesión empresarial
- Creación y gestión de vacantes
- Visualización de postulaciones recibidas
- Comunicación directa con candidatos
- Programación de entrevistas

---

## 🧱 Arquitectura

```
TuOportuniApp/
├── TuOportuniAppMobileNuevo/     # Frontend
│   ├── app/
│   │   ├── (auth)/               # Pantallas de autenticación
│   │   ├── (drawer)/             # Pantallas principales
│   │   └── _layout.tsx           # Layout raíz
│   └── src/
│       └── services/             # Servicios API
└── TuOportuniAppBackend/         # Backend
    └── server/
        ├── routes/               # Rutas API
        ├── middleware/           # Middlewares
        └── db.js                 # Conexión PostgreSQL
```

---

## 🛠 Tecnologías

| Frontend | Backend | Base de datos |
|---|---|---|
| React Native | Node.js | PostgreSQL |
| Expo | Express.js | |
| TypeScript | JWT Auth | |
| Expo Router | Bcrypt | |

---

## ⚙️ Instalación

### Requisitos previos
- Node.js v18+
- PostgreSQL
- Expo Go (en el celular)

### Backend

```bash
cd TuOportuniAppBackend
npm install
```

Crea el archivo `.env`:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=tuoportuniapp
DB_PORT=5432
PORT=3000
JWT_SECRET=tu_secret
```

Ejecuta el backend:

```bash
npm run dev
```

### Frontend

```bash
cd TuOportuniAppMobileNuevo
npm install
```

Crea el archivo `.env`:

```env
EXPO_PUBLIC_API_URL=http://TU_IP:3000
EXPO_PUBLIC_APP_NAME=TuOportuniApp
```

Ejecuta el frontend:

```bash
npx expo start
```

---

## 📡 API Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/registro` | Registro de usuario |
| POST | `/api/auth/login` | Inicio de sesión |
| GET | `/api/vacantes` | Listar vacantes |
| POST | `/api/vacantes` | Crear vacante |
| POST | `/api/postulaciones` | Postularse a vacante |
| GET | `/api/postulaciones/mis-postulaciones` | Ver mis postulaciones |
| POST | `/api/chats` | Crear chat |
| GET | `/api/chats/:id/mensajes` | Ver mensajes |
| POST | `/api/chats/:id/mensajes` | Enviar mensaje |
| GET | `/api/notificaciones` | Ver notificaciones |
| POST | `/api/entrevistas` | Programar entrevista |

---

## 🗂 Modelo de datos

- **Usuario**: id, nombre, apellido, correo, contraseña, rol, estado
- **PerfilCandidato**: id, id_usuario, profesión, experiencia, habilidades, hoja_vida_url
- **Empresa**: id, nombre, correo, descripción, ubicación, estado_verificación
- **Vacante**: id, id_empresa, título, descripción, requisitos, sueldo, tipo_contrato, ubicación
- **Postulación**: id, id_vacante, id_usuario, fecha, estado
- **Chat**: id, id_empresa, id_usuario
- **Mensaje**: id, id_chat, contenido, fecha, emisor
- **Entrevista**: id, id_postulacion, fecha, hora, tipo, enlace
- **Notificación**: id, id_usuario, mensaje, leída, fecha

---

## 👩‍💻 Autora

**Angie Tatiana Alba Amado**
Tecnóloga en Análisis y Desarrollo de Software – SENA

[![GitHub](https://img.shields.io/badge/GitHub-angietatianaalbaamado--bot-black?logo=github)](https://github.com/angietatianaalbaamado-bot)

---

## 📄 Licencia

Este proyecto es de carácter académico y educativo.