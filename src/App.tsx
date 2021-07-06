import React from 'react';
import logo from './logo.svg';
import {Counter} from './features/counter/Counter';
import './App.scss';
import {SearchBar} from "./app/SearchBar/SearchBar";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {SearchResults} from "./app/SearchResults/SearchResults";
import {Upload} from "./app/Upload/Upload";
import {Home} from "./app/Home/Home";
import {OneVideo} from "./app/OneVideo/OneVideo";
import {Login} from "./app/LoginReg/Login/LoginReg";
import {selectLoggedIn} from "./app/LoginReg/Login/loginSlice";
import {useAppSelector} from "./app/hooks";

import "./fonts.scss";

function App() {

    return (
        <div id={"App"}>
            <Router>
                <div id={"header"}>
                    <Link style={{display: "inline-block"}} to={"/"}><p
                        id={"logo"}>GroupShare</p></Link>
                    <div style={{textAlign: "center", paddingTop: "7px"}}>
                        <SearchBar/>
                    </div>
                    <div style={{paddingTop: "5px"}}>
                        <Link style={{display: "inline-block", padding: "0 15px 0 15px"}}
                              to={"/login"}>{useAppSelector(selectLoggedIn) ? "Switch User" : "Login"}</Link>
                        <Link style={{display: "inline-block", padding: "0 15px 0 15px"}}
                              to={"/upload"}>Upload</Link>
                    </div>
                </div>
                <Switch>
                    <Route exact path={"/"}>
                        <Home/>
                    </Route>
                    <Route exact path={"/watch/:id"}>
                        <OneVideo/>
                    </Route>
                    <Route path={"/results/search_query=:query"}>
                        <SearchResults/>
                    </Route>
                    <Route path={"/login"}>
                        <Login/>
                    </Route>
                    <Route path={"/upload"}>
                        <Upload/>
                    </Route>

                </Switch>
            </Router>
        </div>
    )

}

export default App;
