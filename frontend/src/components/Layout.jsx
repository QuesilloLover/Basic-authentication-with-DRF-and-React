import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="login">Iniciar Sesión</Link>
                    </li>
                    <li>
                        <Link to="register">Regístrate</Link>
                    </li>
                </ul>
            </nav>
            <hr />
            <Outlet />
        </div>
    );
}