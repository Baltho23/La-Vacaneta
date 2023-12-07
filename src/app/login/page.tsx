'use client'
import './login.css';
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button";
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../services/auth.provider';
import { API_METHODS, POST } from '../util/fetching';

export default function Login() {

    const {user: currentUser, login, logout} = useAuth();
    const [loginForm, setLoginForm] = useState({usuario: '', clave: ''});
    
    const ingresar = async () => {
        const body = JSON.stringify({
            username: loginForm.usuario,
            password: loginForm.clave
        })
        fetch(API_METHODS.user.login, {...POST, body})
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('token', data.token);
                login(data.usuario);
                redirect("/dashboard");
            }
        ).catch(
            (error) => console.log(error)
        );
    }
    
    function handleLoginForm(event: any) {
        const {name, value} = event.target;
        setLoginForm((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }
    
    if (currentUser) {
        redirect('/dashboard');
    }
    return (
        <section className="login-main">
            <div className="login-container">
                <h1 className="mb-5 text-xl font-bold text-center">Bienvenido</h1>
                <form className="login-form">
                    <Input 
                        name='usuario'
                        type="text" 
                        label="Usuario" 
                        value={loginForm.usuario}
                        onChange={handleLoginForm}
                        required
                    ></Input>
                    <Input 
                        name='clave'
                        type="password" 
                        label="Contraseña" 
                        value={loginForm.clave}
                        onChange={handleLoginForm}
                        required
                    ></Input>
                    <Button color="primary" onPress={ingresar}>Ingresar</Button>
                </form>
            </div>
        </section>
    );
}