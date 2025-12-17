# TuOportuniApp 📱💼

## 📌 Descripción general

**TuOportuniApp** es una aplicación móvil desarrollada para optimizar y modernizar los procesos de búsqueda de empleo y selección de personal en Colombia. La plataforma conecta de manera directa a candidatos y empresas, permitiendo gestionar vacantes, postulaciones, entrevistas y comunicación en tiempo real desde un solo lugar.

El proyecto surge como respuesta a problemáticas frecuentes del mercado laboral, tales como vacantes desactualizadas, procesos de selección lentos, baja comunicación entre reclutadores y aspirantes, y falta de transparencia en la información publicada.

---

## 🎯 Objetivo del proyecto

Desarrollar una plataforma móvil eficiente, intuitiva y segura que facilite:

* A los **candidatos**, encontrar oportunidades laborales reales y postularse fácilmente.
* A las **empresas**, gestionar procesos de selección de forma ágil y organizada.
* A los **administradores**, supervisar y controlar la información del sistema.

---

## 👥 Público objetivo

* Personas en búsqueda activa de empleo.
* Empresas pequeñas y medianas sin sistemas ATS.
* Reclutadores independientes.
* Administradores del sistema.

---

## 🚀 Funcionalidades del sistema

### 👤 Candidatos

* Registro e inicio de sesión.
* Creación y edición de perfil profesional.
* Carga de hoja de vida en formato PDF.
* Búsqueda de vacantes por filtros (ubicación, área, tipo de contrato).
* Visualización detallada de vacantes.
* Postulación a ofertas laborales.
* Chat directo con reclutadores.
* Agenda de entrevistas.
* Notificaciones en tiempo real.

### 🏢 Empresas

* Registro e inicio de sesión empresarial.
* Creación y gestión de vacantes.
* Visualización de postulaciones recibidas.
* Comunicación directa con candidatos.
* Programación de entrevistas.
* Panel con métricas básicas.

### 🛠 Administradores

* Gestión de usuarios.
* Supervisión de vacantes.
* Verificación de empresas.
* Generación de reportes.
* Auditoría del sistema.

---

## 🧱 Arquitectura del sistema

El sistema está diseñado bajo una arquitectura moderna y escalable:

* **Frontend móvil:** React Native + Expo
* **Backend:** Node.js con NestJS
* **Base de datos:** PostgreSQL
* **Autenticación:** JWT
* **Notificaciones:** Firebase Cloud Messaging
* **Almacenamiento de archivos:** AWS S3 (o servicio equivalente)
* **Pruebas:** Jest
* **Despliegue:** Render / Railway / Vercel / Expo Publish

---

## 🗂 Entidades del sistema (Modelo de datos)

### 👤 Usuario

* id_usuario (PK)
* nombre
* apellido
* correo
* contraseña
* rol (candidato, empresa, administrador)
* estado
* fecha_creación

### 👨‍💼 PerfilCandidato

* id_perfil (PK)
* id_usuario (FK)
* profesión
* experiencia
* habilidades
* hoja_vida_url

### 🏢 Empresa

* id_empresa (PK)
* nombre_empresa
* correo
* descripción
* ubicación
* estado_verificación

### 📄 Vacante

* id_vacante (PK)
* id_empresa (FK)
* título
* descripción
* requisitos
* salario
* tipo_contrato
* ubicación
* fecha_publicación
* estado

### 📨 Postulación

* id_postulación (PK)
* id_vacante (FK)
* id_usuario (FK)
* fecha_postulación
* estado

### 💬 Chat

* id_chat (PK)
* id_empresa (FK)
* id_usuario (FK)

### ✉ Mensaje

* id_mensaje (PK)
* id_chat (FK)
* contenido
* fecha_envío
* emisor

### 📅 Entrevista

* id_entrevista (PK)
* id_postulación (FK)
* fecha
* hora
* tipo (virtual / presencial)
* enlace

### 🔔 Notificación

* id_notificación (PK)
* id_usuario (FK)
* mensaje
* leída
* fecha

---

## ⭐ Valor agregado

* Vacantes verificadas.
* Comunicación directa sin intermediarios.
* Entrevistas dentro de la aplicación.
* Procesos 100% digitales.
* Información actualizada en tiempo real.

---

## 📌 Tecnologías utilizadas

* React Native
* Expo
* TypeScript
* Node.js
* NestJS
* PostgreSQL
* Firebase
* Git y GitHub

---
⚙️ Instalación y ejecución

Clonar el repositorio:

git clone https://github.com/angietatianaalbaamado-bot/TuOportuniApp.git

Instalar dependencias:

npm install

Ejecutar el proyecto:

## 👩‍💻 Autora

**Angie Tatiana Alba Amado**
Tecnóloga en Análisis y Desarrollo de Software – SENA

---

## 📄 Licencia

Este proyecto es de carácter académico y educativo.







# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
