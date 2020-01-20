import React from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

import './styles.css';

export default function DevItem({ dev, showActions = true }) {
  return (
    <li className="dev-item">
        <header>
            <div>
              <img src={dev.avatar_url} alt={dev.name}/>
              <div className="user-info">
                  <strong>{dev.name}</strong>
                  <span>{dev.techs.join(', ')}</span>
              </div>
            </div>
            {showActions && 
              <div className="actions">
                <Link to={`/delete/${dev.github_username}`}>
                  <MdClose />
                </Link>
                <Link to={`/update/${dev.github_username}`}>
                  <MdEdit />
                </Link>
              </div>
            }
        </header>
        <p>{dev.bio}</p>
        <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no github</a>
    </li>
  );
}
