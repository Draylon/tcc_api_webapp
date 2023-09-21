import React, { Component } from 'react';
import {Input, Dropdown} from 'reactstrap';

class NavSearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
        //stonks:0
        }
        //this.raisestonks = this.raisestonks.bind(this);
    }

    /* raisestonks() {
        this.setState({
        stonks:this.state.stonks+1
        })
        
    } */

    render(){
        return(
            <div className='searchbar_comp'>
                <Input type="search" bsSize="lg"></Input>
                <Dropdown/>
            </div>
        );
    }
}

export default NavSearchBar;