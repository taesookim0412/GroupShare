import React from 'react';
import logo from './logo.svg';
import {Counter} from './features/counter/Counter';
import './App.css';
import {SearchBar} from "./app/SearchBar/SearchBar";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {SearchResults} from "./app/SearchResults/SearchResults";
import {Upload} from "./app/Upload/Upload";
import {Home} from "./app/Home/Home";
import {OneVideo} from "./app/OneVideo/OneVideo";

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <div style={{display: "flex", justifyContent:"space-between"}}>
                        <Link style={{display: "inline-block", padding:"0 15px 0 15px"}} to={"/"}>Home</Link>
                        <SearchBar />
                        <Link style={{display: "inline-block", padding:"0 15px 0 15px"}} to={"/upload"}>Upload</Link>
                    </div>
                </div>
                <Switch>
                    <Route exact path={"/"}>
                        <Home />
                    </Route>
                    <Route exact path={"/watch/:id"}>
                        <OneVideo />
                    </Route>
                    <Route path={"/results/search_query=:query"}>
                        <SearchResults/>
                    </Route>
                    <Route path={"/upload"}>
                        <Upload/>
                    </Route>

                </Switch>
            </Router>
        </div>
    );
}

export default App;
