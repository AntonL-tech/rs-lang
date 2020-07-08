import React, {Component} from 'react';
import s from './rowSentences.module.css'
import { Draggable, Droppable } from 'react-drag-and-drop'

//import HTML5Backend from 'react-dnd-html5-backend'
//import { DragDropContext } from 'react-dnd'
//const update = require('immutability-helper');

export default class RowSentences extends Component {

    onDrop(data) {
        if ((this.props.currentRow+1) === this.props.boardLength){
            const index = +(data.word);
            this.props.funcDrag(index,this.props.currentArray)
        }
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
                        type="word" 
                        data={i}
                        className={classNameWord[i]}
                        key={i.toString() + 'd'} 
                        > 
                        <Droppable 
                            types={['word']} 
                            onDrop={this.onDrop.bind(this)} 
                            className={classNameWord[i]}
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
