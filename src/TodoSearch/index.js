import React, {useContext, useState} from "react";
import { TodoContext } from "../TodoContext";
import './TodoSearch.css';
function TodoSearch(){

    const {searchValue, setSearchValue} = useContext(TodoContext);

    const [busqueda, setBusqueda] = useState('');
    const onSearchValueChang = (event) =>{
        const search = event.target.value;
        setBusqueda((search !== '') ? true : false);
        setSearchValue(search);
    }

    return[
        <input 
            className='TodoSearch'
            placeholder="Buscar..."
            value={searchValue}
            onChange={onSearchValueChang} />,
            <p>{busqueda && 'Search: '} {searchValue}</p>
    ];
}

export {TodoSearch};