import React,{Component} from 'react';
import EpHeader from "../ep-header/epHeader";
import { Link } from 'react-router-dom';
import s from './statistic.module.css'

export default class StatisticScreen extends Component {

    render () {
        const { location } = this.props;

        return (
            <div>
                <div className={s.background}>
                </div>
                <EpHeader/>
                <div className={s.mainBase}>
                    <div>
                    {location.state.statistic.falseSentences.map((field,i) => (
                        <p  key={i.toString() + 'd3'} >
                            {field}
                        </p>
                    ))}
                    </div>
                    <div>
                    {location.state.statistic.trueSentences.map((field,i) => (
                        <p  key={i.toString() + 'd4'} >
                            {field}
                        </p>
                    ))}
                    <Link to={
                            {
                                pathname: '/game',

                            }

                            }><button >Continue</button>
                            </Link>
                    </div>
                </div>
            </div>
        )
    }
}

