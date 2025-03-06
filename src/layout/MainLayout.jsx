import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const MainLayout = () => {
    return (
        <div className='w-8/12 mx-auto border-2 border-teal-500'>
            <header>
            <NavBar></NavBar>
            </header>
            <main>
            <Outlet></Outlet>
            </main>
            <footer>

            </footer>
        </div>
    );
};

export default MainLayout;