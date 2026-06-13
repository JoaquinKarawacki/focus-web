# FOCUS — Tienda Web

Demo de e-commerce para FOCUS (@focus.uy_), marca de streetwear de Montevideo.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Dónde cambiar el catálogo

**`app/datos/catalogo.ts`** — todos los productos viven acá como un array tipado.  
Para agregar una prenda: copiá un objeto existente y modificá sus campos.  
Los tipos están en `app/tipos/producto.ts`.

## Dónde cargar las fotos reales

Cada producto tiene un campo `colorPlaceholder` para el SVG temporal.  
Cuando tengas las fotos:

1. Subí los archivos a `public/productos/` (ej. `remera-essential-black.jpg`)
2. En `TarjetaProducto.tsx`, reemplazá `<PlaceholderPrenda />` por `<Image />` de Next.js apuntando a `/productos/{producto.id}.jpg`

## Checkout

"Coordinar pago y envío" arma el resumen del carrito y abre WhatsApp.  
Para cambiar el número: editá `WHATSAPP_NUMERO` en `app/componentes/DrawerCarrito.tsx`.

## Estructura

```
app/
  componentes/   # UI — Nav, Hero, Ticker, Grilla, Tarjeta, Drops, Footer, Drawer
  contexto/      # CarritoContext (useReducer + localStorage)
  datos/         # catalogo.ts — única fuente de verdad
  tipos/         # TypeScript: Producto, ItemCarrito
  utiles/        # formatearPrecio, formatearMensajeCarrito
```
