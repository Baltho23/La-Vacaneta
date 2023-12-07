import './footer.css'
import { Button } from '@nextui-org/button'; 
import { Input } from '@nextui-org/input';

export default function Footer() {
    return (
        <footer className="footer" id='footer'>
            <div className="container">
                <div className="footer-items">
                    <ul className='footer-list'>
                        <h6 className='footer-list-title'>
                            Información de contacto
                        </h6>
                        <li className='footer-list-item'>
                            Direccion: Pescaito.
                        </li>
                        <li className='footer-list-item'>
                            Número Telefónico : +1(21) 234 4567
                        </li>
                        <li className='footer-list-item'>
                            Correo : GanaderiaEmpresa-3@gmail.com
                        </li>
                        <li className='footer-list-item'>
                            Soporte : GanaderiaSoporte@gmail.com
                        </li>
                    </ul>
                    <ul className='footer-list'>
                        <h6 className='footer-list-title'>
                            Descubre
                        </h6>
                        <li className='footer-list-item'>
                            Sobre la compañia
                        </li>
                        <li className='footer-list-item'>
                            Ganado
                        </li>
                        <li className='footer-list-item'>
                            Nuestros Servicios
                        </li>
                        <li className='footer-list-item'>
                            Contactanos
                        </li>
                    </ul>
                    <ul className='footer-list'>
                        <h6 className='footer-list-title'>
                            Ayuda
                        </h6>
                        <li className='footer-list-item'>
                            Soporte
                        </li>
                        <li className='footer-list-item'>
                            FAQ
                        </li>
                        <li className='footer-list-item'>
                            Contactanos
                        </li>
                        <li className='footer-list-item'>
                            Problemas tecnicos
                        </li>
                    </ul>
                    <div className="footer-list subscription-section">
                        <h6 className='footer-list-title'>Suscribete</h6>
                        <Input className='mb-3' placeholder='Correo electronico' type='email'></Input>
                        <Button className='mb-3' color='primary'>Enviar</Button>
                        <p>Suscribete a nuestro boletin de información.</p>
                    </div>
                    <div className="copyright-section">
                        © 2023 El Ganado Feliz. Todos los derechos reservados.
                    </div>
                </div>
            </div>
        </footer>
    )
}