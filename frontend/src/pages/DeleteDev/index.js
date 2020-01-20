import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css'

export default function DeleteDev() {
    const { github_username } = useParams();
    let history = useHistory();

    const [dev, setDev] = useState(null);

    useEffect(() => {
        async function loadDev(){

            try {
                const response = await api.get(`/devs/${github_username}`);
                setDev(response.data);
            } catch (err) {
                history.push("/");
            }            
        }
        loadDev();
    }, [github_username, history]);

    async function handleDeleteDev() {
        await api.delete(`/devs/${github_username}/`);
        history.go("/");
    }

    return (   
        <div className="delete-container">
            {dev && 
                <div className="delete-dev-toast">
                    <p>
                        Tem certeza que deseja deletar o dev <span className="username">{dev.github_username}</span>?
                    </p>
                    <div className="dev">
                        <img src={dev.avatar_url} alt={dev.name} className="avatar"/>
                        <div className="dev-info">
                            <strong>{dev.name}</strong>
                            <span>{dev.techs.join(", ")}</span>
                            <p>{dev.bio}</p>
                        </div>
                    </div>
                    <div className="action-buttons">
                        <button className="delete-button" onClick={handleDeleteDev}>Confirmar</button>
                        <Link to="/">Cancelar</Link>
                    </div>
                </div>
            }
        </div>
    );
}
