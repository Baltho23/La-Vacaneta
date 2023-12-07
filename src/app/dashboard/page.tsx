'use client'
import "./dashboard.css"
import RegistroAnimales from "./registro-animales/registro-animales";
import RegistroTrabajadores from "./registro-trabajadores/registro-trabajadores";
import RegistroActividades from "./registro-actividades/registro-actividades";
import PlanPastoreo from "./plan-pastoreo/plan-pastoreo";
import { useState } from "react";
import { useAuth } from "../services/auth.provider";
import { redirect } from "next/navigation";
import ControlInventario from "./control-inventario/control-inventario";

type Modulo = {
    [key: number]: JSX.Element;
};

export default function Dashboard(){

    const [tabviewId, setTabviewId] = useState(1);
    const {user: currentUser} = useAuth();

    const modules: Modulo = {
        1: <RegistroAnimales></RegistroAnimales>,
        2: <ControlInventario></ControlInventario>,
        3: <PlanPastoreo></PlanPastoreo>,
        5: <RegistroActividades></RegistroActividades>,
        7: <RegistroTrabajadores></RegistroTrabajadores>
    }

    function changeTab(event: any) {
        const lastTab = document.querySelector('.dashboard-item.active');
        lastTab?.classList.remove('active');
        const target: HTMLElement = event.target;
        const tabId = Number(target.id.charAt(target.id.length - 1));
        target.classList.add('active');
        setTabviewId(tabId);
    }
    
    if (!currentUser) {
        redirect('/login');
    }
    return (
        <main className="main-container">
            <aside className="dashboard-aside">
                <ul className="dashboard-modules">
                    <h2 className="dashboard-title">Modulos</h2>
                    <section className="dashboard-section">
                        <h2 className="dashboard-subtitle">Ganaderia</h2>
                        <hr className="mb-3"/>
                        <li className="dashboard-item active" id="tabItem-1" onClick={changeTab}>
                            <i className="uil uil-archive"></i>
                            Registro animales
                        </li>
                        <li className="dashboard-item" id="tabItem-2" onClick={changeTab}>
                            <i className="uil uil-archive"></i>
                            Control de inventario
                        </li>
                        <li className="dashboard-item" id="tabItem-3" onClick={changeTab}>
                            <i className="uil uil-archive"></i>
                            Plan pastoreo
                        </li>
                        <li className="dashboard-item" id="tabItem-4" onClick={changeTab}>
                            <i className="uil uil-archive"></i>
                            Salud animales
                        </li>
                    </section>

                    <section className="dashboard-section">
                        <h2 className="dashboard-subtitle">Administrativo</h2>
                        <hr className="mb-3"/>
                        <li className="dashboard-item" id="tabItem-5" onClick={changeTab}>
                            <i className="uil uil-archive"></i>
                            Registro actividad
                        </li>
                        <li className="dashboard-item" id="tabItem-6" onClick={changeTab}>
                            <i className="uil uil-archive"></i>
                            Datos rendimiento
                        </li>
                        <li className="dashboard-item" id="tabItem-7" onClick={changeTab}>
                            <i className="uil uil-archive"></i>
                            Registro trabajadores
                        </li>
                    </section>
                </ul>
            </aside>
            <section className="dashboard-tabview">
                { modules[tabviewId] }
            </section>
        </main>
    );
}
