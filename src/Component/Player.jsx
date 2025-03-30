import { useState } from "react";


export default function Player({ name, symbol, isActive, onChangeName}){
    const [editName , setEditName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditing(isEditing){
        setIsEditing((editing) => !editing);

        if(isEditing){
        onChangeName(symbol, editName);
        }
    }

    function handleChange(event){
        setEditName(event.target.value);
    }

    return(
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
            {isEditing ? (<input type="text" required value={editName} onChange={handleChange}/>) : (
                <span>{editName}</span>
            )}
            </span>
            <span className="player-symbol">{symbol}</span>
            <button onClick={handleEditing}>{isEditing ? ('Save') : ('Edit')}</button>
        </li>
    );
}