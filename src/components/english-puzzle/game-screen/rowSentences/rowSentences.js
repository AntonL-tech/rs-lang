import React, {Component} from 'react';


export default class RowSentences extends Component {
    render() {
        const {array,classNameRow,classNameWord,func} = this.props;
        return (
            <div className={classNameRow}>
                {array.map((word, i) => (
                    <div 
                        key={i.toString() + 'd'} 
                        className={classNameWord[i]}
                        onClick={()=>func(i,array)}
                    >
                        {word}
                    </div> 
                ))}
            </div> 
        )
    } 
}
