import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Usuario.css'

export function Usuario() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState({
    nombre: 'Nicolas Moreno Zapata',
    celular: '+573145502380',
    email: 'NicolasMorenoP@gmail.com',
    direccionActual: 'Cr43 # 25 bb 31',
    tarjetaEnUso: '1112345567889',
    imagenPerfil: null
  })

  const [pedido] = useState({
    numero: '#345',
    estados: {
      confirmado: true,
      preparado: true,
      enviado: true,
      enReparto: true,
      entregado: true
    },
    direccion: 'Cr43 # 25 bb31',
    pais: 'Colombia',
    ciudad: 'Medellin'
  })

  const [mostrarModalDatos, setMostrarModalDatos] = useState(false)
  const [mostrarModalDireccion, setMostrarModalDireccion] = useState(false)
  const [mostrarModalTarjeta, setMostrarModalTarjeta] = useState(false)

  const [datosTemp, setDatosTemp] = useState({})
  const [direccionTemp, setDireccionTemp] = useState('')
  const [tarjetaTemp, setTarjetaTemp] = useState('')

  const abrirModalDatos = () => {
    setDatosTemp({ ...usuario })
    setMostrarModalDatos(true)
  }

  const abrirModalDireccion = () => {
    setDireccionTemp(usuario.direccionActual || '')
    setMostrarModalDireccion(true)
  }

  const abrirModalTarjeta = () => {
    setTarjetaTemp(usuario.tarjetaEnUso || '')
    setMostrarModalTarjeta(true)
  }

  const guardarDatos = () => {
    setUsuario({ ...datosTemp })
    // Guardar en localStorage
    localStorage.setItem('datosUsuario', JSON.stringify(datosTemp))
    setMostrarModalDatos(false)
  }

  const guardarDireccion = () => {
    setUsuario(prev => ({ ...prev, direccionActual: direccionTemp }))
    // Guardar en localStorage
    const datosActuales = JSON.parse(localStorage.getItem('datosUsuario') || '{}')
    localStorage.setItem('datosUsuario', JSON.stringify({ ...datosActuales, direccionActual: direccionTemp }))
    setMostrarModalDireccion(false)
  }

  const guardarTarjeta = () => {
    setUsuario(prev => ({ ...prev, tarjetaEnUso: tarjetaTemp }))
    // Guardar en localStorage
    const datosActuales = JSON.parse(localStorage.getItem('datosUsuario') || '{}')
    localStorage.setItem('datosUsuario', JSON.stringify({ ...datosActuales, tarjetaEnUso: tarjetaTemp }))
    setMostrarModalTarjeta(false)
  }

  const borrarDireccion = () => {
    if (confirm('¿Estás seguro de eliminar la dirección?')) {
      setUsuario(prev => ({ ...prev, direccionActual: '' }))
      const datosActuales = JSON.parse(localStorage.getItem('datosUsuario') || '{}')
      localStorage.setItem('datosUsuario', JSON.stringify({ ...datosActuales, direccionActual: '' }))
    }
  }

  const borrarTarjeta = () => {
    if (confirm('¿Estás seguro de eliminar la tarjeta?')) {
      setUsuario(prev => ({ ...prev, tarjetaEnUso: '' }))
      const datosActuales = JSON.parse(localStorage.getItem('datosUsuario') || '{}')
      localStorage.setItem('datosUsuario', JSON.stringify({ ...datosActuales, tarjetaEnUso: '' }))
    }
  }

  const cerrarSesion = () => {
    localStorage.removeItem('sesionIniciada')
    window.dispatchEvent(new Event('storage'))
    navigate('/')
  }

  const manejarCambioImagen = (evento) => {
    const archivo = evento.target.files[0]
    if (archivo) {
      // Verificar que sea una imagen
      if (!archivo.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen')
        return
      }

      // Crear URL temporal para la imagen
      const reader = new FileReader()
      reader.onloadend = () => {
        setUsuario(prev => ({
          ...prev,
          imagenPerfil: reader.result
        }))
        // Guardar en localStorage
        localStorage.setItem('imagenPerfil', reader.result)
      }
      reader.readAsDataURL(archivo)
    }
  }

  const eliminarImagen = () => {
    setUsuario(prev => ({
      ...prev,
      imagenPerfil: null
    }))
    localStorage.removeItem('imagenPerfil')
  }

  // Cargar imagen guardada al iniciar
  useEffect(() => {
    const imagenGuardada = localStorage.getItem('imagenPerfil')
    const datosGuardados = localStorage.getItem('datosUsuario')
    
    if (imagenGuardada || datosGuardados) {
      setUsuario(prev => ({
        ...prev,
        ...(datosGuardados ? JSON.parse(datosGuardados) : {}),
        imagenPerfil: imagenGuardada || prev.imagenPerfil
      }))
    }
  }, [])

  return (
    <div className="paginaUsuario">
      <div className="contenedorUsuario">
        {/* Columna izquierda - Información del usuario */}
        <div className="columnaIzquierda">
          <div className="tarjetaUsuario">
            <div className="imagenUsuario">
              <div className="avatarPlaceholder">
                {usuario.imagenPerfil ? (
                  <img src={usuario.imagenPerfil} alt="Foto de perfil" className="fotoPerfil" />
                ) : (
                  <span className="iniciales">
                    {usuario.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                )}
              </div>
              <div className="botonesImagen">
                <label htmlFor="inputImagen" className="botonCargarImagen">
                  <span className="material-symbols-outlined">photo_camera</span>
                  Cambiar Foto
                </label>
                <input
                  id="inputImagen"
                  type="file"
                  accept="image/*"
                  onChange={manejarCambioImagen}
                  style={{ display: 'none' }}
                />
                {usuario.imagenPerfil && (
                  <button className="botonEliminarImagen" onClick={eliminarImagen}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                )}
              </div>
            </div>

            <h1 className="nombreUsuario">{usuario.nombre}</h1>

            <div className="infoContacto">
              <div className="itemContacto">
                <span className="labelContacto">Celular</span>
                <span className="valorContacto">{usuario.celular}</span>
              </div>
              <div className="itemContacto">
                <span className="emailContacto">{usuario.email}</span>
              </div>
            </div>

            <div className="botonesAccion">
              <button className="botonSecundario" onClick={abrirModalDatos}>
                Cambiar Datos
              </button>
              <button className="botonCerrarSesion" onClick={cerrarSesion}>
                Cerrar Sesión
              </button>
            </div>

            <div className="seccionDireccion">
              <div className="headerSeccion">
                <span className="labelSeccion">Direcion actual</span>
                <span className="valorSeccion">{usuario.direccionActual}</span>
              </div>
              <div className="botonesSeccion">
                <button className="botonSecundario" onClick={abrirModalDireccion}>
                  Agregar Direccion
                </button>
                <button className="botonBorrar" onClick={borrarDireccion}>Borrar</button>
              </div>
            </div>

            <div className="seccionTarjeta">
              <div className="headerSeccion">
                <span className="labelSeccion">Tarjeta en uso</span>
                <span className="valorSeccion">{usuario.tarjetaEnUso}</span>
              </div>
              <div className="botonesSeccion">
                <button className="botonSecundario" onClick={abrirModalTarjeta}>
                  Agregar tarjeta
                </button>
                <button className="botonBorrar" onClick={borrarTarjeta}>Borrar</button>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha - Estado del pedido */}
        <div className="columnaDerecha">
          <div className="tarjetaPedido">
            <h2 className="tituloPedido">Tu pedido</h2>
            <div className="numeroPedido">
              <span className="labelPedido">Num de Pedido</span>
              <span className="valorPedido">{pedido.numero}</span>
            </div>

            <div className="estadosPedido">
              <div className="itemEstado">
                <span className={`checkEstado ${pedido.estados.confirmado ? 'activo' : ''}`}>
                  {pedido.estados.confirmado && '✓'}
                </span>
                <span className="labelEstado">Confirmado</span>
              </div>
              <div className="itemEstado">
                <span className={`checkEstado ${pedido.estados.preparado ? 'activo' : ''}`}>
                  {pedido.estados.preparado && '✓'}
                </span>
                <span className="labelEstado">Preparado</span>
              </div>
              <div className="itemEstado">
                <span className={`checkEstado ${pedido.estados.enviado ? 'activo' : ''}`}>
                  {pedido.estados.enviado && '✓'}
                </span>
                <span className="labelEstado">Enviado</span>
              </div>
              <div className="itemEstado">
                <span className={`checkEstado ${pedido.estados.enReparto ? 'activo' : ''}`}>
                  {pedido.estados.enReparto && '✓'}
                </span>
                <span className="labelEstado">En reparto</span>
              </div>
              <div className="itemEstado">
                <span className={`checkEstado ${pedido.estados.entregado ? 'activo' : ''}`}>
                  {pedido.estados.entregado && '✓'}
                </span>
                <span className="labelEstado">Entregado</span>
              </div>
            </div>

            <div className="direccionPedido">
              <span className="labelDireccion">Direcion</span>
              <span className="valorDireccion">{pedido.direccion}</span>
              <div className="ubicacion">
                <span>{pedido.pais}</span>
                <span>{pedido.ciudad}</span>
              </div>
            </div>

            <div className="selectorPedido">
              <label className="labelSelector">Pedido</label>
              <select className="selectPedido">
                <option value={pedido.numero}>{pedido.numero}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Cambiar Datos */}
      {mostrarModalDatos && (
        <div className="modalOverlay" onClick={() => setMostrarModalDatos(false)}>
          <div className="modalContenido" onClick={(e) => e.stopPropagation()}>
            <h3>Cambiar Datos</h3>
            <div className="formGroup">
              <label>Nombre Completo</label>
              <input
                type="text"
                value={datosTemp.nombre || ''}
                onChange={(e) => setDatosTemp({ ...datosTemp, nombre: e.target.value })}
              />
            </div>
            <div className="formGroup">
              <label>Celular</label>
              <input
                type="text"
                value={datosTemp.celular || ''}
                onChange={(e) => setDatosTemp({ ...datosTemp, celular: e.target.value })}
              />
            </div>
            <div className="formGroup">
              <label>Email</label>
              <input
                type="email"
                value={datosTemp.email || ''}
                onChange={(e) => setDatosTemp({ ...datosTemp, email: e.target.value })}
              />
            </div>
            <div className="botonesModal">
              <button className="botonGuardar" onClick={guardarDatos}>Guardar</button>
              <button className="botonCancelar" onClick={() => setMostrarModalDatos(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Agregar Dirección */}
      {mostrarModalDireccion && (
        <div className="modalOverlay" onClick={() => setMostrarModalDireccion(false)}>
          <div className="modalContenido" onClick={(e) => e.stopPropagation()}>
            <h3>Cambiar Dirección</h3>
            <div className="formGroup">
              <label>Dirección</label>
              <input 
                type="text" 
                placeholder="Ej: Cr43 # 25 bb 31"
                value={direccionTemp}
                onChange={(e) => setDireccionTemp(e.target.value)}
              />
            </div>
            <div className="botonesModal">
              <button className="botonGuardar" onClick={guardarDireccion}>Guardar</button>
              <button className="botonCancelar" onClick={() => setMostrarModalDireccion(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Agregar Tarjeta */}
      {mostrarModalTarjeta && (
        <div className="modalOverlay" onClick={() => setMostrarModalTarjeta(false)}>
          <div className="modalContenido" onClick={(e) => e.stopPropagation()}>
            <h3>Cambiar Tarjeta</h3>
            <div className="formGroup">
              <label>Número de Tarjeta</label>
              <input 
                type="text" 
                placeholder="1234567890123456" 
                maxLength="16"
                value={tarjetaTemp}
                onChange={(e) => setTarjetaTemp(e.target.value)}
              />
            </div>
            <div className="botonesModal">
              <button className="botonGuardar" onClick={guardarTarjeta}>Guardar</button>
              <button className="botonCancelar" onClick={() => setMostrarModalTarjeta(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
