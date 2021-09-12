import React from 'react';
import {Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


const HeaderButton = {
    AllButton: {
        fontColor:'#4F0067',
    },
    
}


export default function HeadersButton() {
    
        return (
            <div style={HeaderButton.AllButton}>
                <Link to='/input' style={{ textDecoration: 'none' }}><Button style={{color:'#4F0067'}}>TRY</Button></Link>
                <Link to='/about' style={{ textDecoration: 'none' }}><Button style={{color:'#4F0067'}}>ABOUT</Button></Link>
                <Link to='/news' style={{ textDecoration: 'none' }}><Button style={{color:'#4F0067'}}>NEWS</Button></Link>
                <Link to='/contact' style={{ textDecoration: 'none' }}><Button style={{color:'#4F0067'}}>CONTACT</Button></Link>
            </div>
        );
}

