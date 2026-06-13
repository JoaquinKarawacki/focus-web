import { Ticker } from './componentes/Ticker'
import { Nav } from './componentes/Nav'
import { Hero } from './componentes/Hero'
import { GrillaProductos } from './componentes/GrillaProductos'
import { ComoComprar } from './componentes/ComoComprar'
import { Confianza } from './componentes/Confianza'
import { Drops } from './componentes/Drops'
import { Footer } from './componentes/Footer'
import { DrawerCarrito } from './componentes/DrawerCarrito'

export default function Pagina() {
  return (
    <>
      <Ticker />
      <Nav />
      <main id="contenido-principal">
        <Hero />
        <GrillaProductos />
        <ComoComprar />
        <Confianza />
        <Drops />
      </main>
      <Footer />
      <DrawerCarrito />
    </>
  )
}
