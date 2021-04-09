import React, { useState } from 'react';

const SearchFilter = (props) => {
    const [keyword, setKeyword] = useState('')
    const BarStyling = {width:"20rem",background:"white", boxShadow: '0 5px 10px 0 rgba(0, 0, 0, .15)', border:"none", padding:"0.5rem", margin:"2rem"};
    return (
        <input 
        style={BarStyling}
        key="random1"
        value={keyword}
        placeholder={"search reviews"}
        onChange={(e) => {
            setKeyword(e.target.value)
            props.onChange(e.target.value)
        }}
        />
    );
}

export default SearchFilter