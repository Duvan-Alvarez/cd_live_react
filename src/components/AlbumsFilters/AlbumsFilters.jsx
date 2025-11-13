import './AlbumsFilters.css'

import { FilterButton } from '@components/common/FilterButton/FilterButton'

export function AlbumsFilters({
  refEdicion,
  refPrecio,
  edicionSeleccionada,
  ordenPrecio,
  filtroEspecial,
  menuEdicionVisible,
  menuPrecioVisible,
  onToggleEdicionMenu,
  onTogglePrecioMenu,
  onSeleccionarEdicion,
  onSeleccionarPrecio,
  onAlternarFiltroEspecial,
}) {
  return (
    <section className="filtros">
      <div className="contenedor-filtros">
        <div className="filtro-desplegable" ref={refEdicion}>
          <FilterButton
            className="boton-desplegable"
            isActive={Boolean(edicionSeleccionada)}
            onClick={onToggleEdicionMenu}
          >
            Edición
            <span className={`flecha-desplegable${menuEdicionVisible ? ' rotada' : ''}`}>▼</span>
          </FilterButton>
          <ul className={`menu-desplegable${menuEdicionVisible ? ' mostrar' : ''}`}>
            <button 
              type="button" 
              onClick={() => onSeleccionarEdicion('Estandar')} 
              data-edicion="Estandar"
              className={edicionSeleccionada === 'Estandar' ? 'seleccionado' : ''}
            >
              Estándar
            </button>
            <button 
              type="button" 
              onClick={() => onSeleccionarEdicion('Limitada')} 
              data-edicion="Limitada"
              className={edicionSeleccionada === 'Limitada' ? 'seleccionado' : ''}
            >
              Limitada
            </button>
          </ul>
        </div>

        <div className="filtro-desplegable" ref={refPrecio}>
          <FilterButton
            className="boton-desplegable-precio"
            isActive={Boolean(ordenPrecio)}
            onClick={onTogglePrecioMenu}
          >
            Precio
            <span className={`flecha-desplegable${menuPrecioVisible ? ' rotada' : ''}`}>▼</span>
          </FilterButton>
          <ul className={`menu-desplegable-precio${menuPrecioVisible ? ' mostrar' : ''}`}>
            <button 
              type="button" 
              onClick={() => onSeleccionarPrecio('asc')} 
              data-precio="asc"
              className={ordenPrecio === 'asc' ? 'seleccionado' : ''}
            >
              Menor a Mayor
            </button>
            <button 
              type="button" 
              onClick={() => onSeleccionarPrecio('desc')} 
              data-precio="desc"
              className={ordenPrecio === 'desc' ? 'seleccionado' : ''}
            >
              Mayor a Menor
            </button>
          </ul>
        </div>

        <FilterButton
          isActive={filtroEspecial === 'Promocion'}
          onClick={() => onAlternarFiltroEspecial('Promocion')}
          data-filtro="Promocion"
        >
          Promoción
        </FilterButton>

        <FilterButton
          isActive={filtroEspecial === 'Preventa'}
          onClick={() => onAlternarFiltroEspecial('Preventa')}
          data-filtro="Preventa"
        >
          Preventa
        </FilterButton>
      </div>
    </section>
  )
}
