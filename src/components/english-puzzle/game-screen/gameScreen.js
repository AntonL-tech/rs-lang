import React, { Component } from 'react';
import s from './gameScreen.module.css'

import EpHeader from "../ep-header/epHeader";
import ButtonSettings from './buttonSettings/buttonSettings'

const settingButton = s.setting_button;

const megafon = settingButton + ' ' + s.megafon_btn;
const translate = settingButton + ' ' + s.translate_btn;
const song = settingButton + ' ' + s.song_btn;
const image = settingButton + ' ' + s.image_btn;

const chooseButton = settingButton+ ' ' + s.chose_btn;

export default class GameScreen extends Component {
    state = {
        level: 0,
        page: 0,
        sentencesArray: [],
        nextSentencesArray: [],
        sentencesTranslateArray: [],
        nextSentencesTranslateArray: [],
       // isNextPage: true,
        currentSentences: 0
    }

    componentDidMount() {
        this.getWords(this.state.page);
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
                .replace('</b>', '')
                .replace('.', ''));
            sentencesTranslate.push(item.textExampleTranslate)

        });

        if (!this.state.sentencesArray.length){
            this.setState({sentencesArray: sentences})
            this.setState({sentencesTranslateArray:sentencesTranslate})
        }

        if (this.state.sentencesArray.length){
            this.setState({nextSentencesArray: sentences})
            this.setState({nextSentencesTranslateArray:sentencesTranslate})
        }
    }

    changeGameParam = () => {

        this.setState({sentencesArray: []})
        this.setState({sentencesTranslateArray:[]})
        this.setState({currentSentences: 0})

        this.getWords(this.state.page);
    }

    show = () => {
        console.log(this.state)
    }

    levelChange = (event) => {
        this.setState({level: +event.target.value})
    }   
    
    pageChange = (event) => {
        this.setState({page: +event.target.value})
    }  

    saySentences = () => {

    }

    checkSentences = () => {
        if (this.state.currentSentences === 6){
            this.getWords(this.state.page+1);
        } 
        if (this.state.currentSentences === 9){
            this.setState({sentencesArray: this.state.nextSentencesArray})
            this.setState({sentencesTranslateArray: this.state.nextSentencesTranslateArray})
            this.setState({currentSentences: 0})
            this.setState({page: ++this.state.page})
        }
        else {
            this.setState({currentSentences: ++this.state.currentSentences})
        }
    }

    render () {
        const { level, page, sentencesTranslateArray, currentSentences, sentencesArray } = this.state;
        let mySentences = [];
        if (sentencesArray.length){
            mySentences = sentencesArray[currentSentences].split(' ');
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
                            <ButtonSettings label = {'GO'} classNameBtn={chooseButton} event={this.changeGameParam}/>
                        </div>
                        <div>
                            <span></span>
                        </div>
                        <div className={s.menu_settings}>
                            <ButtonSettings classNameBtn={megafon} event={this.show}/>
                            <ButtonSettings classNameBtn={translate} event={this.show}/>
                            <ButtonSettings classNameBtn={song} event={this.show}/>
                            <ButtonSettings classNameBtn={image} event={this.show}/>
                        </div>
                    </div>
    
                    <div className={s.game_wrapper}>
                        <div className={s.game_group}>
                            <div className={s.game_settings}>
                                <h3 className={s.game_sentence}>{sentencesTranslateArray[currentSentences]}</h3>
                                <button className={s.game_speaker}></button>
                            </div>
                        </div>

                        <div className={s.game_container}>

                            <div className={s.game_words}></div> 

                        </div>

                        <div className={s.game_words}>{mySentences.map((field, i) => (
                                <div key={i.toString() + 'q'} className={s.drag_word}>{field}</div> 
                            ))}
                        </div> 

                        <div className={s.game_buttons}>
                            <button className={s.btn_dont_know}>i don`t know</button>
                            <button className={s.btn_dont_know} onClick={this.checkSentences}>check</button>
                        </div> 
                    </div>
    
                </div>
            </div>
        )
    }
}


