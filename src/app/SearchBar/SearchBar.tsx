import React, {ChangeEvent, useState} from "react";
import {useHistory} from "react-router-dom";
import {useAppDispatch} from "../hooks";
import {pushSearchClick} from "../Videos/videosSlice";
import "./SearchBar.scss"
import {ThunkDispatch} from "@reduxjs/toolkit";

function handleChange(event: ChangeEvent<HTMLInputElement>, setSearchStr: React.Dispatch<React.SetStateAction<string>>){
    event.preventDefault()
    setSearchStr(event.target.value)
}
function onClickButton(history: any, searchStr: string, dispatch: ThunkDispatch<any, any, any>){
    history.push(`/results/search_query=${encodeURIComponent(searchStr)}`)
    dispatch(pushSearchClick())
}

export function SearchBar(){
    const [searchStr, setSearchStr] = useState("")
    const history = useHistory()
    const dispatch = useAppDispatch()



    return (
        <div style={{display: "inline-block", textAlign:"center"}}>
            <form onSubmit={(e) => { e.preventDefault(); onClickButton(history, searchStr, dispatch)}}>
                <input type={"text"} id={"searchText"} value={searchStr} onChange={(e) => handleChange(e, setSearchStr)}/><button className={"button__square"} id={"searchButton"}>Search</button>
            </form>
        </div>
    )
}
