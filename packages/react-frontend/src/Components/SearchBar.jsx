import React, { useState } from "react";

function SearchBar(props){
    const [search, setSearch] = useState([]);

    function submitSearch(){
        props.search(search);
        setSearch([]);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearch(value);
    };

    return (
        <form action="/search" method="get">
            <input type="text" name="q" class="search-input" placeholder="Search..." onChange={handleChange}/>
            <input type="button" value="Search" onClick={submitSearch} />
        </form>
    );
}

export default SearchBar;
