import {useParams} from "react-router-dom"
import './SearchResults.css'

interface QueryParams {
    query: string
}

export function SearchResults(){
    const params:QueryParams = useParams()
    const searchParams = decodeURIComponent(params.query)
    return (
        <div className={"grid"}>
            {/*<div style={{gridColumnEnd: 2}}>*/}
            <div style={{gridColumnEnd: "2"}}>
                Sidebar
            </div>
            <div style={{gridColumnStart: "2", gridColumnEnd: "span 3"}}>
                Search Results
            </div>
        </div>
    )
}