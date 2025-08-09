#To-Do List

Aplicación web para la gestión de tareas, desarrollada con **React** y desplegada en **Firebase Hosting**.  
Permite agregar, editar y eliminar tareas de forma sencilla y rápida.

## Tecnologías utilizadas

- **Frontend:** React, Vite, JavaScript, CSS
- **Hosting:** Firebase Hosting
- **Control de versiones:** Git + GitHub
- **Gestor de paquetes:** npm

---

## Instalación y ejecución local

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1. **Clonar el repositorio**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
Entrar a la carpeta del proyecto

bash
Copiar
Editar
cd todo-list
Instalar dependencias

bash
Copiar
Editar
npm install
Configurar la API para entorno local
Abre el archivo src/api.jsx y cambia la variable que controla el modo local a true.

Esto es importante ya que, por defecto, la aplicación utiliza la API desplegada en producción:
https://todo-list-2e0f8.web.app/

Iniciar el servidor de desarrollo

bash
Copiar
Editar
npm run dev
Abrir en el navegador
Normalmente estará disponible en:
http://localhost:5173

Producción
Puedes ver la versión en producción aquí:
To-Do List App - Producción

📂 Estructura del proyecto
plaintext
Copiar
Editar
todo-list/
├── public/           # Archivos públicos y estáticos
├── src/              # Código fuente
│   ├── components/   # Componentes reutilizables
│   ├── pages/        # Páginas principales
│   ├── styles/       # Estilos CSS
│   ├── api.jsx       # Configuración de API
│   └── main.jsx      # Punto de entrada de la app
├── package.json      # Dependencias y scripts
└── README.md         # Documentación del proyecto
Scripts disponibles
npm run dev → Inicia el servidor de desarrollo

npm run build → Genera la versión optimizada para producción

npm run preview → Previsualiza la build de producción localmente



📄 Licencia
Este proyecto está bajo la licencia MIT.
Consulta el archivo LICENSE para más información.

Desarrollado por Luis Rafael Cordova Ruiz

---

Si quieres, puedo también prepararte **el bloque exacto de `api.jsx`** donde se cambia la variable para local/producción, así queda clarísimo en el README y no hay que buscarlo a ciegas.  
Así sería totalmente **a prueba de principiantes**.
