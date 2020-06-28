import React, { Component } from 'react';
import s from './gameScreen.module.css'

import EpHeader from "../ep-header/epHeader";
import ButtonSettings from './buttonSettings/buttonSettings'
import RowSentences from './rowSentences/rowSentences'
export default class GameScreen extends Component {
    state = {
        level: 0,
        page: 0,
        sentencesArray: [], // массив предложений
        sentencesTranslateArray: [], // массив рус предложений  // заполянется запросом
        currentSentencesIndex: 0, // текущий индекс предложения
        currentSentences: '', // текущее предложение
       // currentSentencesСollectedArray: [], // массив собирания !!
        currentSentencesArray: [], // массив откуда собираем !! предложения
       // colorSentencesArray: [], // цвета при чеке !!
        promptAlwaysPronunciation : true, // разрешить перевеод
        isCheckButton: false, // check : display none
        isContinueButton: false,
        isIgnoranceButton: true,
        sentencesArrayBoard:[] // массив собирания !! цвета при чеке !!
    }

    async componentDidMount() {
        await this.getWords(this.state.page);
        
        this.setState({currentSentences:  this.state.sentencesArray[this.state.currentSentencesIndex]}); // задаем предложение текущее
        
        let wordShuffleArray = this.state.currentSentences.split(' ').sort(function() {
            return 0.5 - Math.random();
        });
        this.setState({currentSentencesArray: wordShuffleArray}); // мешаем предложение текущее

        let collectedArray = [];
        wordShuffleArray.forEach(()=>{
            collectedArray.push('')
        })  // создаем массив пустых слов на доске


        let sentences = {
           wordArray: collectedArray, // слова в массиве 
           colorArray: collectedArray // цвета в массиве 
        };
        this.setState({sentencesArrayBoard: [...this.state.sentencesArrayBoard,sentences]})
    }


    show = () => {
        console.log(this.state)
    }

    getWords = async (page) => {
        const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${this.state.level}&page=${page}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
        const res = await fetch(url);
        const data = await res.json();

        const sentences = [];
        const sentencesTranslate = [];

        data.forEach(item => {
            sentences.push(item.textExample
                .replace('<b>', '')
                .replace('</b>', ''));
            sentencesTranslate.push(item.textExampleTranslate)
        });

        this.setState({sentencesArray: sentences})  // получаем 10 предложений
        this.setState({sentencesTranslateArray:sentencesTranslate}) //получаем 10 рус предложений
    }

    changeGameParam = async () => {

        this.setState({sentencesArray: []}) // делаем пустым массив 10 предложений
        this.setState({sentencesTranslateArray:[]}) // делаем пустым рус массив 10 предложений
        this.setState({currentSentencesIndex: 0}) // обнуляем индекс текущий

        await this.getWords(this.state.page); // новый запрос
        this.setState({currentSentences:  this.state.sentencesArray[this.state.currentSentencesIndex]}); 
    }


    levelChange = (event) => {
        this.setState({level: +event.target.value})
    }   
    
    pageChange = (event) => {
        this.setState({page: +event.target.value})
    }  

    saySentences = (sentences) => {
        window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        const msg = new SpeechSynthesisUtterance();
        const recognition = new window.SpeechRecognition();
        msg.volume = 1;
        msg.rate = 0.8;
        msg.pitch = 1;
        msg.text = sentences;
        recognition.lang = 'en-US';
        speechSynthesis.speak(msg);
    }

    switchPromptAlwaysPronunciation = () => {  // включить отключить говорилку
        this.setState(({promptAlwaysPronunciation}) => ({
            promptAlwaysPronunciation : !promptAlwaysPronunciation
        }))
    }

    promptPronunciation = (sentences) => {   // сказать предложение
        if (this.state.promptAlwaysPronunciation) {
            this.saySentences(sentences)
        }
    }

    /* checkSentences = async () => {
        if (this.state.currentSentencesIndex === 6){
            await this.getWords(this.state.page+1);
        } 
        if (this.state.currentSentencesIndex === 9){
            this.setState({sentencesArray: this.state.nextSentencesArray})
            this.setState({sentencesTranslateArray: this.state.nextSentencesTranslateArray})
            this.setState({currentSentencesIndex: 0})
            this.setState({page: this.state.page + 1})
        }
        else {
            this.setState({currentSentencesIndex: this.state.currentSentencesIndex + 1})
        }
    }*/

    onContinue = () => {
        //this.setState({sentencesArrayBoard: {...this.state.sentencesArrayBoard[this.state.currentSentencesIndex], colorArray:collectedArray}})
       
    }

