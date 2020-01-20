import React, { useState, useEffect } from 'react';

import './Sidebar.css';
import './Main.css';

import api from '../../services/api';

import DevItem from '../../components/DevItem';
import DevForm from '../../components/DevForm';

export default function Main() {
    const [devs, setDevs] = useState([]);

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs/');
            setDevs(response.data);
        }
        loadDevs();
    }, []);

    async function handleAddDev(devData) {
        const response = await api.post('/devs/', devData);
        setDevs([...devs, response.data]);
    }

    return (
        <>
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev}/>
            </aside>
            <main>
                <ul>
                    {devs.map(dev => (
                        <DevItem dev={dev} key={dev._id}/>
                    ))}
                </ul>
            </main>
        </>
    );
}
