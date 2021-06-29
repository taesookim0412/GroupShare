import React, {ChangeEvent, useState} from "react";
import {useHistory} from "react-router-dom";

export function SearchBar(){
    const [searchStr, setSearchStr] = useState("")
    const history = useHistory()

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        event.preventDefault()
        setSearchStr(event.target.value)
    }
    function onClickButton(){
        history.push(`/results/search_query=${encodeURIComponent(searchStr)}`)
    }

    return (
        <div style={{display: "inline-block", textAlign:"center"}}>
            <input type={"text"} value={searchStr} onChange={handleChange}/><button onClick={onClickButton}>Search</button>
        </div>
    )
}