import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import PropTypes from 'prop-types';

export default function SortBy({options}) {
    const [searchParams , setSearchParams] = useSearchParams();
    const sortBy = searchParams.get('sortBy') || "";

    function handleChange(e){
        searchParams.set('sortBy' , e.target.value);
        setSearchParams(searchParams);    
    }
    
    return(
       <Select options={options} type="white" onChange={handleChange} value={sortBy}/>
    )
}

SortBy.propTypes = {
    options : PropTypes.arrayOf(
        PropTypes.shape({
            value : PropTypes.string.isRequired,
            label : PropTypes.string.isRequired
        })
    ).isRequired
}