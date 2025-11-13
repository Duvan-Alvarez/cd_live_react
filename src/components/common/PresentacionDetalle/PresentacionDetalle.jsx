import './PresentacionDetalle.css'
import { BottonComprar } from '@components/common/BottonComprar/BottonComprar'
import { useCarrito } from '../../../context/useCarrito'
import { obtenerAsset } from '../../../data/obtenerAsset'

export function PresentacionDetalle({ producto, tipo = 'instrumento' }) {
  const { agregarAlCarrito, abrirCarrito } = useCarrito()

  if (!producto) {
    return (
      <div className={`contenedorPresentacion ${tipo}`}>
        <article className="tarjetaProducto">
          <p>No hay datos disponibles.</p>
        </article>
      </div>
    )
  }

  const formatearPrecio = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(valor)
  }

  const manejarAgregarAlCarrito = (evento) => {
    if (evento) {
      evento.preventDefault?.()
      evento.stopPropagation?.()
    }

    let productoCarrito

    if (tipo === 'album') {
      productoCarrito = {
        id: `${producto.album}-${producto.artista}-${producto.categoria}`,
        titulo: producto.album,
        artista: producto.artista,
        precio: formatearPrecio(producto.precio),
        imagen: producto.imagen,
        categoria: producto.categoria,
      }
    } else {
      // tipo === 'instrumento'
      productoCarrito = {
        id: `${producto.nombre}-${producto.descripcion || producto.detalle}`,
        titulo: producto.nombre,
        artista: producto.descripcion || producto.detalle || '',
        precio: formatearPrecio(producto.precio),
        imagen: producto.imagen,
        categoria: producto.categoria,
      }
    }
    
    agregarAlCarrito(productoCarrito)
    abrirCarrito()
  }

  // Renderizado para álbumes
  if (tipo === 'album') {
    const imagenUrl = obtenerAsset(producto.imagen) || producto.imagen
    
    return (
      <div className="contenedorPresentacion album">
        {/* Primera tarjeta: Imagen */}
        <article className="tarjetaProducto">
          {producto.imagen && (
            <div className="imagenProducto">
              <img 
                src={imagenUrl} 
                alt={producto.album}
              />
            </div>
          )}
        </article>

        {/* Segunda tarjeta: Detalles */}
        <article className="tarjetaProducto">
          <div className="detallesProducto">
            <h2>{producto.album}</h2>
            <p className="descripcion">{producto.artista}</p>
            <p className="precio">{formatearPrecio(producto.precio)}</p>
            <BottonComprar onClick={manejarAgregarAlCarrito} />
          </div>
        </article>
      </div>
    )
  }

  // Renderizado para instrumentos (layout de 2 tarjetas)
  const imagenUrlInstrumento = obtenerAsset(producto.imagen) || producto.imagen
  
  return (
    <div className="contenedorPresentacion instrumento">
      {/* Primera tarjeta: Imagen */}
      <article className="tarjetaProducto">
        {producto.imagen && (
          <div className="imagenProducto">
            <img 
              src={imagenUrlInstrumento} 
              alt={producto.nombre}
            />
          </div>
        )}
      </article>

      {/* Segunda tarjeta: Detalles */}
      <article className="tarjetaProducto">
        <h2 className='nombre'>{producto.nombre}</h2>
        <p className="descripcionProducto">
          {producto.detalle}
        </p>
        <div className="precioProducto">
          {formatearPrecio(producto.precio)}
          <div><BottonComprar onClick={manejarAgregarAlCarrito} /></div>
        </div>
      </article>
    </div>
  )
}
