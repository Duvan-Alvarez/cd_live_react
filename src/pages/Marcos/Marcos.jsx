import { useEffect, useMemo, useState } from 'react'

import { BottonComprar } from '@components/common/BottonComprar/BottonComprar'
import { useCarrito } from '../../context/useCarrito'
import './Marcos.css'

import albumsData from '@api/albums.json'
import { obtenerAsset } from '@data/obtenerAsset'


export function Marcos() {
  const { agregarAlCarrito, abrirCarrito } = useCarrito()
  
  const albums = useMemo(
    () =>
      albumsData.map((album) => {
        const imagenProcesada = obtenerAsset(album.imagen, { optional: true }) || album.imagen

        let imagenAlbumProcesada = ''
        if (album.imagenAlbum) {
          imagenAlbumProcesada = obtenerAsset(album.imagenAlbum, { optional: true }) || album.imagenAlbum
        }

        return {
          ...album,
          imagen: imagenProcesada,
          imagenAlbum: imagenAlbumProcesada,
        }
      }),
    [],
  )

  const crearIdAlbum = (item) => `${item.artista} - ${item.album}`
  const crearEtiquetaAlbum = (item) => `${item.artista} - ${item.album}`

  const [colorMarco, setColorMarco] = useState('negro')
  const [tamano, setTamano] = useState('mediano')
  const [albumSeleccionadoId, setAlbumSeleccionadoId] = useState(() => (albums[0] ? crearIdAlbum(albums[0]) : ''))
  const [busquedaAlbum, setBusquedaAlbum] = useState(() => (albums[0] ? crearEtiquetaAlbum(albums[0]) : ''))
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false)

  const colores = useMemo(
    () => [
      {
        nombre: 'Madera roja',
        valor: 'rojo',
        textura: obtenerAsset('img/texturas/MaderaRoja.png', { optional: true }),
      },
      {
        nombre: 'Madera oscura',
        valor: 'negro',
        textura: obtenerAsset('img/texturas/MaderaNegra.png', { optional: true }),
      },
      {
        nombre: 'Robleclaro',
        valor: 'roble',
        textura: obtenerAsset('img/texturas/Maderablanca.png', { optional: true }),
      },
      {
        nombre: 'Nogal',
        valor: 'nogal',
        textura: obtenerAsset('img/texturas/MaderaClara.png', { optional: true }),
      },
      {
        nombre: 'Madera oscura',
        valor: 'madera',
        textura: obtenerAsset('img/texturas/MaderaOscura.png', { optional: true }),
      },
    ],
    [],
  )

  const tamanos = useMemo(
    () => ({
      pequeño: '280px',
      mediano: '340px',
      grande: '420px',
    }),
    [],
  )

  const seleccionarAlbumPorId = (id) => {
    setAlbumSeleccionadoId(id)
    const encontrado = albums.find((item) => crearIdAlbum(item) === id)
    if (encontrado) {
      setBusquedaAlbum(crearEtiquetaAlbum(encontrado))
    }

    setMostrarSugerencias(false)
  }

  const colorSeleccionado = useMemo(
    () => colores.find((item) => item.valor === colorMarco) ?? null,
    [colores, colorMarco],
  )

  const dimensionMarco = useMemo(
    () => tamanos[tamano] ?? tamanos.mediano,
    [tamanos, tamano],
  )

  const estiloMarco = useMemo(() => {
    const estiloBase = {
      width: dimensionMarco,
      height: dimensionMarco,
    }

    if (colorSeleccionado?.textura) {
      estiloBase.borderWidth = '15px'
      estiloBase.borderStyle = 'solid'
      estiloBase.borderColor = 'transparent'
      estiloBase.borderImageSource = `url(${colorSeleccionado.textura})`
      estiloBase.borderImageSlice = 40
      estiloBase.borderImageRepeat = 'stretch'
    }

    return estiloBase
  }, [colorSeleccionado, dimensionMarco])

  const albumSeleccionado = useMemo(
    () => albums.find((item) => crearIdAlbum(item) === albumSeleccionadoId) ?? null,
    [albums, albumSeleccionadoId],
  )

  useEffect(() => {
    if (albumSeleccionado) {
      setBusquedaAlbum(crearEtiquetaAlbum(albumSeleccionado))
    }
  }, [albumSeleccionado])

  const opcionesAlbum = useMemo(
    () =>
      albums.map((item) => ({
        id: crearIdAlbum(item),
        etiqueta: crearEtiquetaAlbum(item),
      })),
    [albums],
  )

  const resultadosBusqueda = useMemo(() => {
    const termino = busquedaAlbum.trim().toLowerCase()
    if (!termino) {
      return opcionesAlbum
    }

    return opcionesAlbum.filter((opcion) => opcion.etiqueta.toLowerCase().includes(termino))
  }, [busquedaAlbum, opcionesAlbum])

  const sugerenciasVisibles = useMemo(() => resultadosBusqueda.slice(0, 3), [resultadosBusqueda])

  const confirmarBusquedaActual = () => {
    const termino = busquedaAlbum.trim().toLowerCase()
    if (!termino) {
      setMostrarSugerencias(false)
      return
    }

    const coincidenciaExacta = albums.find(
      (item) => crearEtiquetaAlbum(item).toLowerCase() === termino,
    )

    if (coincidenciaExacta) {
      seleccionarAlbumPorId(crearIdAlbum(coincidenciaExacta))
      return
    }

    const coincidenciaParcial = albums.find((item) =>
      crearEtiquetaAlbum(item).toLowerCase().includes(termino),
    )

    if (coincidenciaParcial) {
      seleccionarAlbumPorId(crearIdAlbum(coincidenciaParcial))
    }

    setMostrarSugerencias(false)
  }

  const manejarBlurBusqueda = () => {
    confirmarBusquedaActual()
    setMostrarSugerencias(false)
  }

  const imagenVinilo = albumSeleccionado?.imagenAlbum || ''
  const nombreAlbumSeleccionado = albumSeleccionado
    ? `${albumSeleccionado.artista} - ${albumSeleccionado.album}`
    : 'Selecciona un álbum'

  const manejarComprarMarco = () => {
    if (!albumSeleccionado) {
      alert('Por favor selecciona un álbum primero')
      return
    }

    const productoMarco = {
      id: `marco-${albumSeleccionado.album}-${colorMarco}-${tamano}`,
      titulo: `Marco ${tamano} - ${albumSeleccionado.album}`,
      artista: `${albumSeleccionado.artista} - Color: ${colorSeleccionado?.nombre || colorMarco}`,
      precio: '$249.900',
      imagen: albumSeleccionado.imagen,
      categoria: 'Marco Personalizado'
    }

    agregarAlCarrito(productoMarco)
    abrirCarrito()
  }

  return (
    <div className="marcos-section">
      <h2 className="titulo">Visualiza tu vinilo en distintos marcos</h2>

      <div className="marco-wrapper">
        <div
          className="marco"
          style={estiloMarco}
        >
          {imagenVinilo ? (
            <div className="vinilo">
              <img src={imagenVinilo} alt={nombreAlbumSeleccionado} />
            </div>
          ) : (
            <div className="vinilo-placeholder">No hay álbum disponible</div>
          )}
        </div>
      </div>

      {/* ✅ NUEVO BLOQUE: Descripción + Botón de compra */}
      <div className="producto-detalle">
        <h3 className="producto-titulo">{nombreAlbumSeleccionado}</h3>
        <p className="producto-descripcion">
          Vinilo personalizado enmarcado con impresión de alta calidad. Ideal para decoración o regalo especial.
        </p>
        <div className="producto-compra">
          <span className="producto-precio">$249.900</span>
          <BottonComprar onClick={manejarComprarMarco} />
        </div>
      </div>
      {/* ✅ FIN NUEVO BLOQUE */}

      <div className="opciones">
        <div className="colores">
          <h3>Colores del marco</h3>
          <div className="color-picker">
            {colores.map((c) => {
              const estiloBoton = c.textura
                ? {
                    backgroundImage: `url(${c.textura})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : { backgroundColor: c.hex }

              return (
                <button
                  key={c.valor}
                  className={`color-btn ${colorMarco === c.valor ? 'activo' : ''}`}
                  style={estiloBoton}
                  onClick={() => setColorMarco(c.valor)}
                  aria-label={`Color ${c.nombre}`}
                />
              )
            })}
          </div>
        </div>

        <div className="tamanos">
          <h3>Tamaño del marco</h3>
          <div className="tamano-picker">
            {Object.keys(tamanos).map((t) => (
              <button
                key={t}
                className={`tamano-btn ${tamano === t ? 'activo' : ''}`}
                onClick={() => setTamano(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="albumes">
          <h3>Busca un álbum</h3>
          <div className="album-search">
            <input
              type="search"
              className="album-searchInput"
              placeholder="Escribe artista o álbum"
              value={busquedaAlbum}
              onChange={(event) => {
                setBusquedaAlbum(event.target.value)
                setMostrarSugerencias(true)
              }}
              onFocus={() => setMostrarSugerencias(true)}
              onBlur={manejarBlurBusqueda}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  confirmarBusquedaActual()
                  setMostrarSugerencias(false)
                }
              }}
            />
          </div>
          {mostrarSugerencias && sugerenciasVisibles.length > 0 ? (
            <ul className="album-searchResults">
              {sugerenciasVisibles.map((opcion) => (
                <li key={opcion.id}>
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => seleccionarAlbumPorId(opcion.id)}
                    className={
                      opcion.id === albumSeleccionadoId ? 'resultado-activo' : undefined
                    }
                  >
                    {opcion.etiqueta}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {mostrarSugerencias && sugerenciasVisibles.length === 0 ? (
            <p className="album-searchEmpty">Sin coincidencias</p>
          ) : null}
        </div>
      </div>
    </div>
  )
} 