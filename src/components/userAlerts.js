import React, { Component } from 'react';
import {Button} from 'reactstrap';
import {BellIcon} from '../img/svgIcons';

class UserAlerts extends Component {

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
            <div className='alerts_comp navmenu_icon_iv'
            onClick={()=>{
            }}
            >
                <BellIcon/>
            </div>
        );
    }
}

export default UserAlerts;