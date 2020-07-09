import React, {Component} from 'react';
import s from './rowSentences.module.css'
import { Draggable, Droppable } from 'react-drag-and-drop'

export default class RowSentences extends Component {

    constructor(props) {
        super(props);
        this.puzzle = React.createRef();
    }

    onDrop(data) {
        const index = +(data.word);
        this.props.funcDrag(index,this.props.currentArray)
    }

    render() {
        const {array,classNameRow,classNameWord,func,currentRow,boardLength} = this.props;

        for (let i = 0; i < classNameWord.length; i++){  
            if (classNameWord[i] === 'common'){
                classNameWord[i] = s.drag_word ;
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
                      <Draggable
                        ref={this.puzzle}
                        type="word" 
                        data={i}
                        className={classNameWord[i]}
                        key={i.toString() + 'd'} 
                        > 
                        <Droppable 
                            className={classNameWord[i]}
                            types={['word']} 
                            onDrop={this.onDrop.bind(this)}
                            onClick={()=>{
                                if ((currentRow+1) === boardLength){
                                    func(i,array)
                                }
                            }}
                        >
                        {word}
                        </Droppable> 
                    </Draggable> 
                ))}
            </div> 
        )
    } 
}
