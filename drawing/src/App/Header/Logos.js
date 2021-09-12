import React from 'react';
import logo_drawing from '../shared/Icons/drawing_test.jpeg'
import logo_github from '../shared/Icons/github_logo.png'


const GithubLogoStyle = {
    textAlign:'right',
    width: '10%',
    height:'1%',
}
const HeadersLogoStyle = {
    textAlign:'left',
    width: '100%',
    height:'100%',
}
export function GithubLogo(){
        return (
            <div>
                <img src={logo_github} alt='GitHubLogo' style={ GithubLogoStyle} />
            </div>
        );
}

export function HeadersLogo(){
        return (
            <div>
                <img src={logo_drawing} alt='HeadersLogo' style={HeadersLogoStyle} />
            </div>
        );
}

