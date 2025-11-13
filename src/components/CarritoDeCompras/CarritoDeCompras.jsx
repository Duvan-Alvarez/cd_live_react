import { useState } from 'react';
import { useCarrito } from '../../context/useCarrito';
import MetodosPago from './MetodosPago';
import CartItem from './CartItem';
import ResumenCompra from './ResumenCompra';
import TiempoEntrega from './TiempoEntrega';
import Destino from './Destino';
import BotonComprarCarrito from './BotonComprarCarrito/BotonComprarCarrito';
import './CarritoDeCompras.css';

const CarritoDeCompras = () => {
  const {
    carrito,
    carritoAbierto,
    cerrarCarrito,
    eliminarDelCarrito,
    incrementarCantidad,
    decrementarCantidad,
    obtenerTotal,
    calcularDescuento,
    calcularEnvio,
    calcularImpuestos,
    calcularIVA,
    vaciarCarrito,
  } = useCarrito();

  // Función para calcular fecha inicial (entrega regular = 15 días)
  const calcularFechaInicial = () => {
    const hoy = new Date();
    const fechaEntrega = new Date(hoy);
    fechaEntrega.setDate(hoy.getDate() + 15);
    
    const dia = String(fechaEntrega.getDate()).padStart(2, '0');
    const mes = String(fechaEntrega.getMonth() + 1).padStart(2, '0');
    const año = fechaEntrega.getFullYear();
    
    return `${dia}/${mes}/${año}`;
  };

  const [tipoEntrega, setTipoEntrega] = useState('regular');
  const [fechaEntrega, setFechaEntrega] = useState(calcularFechaInicial());
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState(null);
  const [destino, setDestino] = useState({
    ciudad: 'Medellín - Colombia',
    calle: '',
    codigoPostal: '',
  });

  if (!carritoAbierto) return null;

  const subtotal = obtenerTotal();
  const descuento = calcularDescuento(subtotal);
  const envio = calcularEnvio(subtotal);
  const impuestos = calcularImpuestos(subtotal);
  const iva = calcularIVA(subtotal);
  const total = subtotal - descuento + envio + impuestos + iva;

  const formatearPrecio = (precio) => {
    return `$${precio.toLocaleString('es-CO', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}`;
  };

  const handleComprar = () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    
    if (!destino.calle || !destino.codigoPostal) {
      alert('Por favor completa la información de destino');
      return;
    }

    if (!metodoPagoSeleccionado) {
      alert('Por favor selecciona un método de pago');
      return;
    }

    // Mostrar confirmación
    const confirmacion = `✅ ¡Compra realizada con éxito!\n\nTotal: ${formatearPrecio(total)}\nMétodo de pago: ${metodoPagoSeleccionado.nombre}\nDirección: ${destino.calle}, ${destino.ciudad}\nFecha estimada de entrega: ${fechaEntrega}\n\n¡Gracias por tu compra!`;
    
    alert(confirmacion);
    
    // Vaciar el carrito y cerrar
    vaciarCarrito();
    cerrarCarrito();
    
    // Resetear estados
    setMetodoPagoSeleccionado(null);
    setDestino({
      ciudad: 'Medellín - Colombia',
      calle: '',
      codigoPostal: '',
    });
  };

  return (
    <div className="carrito-overlay" onClick={cerrarCarrito}>
      <div className="carrito-container" onClick={(e) => e.stopPropagation()}>
        <div className="carrito-header">
          <h2>Carrito de Compras</h2>
          <button className="btn-cerrar" onClick={cerrarCarrito}>×</button>
        </div>

        <div className="carrito-contenido">
          {/* Lista de productos */}
          <div className="carrito-productos">
            {carrito.length === 0 ? (
              <p className="carrito-vacio">El carrito está vacío</p>
            ) : (
              carrito.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrementar={incrementarCantidad}
                  onDecrementar={decrementarCantidad}
                  onEliminar={eliminarDelCarrito}
                />
              ))
            )}
          </div>

          {/* Panel lateral */}
          <div className="carrito-lateral">
            {/* Resumen de compra */}
            <ResumenCompra
              descuento={descuento}
              subtotal={subtotal}
              envio={envio}
              impuestos={impuestos}
              iva={iva}
              total={total}
              formatearPrecio={formatearPrecio}
            />

            {/* Tiempo de entrega */}
            <TiempoEntrega
              fechaEntrega={fechaEntrega}
              tipoEntrega={tipoEntrega}
              onCambiarFecha={(e) => setFechaEntrega(e.target.value)}
              onCambiarTipo={(e) => setTipoEntrega(e.target.value)}
            />

            {/* Destino */}
            <Destino
              destino={destino}
              onCambiarDestino={setDestino}
            />

            {/* Método de Pago */}
            <MetodosPago onSeleccionarMetodo={setMetodoPagoSeleccionado} />

            {/* Botón de compra */}
            <BotonComprarCarrito onClick={handleComprar} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritoDeCompras;
