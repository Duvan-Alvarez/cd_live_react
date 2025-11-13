import { obtenerAsset } from '@data/obtenerAsset'

import './VideoDestacado.css'

const videoDestacado = obtenerAsset('video/VideoVinilo.mp4')

export function VideoDestacado() {
  return (
    <section className="video">
      <video autoPlay muted loop playsInline>
        <source src={videoDestacado} type="video/mp4" />
      </video>
    </section>
  )
}
