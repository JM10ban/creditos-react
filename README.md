Simulador de Créditos – React

Autor: Juan Martín Estrella Muñoz**
Tecnologías principales: Create React App, React Router, Hooks, Métodos de Arrays, Componentes Reutilizables, Estilos CSS.

 Descripción del Proyecto

Este proyecto es un simulador de créditos desarrollado con React.
Permite visualizar diferentes tipos de créditos, navegar entre páginas con React Router, utilizar componentes reutilizables y manejar datos mediante métodos de arrays como .map(), .filter() y .sort().

Incluye:

Módulo de navegación con React Router

Archivo de datos creditsData.js

Componentes reutilizables (Navbar, tarjetas, etc.)

Hooks de React (useState, useEffect)

Manejo dinámico de arrays

Estilos personalizados

 Tecnologías Utilizadas

Create React App

React

React Router

JavaScript ES6+

React Hooks (useState, useEffect)

Métodos de Arrays (map, filter, sort)

CSS para estilos

 Estructura del Proyecto
src/
 ├── components/
 ├── pages/
 ├── data/
 │    └── creditsData.js
 ├── App.js
 ├── index.js
public/
package.json
.gitignore
README.md

 Instalación y Ejecución

Clona el repositorio:

git clone https://github.com/JM10ban/creditos-react
cd creditos-react


Instala dependencias:

npm install


Ejecuta el proyecto:

npm start


La aplicación abrirá en:
 http://localhost:3000

 Capturas de Pantalla



### Pantalla Principal
![Pantalla Principal](./public/screenshots/captura1.png)

### Lista de Créditos
![Lista Créditos](./public/screenshots/captura2.png)

### Navegación con React Router
![Navegación](./public/screenshots/captura3.png)



 Archivo de Datos

El archivo principal de datos se encuentra en:

src/data/creditsData.js


Ejemplo:

export const creditsData = [
  {
    id: 1,
    nombre: "Crédito Libre Inversión",
    tasa: 1.2,
    descripcion: "Crédito diseñado para cubrir necesidades personales."
  },
];