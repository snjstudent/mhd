import Header from '../Header/index'
import logo_drawing from '../shared/Icons/drawing_test.jpeg'
import Button from '@material-ui/core/Button'


const AboutPageStyles = {
    Main: {
        marginTop: '0%',
        marginLeft:'10%',
    },
    Title: {
        marginTop: '0%',
        marginBottom: '0%',
        fontSize: '580%',
        fontWeight: 200,
        
        
    },
    FirstLetter: {
        fontSize: '165%',
        fontWeight: 330,
        marginRight:'1%',
    },
    Explanation: {
        marginLeft:'5%',
        display: 'flex',
        marginTop: '5%',
        fontSize: '110%',
        fontWeight: 70,
    },
    ExplanationText: {
      marginRight:'10%',  
    },
    
}

export default function Contact() {
    return (
        <div>
            <div style={AboutPageStyles.Main}>
                <p style={AboutPageStyles.Title}>
                    <firstletter style={AboutPageStyles.FirstLetter}>C</firstletter>ontact                    
                </p>
                <div style={AboutPageStyles.Explanation}>
                    <div style={AboutPageStyles.ExplanationText}>
                        Mail<br />
                        mhd_mimicry_human_drawing(at)gmail.com
                    </div>
                    
                </div>
                
            </div>
        </div>
        
    );
}