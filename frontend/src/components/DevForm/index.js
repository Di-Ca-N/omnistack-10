import React, {useState, useEffect} from 'react';

import './styles.css';

export default function DevForm({ onSubmit, initialData={}, editing=false }) {
    const [github_username, setGithubUsername] = useState(initialData.github_username || "");
    const [techs, setTechs] = useState(initialData.techs || "");
    const [latitude, setLatitude] = useState(initialData.latitude || "");
    const [longitude, setLongitude] = useState(initialData.longitude || "");
    const [bio, setBio] = useState(initialData.bio || "");

    useEffect(() => {
        if (!editing) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    setLatitude(latitude);
                    setLongitude(longitude);
                },
                (error) => {
                    console.log(error);
                },
                {
                    timeout: 30000,
                });
        }
    }, [editing]);

    async function handleSubmit(event){
        event.preventDefault();
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
            bio,
        });

        setGithubUsername("");
        setTechs("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do GitHub</label>
                <input 
                    type="text" 
                    name="github_username" 
                    id="github_username" 
                    value={github_username}
                    onChange={editing ? () => {} : (e) => setGithubUsername(e.target.value)}
                    readOnly={editing}
                    disabled={editing}
                    required
                />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input 
                    type="text" 
                    name="techs" 
                    id="techs"
                    value={techs}
                    onChange={(e) => setTechs(e.target.value)}
                    required
                />
            </div>

            { editing && 
                <div className="input-block">
                    <label htmlFor="bio">Bio</label>
                    <textarea 
                        type="text"
                        name="bio"
                        id="bio"
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        required
                    />
                </div>
            }

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input 
                        type="number" 
                        name="latitude" 
                        id="latitude" 
                        value={latitude} 
                        onChange={(e) => setLatitude(e.target.value)} 
                        required
                    />
                </div>
                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input 
                        type="number" 
                        name="longitude" 
                        id="longitude" 
                        value={longitude} 
                        onChange={(e) => setLongitude(e.target.value)}  
                        required
                    />
                </div>
            </div>
            <button type="submit">Salvar</button>
        </form>
    );
}
