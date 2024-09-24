
# PayDemo - Backend

**PayDemo-Backend** es el servidor backend para la simulación de pagos. Maneja la autenticación de usuarios, procesamiento de pagos y transacciones. Está construido con **Node.js** y utiliza **Firebase** para autenticación y Firestore para el almacenamiento de datos.

## Requisitos previos

Antes de instalar y ejecutar este proyecto, asegúrate de tener lo siguiente instalado en tu máquina:

- **Node.js** (versión recomendada: 16.x o superior)
- **npm** (administrador de paquetes de Node.js)
- **Firebase** configurado para autenticación y Firestore

## Instalación

### 1. Clonar el repositorio

Primero, clona el repositorio desde GitHub a tu máquina local:

```bash
git clone https://github.com/javieraguayo/PayDemo-Backend.git
```

### 2. Navegar al directorio del proyecto

Ingresa al directorio del proyecto:

```bash
cd PayDemo-Backend
```

### 3. Instalar las dependencias

Instala todas las dependencias del proyecto usando npm:

```bash
npm install
```

### 4. Configurar las variables de entorno y Firebase

1. **Crea el archivo `.env`** en la raíz del proyecto con las variables necesarias para Firebase y otros servicios que el backend requiera. Un ejemplo de archivo `.env` podría verse así:

```bash
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

2. **Crea el archivo `firebaseServiceAccount.json`** en la carpeta `config`. Este archivo es necesario para la configuración del servicio Firebase, y debe contener las credenciales de la cuenta de servicio de Firebase.

### 5. Iniciar el servidor

Después de configurar todo, puedes iniciar el servidor con:

```bash
npm start
```

El servidor debería iniciarse en `http://localhost:4000`.

## Estructura del proyecto

La estructura del proyecto sigue una organización clara de controladores, rutas, servicios y middlewares:

```
/PayDemo-Backend
│
├── /config                     # Configuración del servidor y Firebase
│   └── firebaseServiceAccount.json  # Archivo de configuración del servicio Firebase (debes crearlo)
│
├── /src                        # Código fuente de la aplicación
│   ├── /controllers            # Controladores que manejan la lógica de negocio
│   │   ├── authController.js    # Controlador para autenticación de usuarios
│   │   ├── paymentController.js # Controlador para manejo de pagos
│   │   └── transactionController.js # Controlador para manejo de transacciones
│   │
│   ├── /middlewares             # Middlewares para autenticación y verificación
│   │   └── verifyToken.js        # Middleware para verificar tokens JWT
│   │
│   ├── /routes                  # Definición de rutas de la API
│   │   ├── authRoutes.js         # Rutas de autenticación
│   │   ├── paymentRoutes.js      # Rutas para procesar pagos
│   │   └── transactionRoutes.js  # Rutas para manejo de transacciones
│   │
│   ├── /services                # Servicios que interactúan con Firebase y otros sistemas
│   │   ├── authService.js        # Servicio para autenticación de usuarios
│   │   ├── firestoreService.js   # Servicio para interactuar con Firestore
│   │   └── index.js              # Archivo de exportación de servicios
│   │
├── .env                         # Variables de entorno para la configuración
├── .gitignore                   # Archivos a ignorar en el control de versiones Git
├── package-lock.json            # Información precisa de dependencias
├── package.json                 # Información del proyecto y dependencias npm
├── README.md                    # Documentación del proyecto
```