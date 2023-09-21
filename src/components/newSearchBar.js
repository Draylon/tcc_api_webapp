import React, { useState, useRef, useEffect, Component } from 'react';
import {Input, Dropdown} from 'reactstrap';
import axios from 'axios';
/* import './styles.scss'; */

import {id_} from '../util/staticVariables';


var handleChangeTimeout = null;

export default function NewSearchBar(){
    const [visible, setVisible] = useState(false);
        const [searchValue, setSearchValue] = useState('');
        const [selectedItem, setSelectedItem] = useState(null);
        const [itemsList, setItemsList] = useState([]);
        const dropdownRef = useRef(null);

        
        // click away listener
        useEffect(() => {
            document.addEventListener('mousedown', handleClick, false);
            return () => document.removeEventListener('mousedown', handleClick, false);
        }, []);

        const handleClick = e => {
            if (dropdownRef.current.contains(e.target)) {
            return;
            }
            setVisible(false);
        };



        const currentQuery = (val)=>{
            console.log("querying user input");
            axios.get("http://192.168.0.4:8081/api/v1/loc/searchByName/?search_topic="+val).then(response =>{
                const itemparse = response.data.map( item => {
                    return {
                        id: id_(),
                        name: item.name,
                        type: item.locality +' - '+ item.region +"("+item.region_code+")",
                        latitude:item.latitude,
                        longitude: item.longitude,
                        default_type: item.type,
                        number: item.number,
                        postal_code: item.postal_code,
                        street: item.street,
                        confidence: item.confidence,
                        region: item.region,
                        region_code: item.region_code,
                        county: item.county,
                        locality: item.locality,
                        administrative_area: item.administrative_area,
                        neighbourhood: item.neighbourhood,
                        country: item.country,
                        country_code: item.country_code,
                        continent: item.continent,
                        label: item.label
                    }
                })
                setItemsList(itemparse);
            }).catch(e=>console.error(e));
        }
        const handleChange = e => {
            setSearchValue(e.target.value);
            if (!visible) {
            setVisible(true);
            }
            //send that item as defined location
            /* console.log("handlechange")
            console.log(e) */

            clearTimeout(handleChangeTimeout);
            handleChangeTimeout = setTimeout(currentQuery.bind(null,e.target.value), 1800);
            //send request with current value, after 1.5 seconds

        };

        const selectItem = item => {
            setSearchValue(item.name);
            setSelectedItem(item.id);
            setVisible(false);
            //send that item as defined location
            console.log("selectitem")
            console.log(item)
        };

        const selectChange = e => {
            console.log(e.target.value);
        };
        return (
            <div className='searchbar_comp'>
                <Input type="search" bsSize="lg"
                placeholder="Busque Locais"
                value={searchValue}
                onChange={handleChange}
                onFocus={() => {
                    // if (searchValue) {
                    setVisible(true);
                    // };
                }}
                ></Input>
                <div ref={dropdownRef} className={`dropdown ${visible ? 'v' : ''}`}>
                    {visible && (
                    <ul>
                        {!itemsList && (
                        <li key="zxc" className="dropdown_item">
                            no result
                        </li>
                        )}
                        {/* you can remove the searchFilter if you get results from Filtered API like Google search */}
                        {itemsList &&
                        levenshteinSearchFilter(searchValue, itemsList).map(x => (
                            <li
                            key={x.id}
                            onClick={() => selectItem(x)}
                            className="dropdown_item"
                            >
                            <div className="item_text1">{x.name}</div>
                            <div className="item_text2">{x.type}</div>
                            </li>
                        ))}
                    </ul>
                    )}
                </div>
                {/* <select onChange={selectChange}>
                <option value="seb">sebouh</option>
                <option value="arm">arman</option>
            </select> */}
            </div>
        );
};


function lDist(query,base){
    if(query.length == 0) return base.length;
    if(base.length == 0) return query.length;
    if(query.slice(0,1) == base.slice(0,1)) return lDist(query.slice(1),base.slice(1));
    else{
        return 1 + Math.min(
            lDist(query,base.slice(1)),
            lDist(query.slice(1),base),
            lDist(query.slice(1),base.slice(1))
        )
    }
}

export const levenshteinSearchFilter = (uquery,list,searchBy='name') => {
    let query = uquery.toLowerCase();
    return query
    ? list.filter( y => {
        let x = y[searchBy].toLowerCase()
        if (x.includes(query)) return true;
        let _dist=lDist(query,x);
        return (_dist==query.length || _dist==x.length)
        ? false
        : _dist < Math.floor(x.length*0.75)?
            true: false
    } )
    : list;
};

export const searchFilter = (searchValue, list, searchBy = 'name') => {
    let lowerCaseQuery = searchValue.toLowerCase();
    return searchValue
        ? list.filter(x => x[searchBy].toLowerCase().includes(lowerCaseQuery))
        : list;
};