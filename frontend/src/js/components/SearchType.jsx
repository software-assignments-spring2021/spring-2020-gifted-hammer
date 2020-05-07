
import React from "react";

const SearchType = (props) => {
    return (
        <select className='searchType' onChange={props.handleChange}>
            <option value="recommend">by artist</option>
            <option value="location">by location</option>
        </select>
    );
};

export default SearchType;
