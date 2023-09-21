import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { UserIcon } from '../img/svgIcons';

class UserLoginButton extends Component {

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
            <div className='usermenu_comp navmenu_icon_iv'
            onClick={()=>{
                alert("login modal")
            }}
            >
                <UserIcon/>
            </div>
        );
    }
}

export default UserLoginButton;