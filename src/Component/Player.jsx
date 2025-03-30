import { useState } from "react";


export default function Player({ name, symbol}){
    const [editName , setEditName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditing(isEditing){
        setIsEditing((editing) => !editing);
    }

    function handleChange(event){
        setEditName(event.target.value);
    }

    return(
        <li>
            <span className="player">
            {isEditing ? (<input type="text" required value={editName} onChange={handleChange}/>) : (
                <span>{editName}</span>
            )}
            </span>
            <button onClick={handleEditing}>{isEditing ? ('Edit') : ('Save')}</button>
        </li>
    );
}