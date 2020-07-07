import React,{Component} from 'react';
import EpHeader from "../ep-header/epHeader";
import { Link } from 'react-router-dom';
import s from './statistic.module.css'

export default class StatisticScreen extends Component {

    saySentences = (sentences) => {
        const audio = new Audio(`https://raw.githubusercontent.com/timon4ik2102/rslang-data/master/${sentences}`);
        audio.play();
    }


    render () {
        const { location } = this.props;
        const trueNumber = `${location.state.statistic.trueSentences.length}`;
        const falseNumber = `${location.state.statistic.falseSentences.length}`;
        return (
            <div>
                <div className={s.background}>
                </div>
                <EpHeader/>
                <div className={s.mainBase}>
                    <div>
                    <h3>
                        I don't know <span className={s.title_false}>{falseNumber} </span>
                    </h3>
                    {location.state.statistic.falseSentences.map((field,i) => (
                        <div className={s.sentences} key={i.toString() + 'd3'} >
                            <button className={s.speaker_btn} onClick={()=>this.saySentences(field.audio)}></button>
                            {field.sentences}
                        </div>
                    ))}
                    </div>
                    <h3>
                        I know <span className={s.title_true}>{trueNumber} </span>
                    </h3>
                    <div>
                    {location.state.statistic.trueSentences.map((field,i) => (
                        <div className={s.sentences} key={i.toString() + 'd4'} >
                            <button className={s.speaker_btn} onClick={()=>this.saySentences(field.audio)}></button>
                            {field.sentences}
                        </div>
                    ))}
                    <Link to={{pathname: '/english-puzzle/game'}} >
                        <button className={s.continue_btn } >Continue</button>
                    </Link>
                    </div>
                </div>
            </div>
        )
    }
}

