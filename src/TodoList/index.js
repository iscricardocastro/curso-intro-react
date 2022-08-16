import React from "react";
import './TodoList.css';
function TodoList(props){
    // const {children} = {...props};
    return(
        <section>
            <ul>
                {props.children}
            </ul>
        </section>
    );

}

export {TodoList};