    onCheck = () => { // ПРОВЕРИТЬ
        let currentArray = this.state.currentSentences.split(' ');
        
        const board  = this.state.sentencesArrayBoard;
        let collectedArray = board[this.state.currentSentencesIndex].wordArray;

        let colorArray = [];

        currentArray.forEach((item,i)=>{
            if (item === collectedArray[i]){
                colorArray.push('success')
            }
            else {
                colorArray.push('error')
            }
        })

        //this.setState({colorSentencesArray: colorArray})
        this.setState({sentencesArrayBoard: [{...this.state.sentencesArrayBoard[this.state.currentSentencesIndex], colorArray: colorArray}]})

        if (!colorArray.includes('error')){
            this.setState({isContinueButton: true})
            this.saySentences(this.state.currentSentences)
        }
        else {
            this.setState({isIgnoranceButton: true})
        }
    }


    onSwapWordsForPuzzles = (index,arr) => { // клики с пазлов

        const board  = this.state.sentencesArrayBoard;
        const collectedArray = board[this.state.currentSentencesIndex].wordArray;


        for (let i = 0; i<collectedArray.length; i++){
            if (collectedArray[i] === ''){
                collectedArray[i] = arr[index];
                break;
            }
        }

       // this.setState({sentencesArrayBoard: [...this.state.sentencesArrayBoard[0], {wordArray: collectedArray}]})
        this.setState({sentencesArraBoard: [{...this.state.sentencesArrayBoard[this.state.currentSentencesIndex], wordArray: collectedArray}]});


        const currentArray = this.state.currentSentencesArray; // внизу массив текущего предложения
        currentArray[index] = '';
        this.setState({currentSentencesArray: currentArray}) // меняем там на пустоту

        if (!collectedArray.includes('')){  // если вверху нет пустых то кнопка чек
            this.setState({isCheckButton: true})
            this.setState({isIgnoranceButton: false})
        }
    }

    onSwapWordsForBoard = (index, arr) => { // клики по доске
        const collectedArray = this.state.currentSentencesArray;
        for (let i = 0; i<collectedArray.length; i++){
            if (collectedArray[i] === ''){
                collectedArray[i] = arr[index];
                break;
            }
        }
        this.setState({currentSentencesArray: collectedArray})

        const board  = this.state.sentencesArrayBoard;
        const currentArray = board[this.state.currentSentencesIndex].wordArray; // массив в доске
        currentArray[index] = '';
        this.setState({sentencesArrayBoard: [{...this.state.sentencesArrayBoard[this.state.currentSentencesIndex], wordArray: currentArray}]})// меняем там на пустоту

        this.setState({isCheckButton: false}) // скрываем чек
        this.setState({isContinueButton: false}) // скрываем продолжить
        this.setState({isIgnoranceButton: true}); // показываем ай донт
        let colorArray = []

        collectedArray.forEach(()=>{
            colorArray.push('')
        }) 
        this.setState({sentencesArrayBoard: [{...this.state.sentencesArrayBoard[this.state.currentSentencesIndex], colorArray: colorArray}]})//опустошаем цвета 
    }

    collectSentences = () => {  // если не знаешь СДЕЛАТЬ!!!!
        
        const collectedArray = this.state.currentSentences.split(' ');
        //this.setState({currentSentencesСollectedArray: collectedArray})
        this.setState({sentencesArrayBoard: [{...this.state.sentencesArrayBoard[this.state.currentSentencesIndex], wordArray: collectedArray}]})


        let colorArray = [];
        let currentArray = [];
        collectedArray.forEach(()=>{
            currentArray.push('')
            colorArray.push('success')
        })

        this.setState({currentSentencesArray: currentArray})
 
        this.setState({sentencesArrayBoard: [{...this.state.sentencesArrayBoard[this.state.currentSentencesIndex], colorArray: colorArray}]})// все цвета зеленые
        this.setState({isContinueButton: true}) // показываем кнопку продолжить
        this.saySentences(this.state.currentSentences) // сказать предложение
    }

