import React from 'react';
import s from './app.module.css';

import StartPageText from './StartScreen/startScreen';
import contentImg from './bgImage.svg';

class App extends React.Component {
    render() {
        return (
            <div className={s.gameBg} style={contentStyle}>
                <StartPageText />
            </div>
        );
    }
}

const contentStyle = {
    backgroundImage: `url(${contentImg})`,
};

export default App;

// <h1 className={s.title}>Hello World</h1>
