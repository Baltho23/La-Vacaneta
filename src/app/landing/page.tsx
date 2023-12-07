import "./landing.css"
import Image from "next/image"
import Vaca from "../../assets/images/vaca-patineta.jpg";
import Footer from "../components/footer/footer";

export default function Landing(){
    return (
        <main>
            <section className="banner">
                <div className="banner-container">
                    <div className="banner-container-two">
                        <div className="banner-container-info">
                            <h2 className="banner-title">Bienestar que se saborea..</h2>
                            <p className="banner-text">
                                Nos comprometemos a brindar un entorno enriquecedor y cuidados expertos, 
                                garantizando la salud y felicidad de nuestros animales. 
                                Descubre cómo nuestro enfoque dedicado asegura la calidad y sostenibilidad en cada paso.
                            </p>
                            <a className="btn btn-secondary btn-style mt-5 me-2" href="#discover"> Ver Ganado </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="about-us" id="about-us">
                <div className="container">
                    <div className="flex flex-wrap md:flex-nowrap">
                        <div className="side-img">
                            <Image src={Vaca} alt="Vaca"></Image>
                        </div>
                        <div className="about-us-grid lg:basis-1/2">
                            <h6 className="about-us-title">Sobre nosotros</h6>
                            <h3 className="about-us-subtitle">Creemos Que Un Ganado Feliz Es Un Ganado Sano Y Productivo</h3>
                            <p className="text-gray-500 mb-8">
                                Desde nuestros humildes comienzos, hemos crecido hasta convertirnos 
                                en un referente en la industria ganadera. Hemos perfeccionado nuestros 
                                métodos de cría y cuidado animal, invirtiendo en tecnología y capacitación. 
                                Nuestro compromiso con la calidad y la innovación nos ha llevado a expandirnos 
                                y a establecer sólidas relaciones con clientes que comparten nuestra visión de bienestar animal.
                            </p>
                            <h5 className="font-medium text-lg mb-6">Contamos con más de 30 años de experiencia en el sector ganadero.</h5>
                            <a className="btn btn-secondary btn-style mt-5 me-2" href="#discover"> Leer más </a>
                        </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </main>
    )
}