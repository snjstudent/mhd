import logo_drawing from '../shared/Icons/drawing_test.jpeg'
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux';

const ResultPageStyles = {
    Main: {
        marginTop: '5%',
        marginLeft: 'auto',
        marginRight: 'auto',
        
    },
    Title: {
        fontSize: '400%',
        fontWeight: 700,
        
    },
    Explanation: {
        display: 'flex',
        marginTop: '5%',
        fontSize: '110%',
        fontWeight: 70,
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft: 'Auto',
        marginRight: 'Auto',
    },
    RefereceImage: {
        marginRight: '7%',
        textAlign: 'center',
        fontWeight: 700,
        color: 'gray',
    },
    DrawedImage: {
        marginRight: '7%',
        textAlign: 'center',
        fontWeight: 700,
        color: 'gray',
    },
    ErrorImage: {
        textAlign: 'center',
        fontWeight: 700,
        color: 'gray',
    },
    ExplanationText: {
      marginRight:'10%',  
    },
    ImgExpText: {
        marginBottom: '20%',
        marginTop: '5%',
    },
    ResultText: {
        marginTop: '10%',
        fontSize: '250%',
        color: 'gray',
        textAlign: 'center',
        fontWeight: 400,
    },
    ResultScoreBox: {
        marginTop: '0.5%',
        fontSize: '500%',
        textAlign: 'center',
        fontWeight: 250,
        borderBottomStyle: 'solid',
        borderWidth: '20%',
        borderColor: '#ba55d3',
    },

    
}

export default function Result() {
    const dispatch = useDispatch();
    var refimgurl = useSelector((state) => state.Reference)[1];
    var drawedimgurl = useSelector((state) => state.Drawed)[1];
    // var refimgurl = `url(${refimgurl[1]})`;
    // var drawedimgurl = `url(${drawedimgurl[1]})`;
    var resultimgurl = useSelector((state) => state.Advice);
    var resultScore = useSelector((state) => state.score)*100;
    return (
        <div>
            <div style={ResultPageStyles.Main}>
                <div style={ResultPageStyles.Explanation}>
                    <div style={ResultPageStyles.RefereceImage}>
                        <div style={ResultPageStyles.ImgExpText}>
                            YOUR REFERENCE IMAGE
                        </div>
                        <img src={refimgurl} alt='Example' width='150vw' height='200vw' />
                    </div>
                    <div style={ResultPageStyles.DrawedImage}>
                        <div style={ResultPageStyles.ImgExpText}>
                            YOUR DRAWED IMAGE
                        </div>
                        <img src={drawedimgurl} alt='Example' width='150vw' height='200vw' />
                    </div> 
                    <div style={ResultPageStyles.ErrorImage}>
                        <div style={ResultPageStyles.ImgExpText}>
                                ERROR PART
                        </div>
                        <img src={resultimgurl} alt='Example'  width='150vw' height='200vw' />
                    </div>
                </div>
                
                <div style={ResultPageStyles.ResultText}>
                    Result
                </div>
                <div style={ResultPageStyles.ResultScoreBox}>
                    {resultScore}%
                </div>
            </div>
        </div>
        
    );
}