# 🎵 CD Live - Tienda de Música Online

Tienda de comercio electrónico especializada en la venta de álbumes musicales (CDs, vinilos, cassettes) e instrumentos musicales. Desarrollada con React y Vite.

## 📋 Descripción

CD Live es una plataforma moderna de e-commerce que ofrece una experiencia completa de compra de productos musicales. La aplicación cuenta con un catálogo extenso de álbumes de diferentes artistas y formatos, además de una amplia selección de instrumentos musicales organizados por categorías.

### ✨ Características Principales

- **Catálogo de Álbums**: Navegación por CDs, vinilos y cassettes con filtros avanzados
- **Instrumentos Musicales**: Sección dedicada a instrumentos de cuerda, viento, percusión y electrónicos
- **Sistema de Carrito**: Carrito de compras dinámico con gestión de cantidades y cálculo de totales
- **Búsqueda Inteligente**: Buscador con sugerencias y resultados filtrados
- **Autenticación de Usuario**: Sistema de login/registro con persistencia de sesión
- **Perfil de Usuario**: Gestión de datos personales, direcciones y métodos de pago
- **Marcos Personalizados**: Sección para enmarcar álbumes con selección de colores y tamaños
- **Diseño Responsivo**: Interfaz adaptable a diferentes dispositivos
- **Filtros Avanzados**: Filtrado por edición, precio, promociones y preventas

## 🛠️ Tecnologías

- **React** 19.1.1 - Biblioteca de UI
- **React Router DOM** 7.1.2 - Navegación y rutas
- **Vite** 7.1.12 - Build tool y dev server
- **ESLint** - Análisis de código
- **PostCSS** - Procesamiento de CSS
- **JSON Server** - API REST simulada

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/AkaiInku/cd_live_react.git

# Navegar al directorio
cd cd_live_react

# Instalar dependencias
npm install
```

## 💻 Uso

### Modo Desarrollo

```bash
npm run dev
# o
npm run desarrollo
```

El servidor de desarrollo estará disponible en `http://localhost:5173`

### Servidor API (Opcional)

```bash
npm run server
# o
npm run servidor
```

API disponible en `http://localhost:3001`

### Build de Producción

```bash
npm run build
# o
npm run compilar
```

### Vista Previa

```bash
npm run preview
# o
npm run vista
```

### Análisis de Código

```bash
npm run lint
# o
npm run analizar
```

## 📁 Estructura del Proyecto

```
cd_live_react/
├── src/
│   ├── api/              # Datos JSON (álbums, instrumentos, artistas)
│   ├── assets/           # Imágenes, videos y estilos globales
│   ├── components/       # Componentes reutilizables
│   │   ├── common/       # Componentes comunes (botones, cards)
│   │   ├── modals/       # Modales (login, registro, tarjeta)
│   │   └── ...           # Componentes específicos
│   ├── context/          # Context API (CarritoContext)
│   ├── data/             # Utilidades de datos
│   ├── layout/           # Layouts (Header, Footer, MainLayout)
│   ├── pages/            # Páginas principales
│   │   ├── Inicio/       # Página de inicio
│   │   ├── Albums/       # Catálogo de álbums
│   │   ├── Instrumentos/ # Catálogo de instrumentos
│   │   ├── Buscador/     # Página de búsqueda
│   │   ├── Usuario/      # Perfil de usuario
│   │   └── Marcos/       # Marcos personalizados
│   └── routes/           # Configuración de rutas
└── public/               # Archivos públicos estáticos
```

## 🎨 Funcionalidades Detalladas

### Carrito de Compras
- Agregar/eliminar productos
- Ajustar cantidades
- Cálculo automático de subtotales y total
- Persistencia en localStorage
- Panel lateral deslizable
- Confirmación de compra con resumen

### Sistema de Usuario
- Registro con validación de formularios
- Inicio de sesión
- Persistencia de sesión en localStorage
- Gestión de perfil con foto
- Administración de direcciones de envío
- Gestión de tarjetas de pago

### Catálogos
- Vista de grid responsiva
- Tarjetas de producto con información detallada
- Botones de compra directa al carrito
- Navegación a páginas de detalle
- Secciones de productos más vendidos
- Carrusel de artistas destacados

### Filtros
- Filtrado por categorías
- Filtro por tipo de edición (Estándar/Limitada)
- Ordenamiento por precio (Menor a Mayor/Mayor a Menor)
- Filtros especiales (Promoción/Preventa)
- Menús desplegables animados con indicadores visuales

### Búsqueda
- Búsqueda en tiempo real
- Resultados de álbums e instrumentos
- Normalización de texto (sin acentos)
- Sugerencias cuando no hay búsqueda activa
- Productos destacados como sugerencias

## 🎯 Navegación

- **/** - Página de inicio
- **/albums** - Catálogo de álbums
- **/instrumentos** - Catálogo de instrumentos
- **/marcos** - Marcos personalizados
- **/buscar** - Página de búsqueda
- **/usuario** - Perfil de usuario (requiere sesión)

## 🎨 Paleta de Colores

- **Principal**: #a1182d (Rojo)
- **Fondo**: Tonos oscuros (#000, #111, #1a1a1a)
- **Texto**: #fff, #e5e5e5, #f5f5f5
- **Acentos**: Gradientes y transparencias

## 📄 Licencia

Este proyecto es privado y de uso educativo/demostrativo.

## 👥 Autores

Damian,Andres y  Davan

- GitHub: [@AkaiInku](https://github.com/AkaiInku)

---

Desarrollado  usando React + Vite
