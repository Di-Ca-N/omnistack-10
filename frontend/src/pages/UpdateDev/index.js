import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import api from '../../services/api';

import DevForm from '../../components/DevForm';

import './styles.css';


export default function UpdateDev() {
    const { github_username } = useParams();
    let history = useHistory();

    const [dev, setDev] = useState(null);

    useEffect(() => {
        async function loadDev() {
            try {
                const response = await api.get(`/devs/${github_username}/`);
                setDev(response.data);
            } catch (err) {
                history.push("/");
            }
        }
        loadDev()
    }, [github_username, history]);

    async function handleSubmit(data) {
        await api.patch(`/devs/${github_username}/`, data);
        history.push("/");
    }

    return (
        <div className="update-container">
            {dev &&
                <div className="form-container">
                    <strong>Atualize-se!</strong>
                    <DevForm 
                        editing
                        initialData={{
                            github_username: dev.github_username,
                            latitude: dev.location.coordinates[1],
                            longitude: dev.location.coordinates[0],
                            bio: dev.bio,
                            techs: dev.techs.join(", "),
                        }}
                        onSubmit={handleSubmit}
                    />
                </div>
            }
        </div>
    );
}
