import React, {ChangeEvent, useState} from "react";
import {useHistory} from "react-router-dom";
import {useAppDispatch} from "../hooks";
import {pushSearchClick} from "../Videos/videosSlice";

export function SearchBar(){
    const [searchStr, setSearchStr] = useState("")
    const history = useHistory()
    const dispatch = useAppDispatch()

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        event.preventDefault()
        setSearchStr(event.target.value)
    }
    function onClickButton(){
        history.push(`/results/search_query=${encodeURIComponent(searchStr)}`)
        dispatch(pushSearchClick())
    }

    return (
        <div style={{display: "inline-block", textAlign:"center"}}>
            <form onSubmit={(e) => { e.preventDefault(); onClickButton()}}>
                <input type={"text"} value={searchStr} onChange={handleChange}/><button>Search</button>
            </form>
        </div>
    )
}