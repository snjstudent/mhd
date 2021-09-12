import Header from '../Header/index';
import logo_drawing from '../shared/Icons/drawing_test.jpeg';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import demoimage from '../shared/Icons/resultdemo.png';
import { Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


const MainPageStyles = {
    Main: {
        marginTop: '2%',
        // marginLeft:'10%',
    },
    Title: {
        textAlign:'center',
        fontSize: '300%',
        fontWeight: 500,
        
    },
    Explanation: {
        display: 'flex',
        marginTop: '5%',
        fontSize: '110%',
        fontWeight: 70,
    },
    ExplanationText: {
      marginRight:'10%',  
    },
    
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
      position: 'relative',
      marginTop:'1%',
    height: 500,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: demoimage,
    title: 'TRY NOW',
    width: '100%',
    }
]

export default function MainPage() {
    const classes = useStyles();
    const history = useHistory();
    const Redirect=() => {
        history.push('/input');
    };
    return (
        <div>
            <div style={MainPageStyles.Main }>
                <div style={MainPageStyles.Title}>線画判定+フィードバックAIによる<br /> 絵画技能向上のためのサイト</div>
                {/* <div style={MainPageStyles.Explanation}>
                    <div style={MainPageStyles.ExplanationText}>
                        ここは説明の部分。<br />
                        多分こんな感じで書くところになる。・・・・・・・・・・・・・<br />
                        行数的には何行ぐらい？
                    </div>
                    
                </div> */}
    
            </div>
            <div className={classes.root}>
                {images.map((image) => (
        
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
          }}
         onClick={Redirect}        >
                        
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
          
                        </ButtonBase>
        
      ))}
    </div>
        </div>
        
    );
}