    render () {
        const { 
            level, 
            page, 
            sentencesTranslateArray, 
            currentSentencesIndex, 
            currentSentences, 
            //currentSentencesСollectedArray,
            currentSentencesArray,
            isCheckButton,
            //colorSentencesArray,
            isContinueButton,
            isIgnoranceButton,
            sentencesArrayBoard,
        } = this.state;

        const settingButton = s.setting_button;  //стили
        const megafon = settingButton + ' ' + s.megafon_btn;
        const translate = settingButton + ' ' + s.translate_btn;
        const song = settingButton + ' ' + s.song_btn;
        const image = settingButton + ' ' + s.image_btn;

        const chooseButton = settingButton+ ' ' + s.chose_btn;
        const takePuzzles = s.take_puzzles + ' ' + s.game_words;

        

        const onSwapWordsForBoard = this.onSwapWordsForBoard;

        //let dragWord = s.drag_word; // цвет слова

        let colorArray = [];
        if(sentencesArrayBoard[currentSentencesIndex]!==undefined){
            sentencesArrayBoard[currentSentencesIndex].colorArray.forEach((item)=>{
                switch (item){
                    case 'success':
                        colorArray.push(s.success_color);
                        break;
                    case 'error':
                        colorArray.push(s.error_color);
                        break;
                    default:
                        colorArray.push(s.common_color);
                }
            })
        }

        let collectButton = settingButton; // i dont know btn
        let checkButton = s.drag_word +' '+s.display_none; // check btn
        let continueButton = s.drag_word +' '+s.display_none;

        if (!isIgnoranceButton) {
            collectButton = settingButton +' '+ s.display_none;
        }

        if (isCheckButton){
            checkButton = settingButton;
        }

        if (isContinueButton){
            checkButton = s.display_none;
            collectButton = s.display_none;
            continueButton = settingButton;
        }

        return (
            <div>
                 <div className={s.background}>
                </div>
                <div className={s.mainBase}> 
                    <EpHeader/>
    
                    <div className={s.menu_wrapper}>  
                        <div className={s.menu_select_level}> 
                            <select className={s.choose_level} value={level} onChange={this.levelChange}>
                                    <option value="0">1</option>
                                    <option value="1">2</option>
                                    <option value="2">3</option>
                                    <option value="3">4</option>
                                    <option value="4">5</option>
                                    <option value="5">6</option>
                            </select>
                            <select className={s.choose_level} value={page} onChange={this.pageChange}>
                                    <option value="0">1</option>
                                    <option value="1">2</option>
                                    <option value="2">3</option>
                                    <option value="3">4</option>
                                    <option value="4">5</option>
                                    <option value="5">6</option>
                                    <option value="6">7</option>
                                    <option value="7">8</option>
                                    <option value="8">9</option>
                                    <option value="9">10</option>
                            </select>
                            <ButtonSettings label = {'GO'} classNameBtn={chooseButton} clickBtn={this.changeGameParam}/>
                        </div>
                        <div>
                            <span></span>
                        </div>
                        <div className={s.menu_settings}>
                            <ButtonSettings classNameBtn={megafon} clickBtn={this.show}/>
                            <ButtonSettings classNameBtn={translate} clickBtn={this.show}/>
                            <ButtonSettings classNameBtn={song} clickBtn={this.switchPromptAlwaysPronunciation}/>
                            <ButtonSettings classNameBtn={image} clickBtn={this.show}/>
                        </div>
                    </div>
    
                    <div className={s.game_wrapper}>
                        <div className={s.game_group}>
                            <div className={s.game_settings}>
                                <h3 className={s.game_sentence}>{sentencesTranslateArray[currentSentencesIndex]}</h3>
                                <ButtonSettings classNameBtn={s.game_speaker} clickBtn={()=>this.promptPronunciation(currentSentences)}/>
                            </div>
                        </div>

                        <div className={s.game_container}>
                            <div className={s.game_numbering}>
                            {Array.from({ length: 10 }, () => null).map((field, i) => (
                                <div key={i.toString() + 'num'} className={s.game_numbering_item }>{i+1}</div> 
                                ))}
                            </div>
      
                            <div className={s.game_board}>

                                {sentencesArrayBoard.map((field,i) => (
                                    <RowSentences 
                                        key={i.toString() + 'd2'}  
                                        array={field.wordArray} 
                                        classNameRow = {s.game_words} classNameWord = {colorArray}  
                                        func={onSwapWordsForBoard} 
                                    />
                                ))}

                            </div>

                        </div>

                        <div className={takePuzzles}>
                            {currentSentencesArray.map((word, i) => (
                                <div key={i.toString() + 'd1'} className={s.drag_word} onClick={()=>this.onSwapWordsForPuzzles(i,currentSentencesArray)}>{word}</div> 
                            ))}
                        </div>

                        <div className={s.game_buttons}>
                            <ButtonSettings label = {'i don`t know'} classNameBtn={collectButton} clickBtn={this.collectSentences}/>
                            <ButtonSettings label = {'check'} classNameBtn={checkButton} clickBtn={this.onCheck}/>
                            <ButtonSettings label = {'continue'} classNameBtn={continueButton} clickBtn={this.onContinue}/>
                        </div> 
                    </div>
    
                </div>
            </div>
        )
    }
}



  /*<div className={s.game_words}>
        {currentSentencesСollectedArray.map((word, i) => (
            <div 
                key={i.toString() + 'd'} 
                className={dragWord + ' '+ colorArray[i]}
                onClick={()=>this.onSwapWordsForBoard(i,currentSentencesСollectedArray)}
            >
                {word}
            </div> 
        ))}
    </div> */

/*
     <div className={s.game_board}>
                                {sentencesArrayBoard.map((array,i) => (
                                    <RowSentences key={i.toString() + 'd2'}  array={array.wordArray} classNameRow = {s.game_words} classNameWord = {array.colorArray}  func={onSwapWordsForBoard} />
                                ))}
                            </div>
*/