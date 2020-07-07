import React, {Component} from 'react';
import s from './rowSentences.module.css'

export default class RowSentences extends Component {
    render() {
        const {array,classNameRow,classNameWord,func,currentRow,boardLength} = this.props;

        for (let i = 0; i < classNameWord.length; i++){   // map switch
            if (classNameWord[i] === 'common'){
                classNameWord[i] = s.common_color;
            } else {
                if (classNameWord[i] === 'success'){
                    classNameWord[i] = s.success_color;
                } 
                if (classNameWord[i] === 'error'){
                    classNameWord[i] = s.error_color;
                } 
            }
        }
        
        return (
            <div className={classNameRow}>
                {array.map((word, i) => (
                    <div 
                        key={i.toString() + 'd'} 
                        className={classNameWord[i]}
                        onClick={()=>{
                            if ((currentRow+1) === boardLength){
                                func(i,array)
                            }
                        }}
                    >
                        {word}
                    </div> 
                ))}
            </div> 
        )
    } 
}

    /*switch (classNameWord[i]){
        case 'success':
            classNameWord[i] = s.success_color;
            break;
        case 'error':
            classNameWord[i] = s.error_color;
            break;
        default:
            classNameWord[i] = s.common_color;
    }*/