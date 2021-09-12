import React from 'react';
import {AppBar,Typography,Toolbar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HeadersButton from './Buttons';
import { HeadersLogo, GithubLogo } from './Logos';
import logo_drawing from '../shared/Icons/drawing_icon.png'
import logo_github from '../shared/Icons/github_logo.png'
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // flexGrow: 1,
    fontSize: 50,
    fontWeight:250,
    marginRight: '5%',
    color: '#4F0067',
  },
  subtitle: {
    color: 'gray',
    marginBottom: '0%',
    // padding: '0px',
    // position: 'relative',
    top: '-10%',
    // bottom: '-10rem',
    fontSize: 'small',
    fontWeight: 100,
  },
  HeadersLogo: {
    marginLeft: '0%',
    marginRight: '2%',
    marginBottom: '1%',
    marginTop:'1%',
    flexGrow: 0,
    maxWidth: '5%',
  },
  GitHubLogo: {
    flexGrow :1 ,
    maxWidth: '20%',
    marginLeft: 'auto',
    marginRight:0,
    // maxHeight:'1%',
  },
}));


export default function Header(){
    const classes = useStyles();
    return (
      <div className={classes.root}>
        {/* ここで色指定を行っている */}
        <AppBar position="static" style={{ background: '#FFFFFF', }}>
          <Toolbar>
            {/* 左寄せ（のつもり） */}
            <div style={{ flexGrow: 0 }}></div>
            <img src={logo_drawing} alt='GitHubLogo' className={classes.HeadersLogo}></img>
            
            {/* タイトル */}
            <div style={{ flexGrow: 0 }}></div>
            <div className={classes.title}>
                <div style={{ marginTop: '-0%' }}><Link to='/' style={{ textDecoration: 'none' }}>M・H・D</Link></div>
                <div style={{ fontSize: 'small', fontWeight: 150,marginTop:'-7%', }}>Mimicry-Human-Drawing</div>
            </div>
            
            <HeadersButton></HeadersButton>

            {/* 右寄せ（のつもり） */}
            {/* <div style={{ flexGrow: 1 }}></div>
            <Link to='/' className={classes.GitHubLogo}>
              <img src={logo_github} alt='GitHubLogo' className={classes.GitHubLogo } />  
            </Link> */}
            
          </Toolbar>
          
        </AppBar>
      </div>
    );
}