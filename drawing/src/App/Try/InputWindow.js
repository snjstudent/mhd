import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import '@fontsource/roboto';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import ButtonBase from '@material-ui/core/ButtonBase';
import Axios from 'axios';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '10%',
        textAlign: 'center',
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft: 'Auto',
        marginRight: 'Auto',
        
    '& > *': {
          margin: theme.spacing(1),
        
    },
  },
  input: {
      display: 'none',
    },
    CalFormButton: {
      marginTop: '10%',
    },
    MuiTypographyButtonPlusText: {
        marginTop: '0%',
        marginBottom: '10%',
        fontSize: '1300%',
    },
    MuiTypographyButtonText: {
        color:'gray',
        fontSize: '150%',
        marginBottom: '4%',
    },
    
}));






export default function InputWindow() {
    const handleChange = (event) => {
        return (
            event.target.files[0]
        );
    };
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const _handleReaderLoaded = (kind,imageUrl,reader) => {
        let binaryString = reader.result;
        
    };
    const SetInputImage = (kind, image) => {
        var imageUrl = URL.createObjectURL(image);
        const reader = new FileReader();
        reader.onload = function () {
            console.log(btoa(reader.result));
            dispatch({ type: kind, image: btoa(reader.result), url:imageUrl });      
        };
        reader.readAsBinaryString(image);
    };

    function toBase64Url(url, callback){
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
            callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    };
    const InputButton = (kind_in, classes) => {
        const kind = kind_in;
        const LUT_Button = {
            'Reference': { 'text': 'REFERENCE IMAGE', 'filename': 'refernce_img' ,'marginright':'10%','action_type':'SET_REFERENCE'},
            'Drawed': { 'text': 'YOUR DRAWED IMAGE', 'filename': 'drawed img' ,'marginright':'0%','action_type':'SET_DRAWED'}
        };
        console.log(kind);
        var imgurl = useSelector((state) => state[kind]);
        console.log(imgurl != null);
        if (imgurl != null) {
            var backgroundUrl = `url(${imgurl[1]})`;
            return (
                <span>
            <input
                accept="image/*"
                className={classes.input}
                id={kind}
                multiple
                type="file"
                name={LUT_Button[kind]['filename']}
                onChange={(event)=>SetInputImage(LUT_Button[kind]['action_type'],handleChange(event))}
            />
            <label htmlFor={kind}>                
            <Button variant="outlined" component="span" style={{ maxWidth: '20%', maxHeight: '30rem', minWidth: '30%', minHeight: '20rem', marginRight: LUT_Button[kind]['marginright'],backgroundImage:backgroundUrl,backgroundColor:'rgba(255,255,255,0.77)',backgroundBlendMode:'lighten',backgroundPosition: 'center'}}>
                <div>
                    <Typography variant="caption">
                        <div className={classes.MuiTypographyButtonPlusText}>
                            +
                        </div>
                    </Typography>
                    <br />

                    <Typography variant="button">
                        <div className={classes.MuiTypographyButtonText}>
                            {LUT_Button[kind]['text']}
                        </div>
                    </Typography>
                </div>
            </Button>
            </label>
            {/* <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                </IconButton>
            </label> */}
        </span>
            );
        }
        else {
            return (
            <span>
                <input
                    accept="image/*"
                    className={classes.input}
                        id={ kind}
                    multiple
                    type="file"
                    name={LUT_Button[kind]['filename']}
                    onChange={(event)=>SetInputImage(LUT_Button[kind]['action_type'],handleChange(event))}
                />
                <label htmlFor={kind}>
                    
                <Button variant="outlined" component="span" style={{ maxWidth: '20%', maxHeight: '30rem', minWidth: '30%', minHeight: '20rem', marginRight: LUT_Button[kind]['marginright'] }}>
                    <div>
                        <Typography variant="caption">
                            <div className={classes.MuiTypographyButtonPlusText}>
                                +
                            </div>
                        </Typography>
                        <br />
                    
                        <Typography variant="button">
                            <div className={classes.MuiTypographyButtonText}>
                                {LUT_Button[kind]['text']}
                            </div>
                        </Typography>
                    </div>
                </Button>
                </label>
                {/* <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                    </IconButton>
                </label> */}
            </span>
                );
            }
    };
    var refimgurl = useSelector((state) => state.Reference);
    var drawedimgurl = useSelector((state) => state.Drawed);
    const HandleSubmit = (event) => {
        
        console.log(refimgurl[0]);
        console.log(drawedimgurl[0]);
        if (refimgurl && drawedimgurl){
            Axios.post('http://127.0.0.1:5000/input/calScore', {
                refimg: refimgurl[0], drawedimg: drawedimgurl[0],
            }).then(function (res) {
                dispatch({ type: 'SET_ADVICE', image: res.data.resultimg });
                dispatch({ type: 'SET_SCORE', score: res.data.score });
                console.log(res.data.resultimg);
                console.log(res.data.score);
                
            });
            history.push('/result');
        };
    };
  return (
    <div className={classes.root}>
        {InputButton('Reference', classes)}
        {InputButton('Drawed', classes)}
          
        <div className={classes.CalFormButton }> 
        <Button variant="outlined" color="DEFAULT" component="span" style={{ maxWidth: '15%', maxHeight: '3rem', minWidth: '15%', minHeight: '3rem' }} onClick={(event)=>HandleSubmit(event)}>
            Upload
        </Button>
        </div>
    </div>
  );
}