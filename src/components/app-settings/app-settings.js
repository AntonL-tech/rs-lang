import React  from 'react';
import styled from 'styled-components'
import s from './app-settings.module.css'
import ProgressBar from './progress-bar/index'
import { Link } from 'react-router-dom';
import Page from '../app-page-structure/app-page-structure';
import {updateRSLangStatistic} from '../app-stats/statisticApi';


const ProggresBarContainer = styled.div`
    width: 100%;
`

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           token: localStorage.getItem('token'),
           userId: localStorage.getItem('userId'),
           answer: '',
           settingPage: true,
           audio: false,
           translation: false,
           transcription: false,
           textExample: false,
           textExampleTranslate: false,
           meaning: false,
           meaningRu: false,
           meaningAudio: false,
           audioExample: false,
           example: false,
           image: false,
           deleteButton: false,
           hardButton: false,
           showWordButton: false,
           voiceAllow: false,
           stopAudio: true,
           answerButton: false,
           translationButton: true,
           countOfWords: '',
           countOfCards: '',
           level: '',
           data: [],
           line: 0,
           page: 1,
           count: 0,
           endGame: true,
           percentage: 0,
           isCheck: false,
           isAnswerWrong: false,
           sound: true,
           showTranslation: true,
           arrayOfDeletedWords:[],
           arrayOfHardWords: [],
           arrayOfLearnedWords: [],
           customLevelWords: [],
           customLine: 0,
           repeat: true,
           onlyNewWords: false,
           usedWord: true, 
           match: 0,
           mistake: 0,
           miss: 0,
           complexity: false, 
           isRightAnswer: false,
           response: [],
           currentWord: {},
           allCustomWords: [],
           isAllow: true, 
           isActiveDeleteBtn: false,
           isActiveHardBtn: false,
           isActiveAgainBtn: false,
           isActiveBadBtn: false,
           isActiveGoodBtn: false,
           isActiveEasyBtn: false,
           isCompl: false,
           edit: true
        };
        this.setResults = this.setResults.bind(this)
        this.myRef = React.createRef();
        this.setUserWord = this.setUserWord.bind(this)
        this.setWord = this.setWord.bind(this)
    }

    continueGame() {
        this.setState({answer: ''})
        this.setState({settingPage: true})
        this.setState({audio: false})
        this.setState({translation: false})
        this.setState({transcription: false})
        this.setState({textExample: false})
        this.setState({textExampleTranslate: false})
        this.setState({meaning: false})
        this.setState({meaningRu: false})
        this.setState({meaningAudio: false})
        this.setState({audioExample: false})
        this.setState({example: false})
        this.setState({image: false})
        this.setState({deleteButton: false})
        this.setState({hardButton: false})
        this.setState({showWordButton: false})
        this.setState({voiceAllow: false})
        this.setState({stopAudio: true})
        this.setState({answerButton: false})
        this.setState({translationButton: true})
        this.setState({countOfWords: ''})
        this.setState({countOfCards: ''})
        this.setState({level: ''})
        this.setState({data: []})
        this.setState({line: 0})
        this.setState({page: 1})
        this.setState({count: 0})
        this.setState({endGame: true})
        this.setState({percentage: 0})
        this.setState({isCheck: false})
        this.setState({isAnswerWrong: false})
        this.setState({sound: true})
        this.setState({showTranslation: true})
        this.setState({arrayOfDeletedWords: []})
        this.setState({arrayOfHardWords: []})
        this.setState({arrayOfLearnedWords: []})
        this.setState({customLevelWords: []})
        this.setState({customLine: 0})
        this.setState({repeat: true})
        this.setState({usedWord: true})
        this.setState({match: 0})
        this.setState({mistake: 0})
        this.setState({miss: 0})
        this.setState({complexity: false})
        this.setState({isRightAnswer: false})
        this.setState({onlyNewWords: false})
        this.getUserWord(this.state.userId)
    }

    toggleSpeaking() {
        this.setState({stopAudio: !this.state.stopAudio});
        this.setState({sound: !this.state.sound});
    };

    async toggleAnswer(data,line) {
        const {stopAudio, meaningAudio, audioExample, answerButton, countOfCards, percentage, count, repeat, endGame, customLevelWords, miss, match} = this.state;
        this.setState({edit: false})
        this.setState({isAllow: false});
        this.setState({miss: miss + 1})
        this.setState({match: match + 1})
        
        this.myRef.current.textContent = data[line].word;

        // Увеличен счёт карточек
        this.setState({ count: count + 1 });

        // Показывает слово 
        this.setState({answerButton: true});

        // Произносит слово и предложения
        if(stopAudio) {
            await this.sayWord(data[line].word)
            if (meaningAudio && this.myRef.current) {
            await this.sayWord(data[line].textMeaning)
            }
            if (audioExample && this.myRef.current) {
                await this.sayWord(data[line].textExample)
            }
        }

        if(this.myRef.current) {
            // Фокус в поле ввода
            this.setState({edit: true})
            this.myRef.current.focus();

            // Скрывает слово 
            this.setState({answerButton: false});
            // Очищает поле ввода
            this.myRef.current.textContent = '';

            //  Когда кончаются слова для повторения подкидывает новые
            if (repeat && count === data.length - 1) {
                this.setState({usedWord: false})
                this.setState({repeat: false})
            }
            if (count === countOfCards - 1) {
                updateRSLangStatistic(this.state.match)
                this.setState({endGame: false})
            }

            // Чекаем есть ли слова для повторения
            if (!customLevelWords.length && line === 0) {
                this.setState({repeat: false});
            };

            // Переход к следующему слову
            if (repeat) {
                this.setState({customLine: line + 1})
            } else {
                if (line === data.length - 1) {
                    this.setState({ line: 0 });
                    this.setState({ page: this.state.page + 1 });
                    this.getResults();
                } else {
                    this.setState({line: line + 1})
                }
            }
            this.setState({isAllow: true});
        }
        
    };

    toggletranslationButton() {
        this.setState({translationButton: !this.state.translationButton});
        this.setState({showTranslation: !this.state.showTranslation});
    };

    handleChange = (event) => {
        this.setState({[event.target.id]: +event.target.value})
    };

    handleChangeInput = (event) => {
        this.setState({[event.target.id]: event.target.value})
    };

    handleChangeDiv = (event) => {
        this.setState({answer: event.target.textContent})
    };

    handleCheck = (event) => {
        this.setState({[event.target.id]: event.target.checked})
        localStorage.setItem(`${event.target.id}`, `${event.target.checked}`)
    };

    handleSelect = (event) => {
        this.setState({level : +event.target.value})
    };

    getResults() {
        if (this.state.onlyNewWords) {
            this.setState({customLevelWords: []});
            this.setState({repeat: false})
        }
        const group = !this.state.level ? 0 : this.state.level - 1;
        fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${this.state.page}&group=${group}`)
            .then(data => {
                return data.json()
            })
            .then(this.setResults)
            .catch(err => {
                console.log(err)
        })
    };

    async setResults(data) {
        data = await this.filterArray(this.state.allCustomWords, data)
        if (!this.state.customLevelWords.length) {
            this.setState({usedWord: false})
            this.setState({repeat: false})
        }
        if (data.length === 0) {
            this.setState({ page: this.state.page + 1 });
            this.getResults();
        } else {
            this.setState({data: data})
            if ((this.state.translation || this.state.meaning || this.state.textExample) && (this.state.countOfWords > 0 && this.state.countOfCards > 0)) {
                this.setState({ settingPage: false });
    
                // Фокус в поле ввода
                this.myRef.current.focus();
    
            } else {
                this.setState({isCheck: true})
            }
        }
    };

    displaySettings() {
        return (
            <>
                <div>
                <form className={s.settings_form}>
                    <label>
                         Level of difficulty:
                        <div className={s.select}>
                            <select value={this.state.level} onChange={this.handleSelect}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                            </select>
                        </div>
                    </label>

                    <label>
                        New words a day:
                        <input id='countOfWords' type="number" onChange = {this.handleChange} min="1" max="50" required autoComplete='false'/>
                    </label>

                    <label>
                        Maximum number of cards per day:
                        <input id='countOfCards' type="number" onChange = {this.handleChange} min="1" max="50" required autoComplete='false'/>
                    </label>


                    <input className={s.game_checkbox} id='translation' type="checkbox" checked={this.state.translation} onChange = {this.handleCheck}/>
                    <label htmlFor='translation' className={s.game_checkbox_label}>A translation of a word</label>

                    <input className={s.game_checkbox} id='audio' type="checkbox" checked={this.state.audio} onChange = {this.handleCheck}/>
                    <label htmlFor='audio' className={s.game_checkbox_label}>Audio</label>

                    <input className={s.game_checkbox} id='meaning' type="checkbox" checked={this.state.meaning} onChange = {this.handleCheck}/>
                    <label htmlFor='meaning' className={s.game_checkbox_label}>A sentence explaining the meaning of the word</label>

                    <input className={s.game_checkbox} id='meaningRu' type="checkbox" checked={this.state.meaningRu} onChange = {this.handleCheck}/>
                    <label htmlFor='meaningRu' className={s.game_checkbox_label}>A sentence explaining the meaning of the word in Russian</label>

                    <input className={s.game_checkbox} id='meaningAudio' type="checkbox" checked={this.state.meaningAudio} onChange = {this.handleCheck}/>
                    <label htmlFor='meaningAudio' className={s.game_checkbox_label}>Word Explanation Audio</label>

                    <input className={s.game_checkbox} id='textExample' type="checkbox" checked={this.state.textExample} onChange = {this.handleCheck}/>
                    <label htmlFor='textExample' className={s.game_checkbox_label}>Sentence with an example of using the studied word</label>

                    <input className={s.game_checkbox} id='textExampleTranslate' type="checkbox" checked={this.state.textExampleTranslate} onChange = {this.handleCheck}/>
                    <label htmlFor='textExampleTranslate' className={s.game_checkbox_label}>Sentence with an example of using the studied word in Russian</label>

                    <input className={s.game_checkbox} id='audioExample' type="checkbox" checked={this.state.audioExample} onChange = {this.handleCheck}/>
                    <label htmlFor='audioExample' className={s.game_checkbox_label}>Audio with an example of using the studied word</label>

                    <input className={s.game_checkbox} id='transcription' type="checkbox" checked={this.state.transcription} onChange = {this.handleCheck}/>
                    <label htmlFor='transcription' className={s.game_checkbox_label}>Transcription</label>

                    <input className={s.game_checkbox} id='image' type="checkbox" checked={this.state.image} onChange = {this.handleCheck}/>
                    <label htmlFor='image' className={s.game_checkbox_label}>Picture</label>

                    <input className={s.game_checkbox} id='deleteButton' type="checkbox" checked={this.state.deleteButton} onChange = {this.handleCheck}/>
                    <label htmlFor='deleteButton' className={s.game_checkbox_label}>Add Delete button</label>

                    <input className={s.game_checkbox} id='hardButton' type="checkbox" checked={this.state.hardButton} onChange = {this.handleCheck}/>
                    <label htmlFor='hardButton' className={s.game_checkbox_label}>Add Сomplex button</label>

                    <input className={s.game_checkbox} id='showWordButton' type="checkbox" checked={this.state.showWordButton} onChange = {this.handleCheck}/>
                    <label htmlFor='showWordButton' className={s.game_checkbox_label}>add Show answer button</label>

                    <input className={s.game_checkbox} id='voiceAllow' type="checkbox" checked={this.state.voiceAllow} onChange = {this.handleCheck}/>
                    <label htmlFor='voiceAllow' className={s.game_checkbox_label}>add Sound button</label>

                    <input className={s.game_checkbox} id='onlyNewWords' type="checkbox" checked={this.state.onlyNewWords} onChange = {this.handleCheck}/>
                    <label htmlFor='onlyNewWords' className={s.game_checkbox_label}>Learn only new words</label>

                    <input className={s.game_checkbox} id='complexity' type="checkbox" checked={this.state.complexity} onChange = {this.handleCheck}/>
                    <label htmlFor='complexity' className={s.game_checkbox_label}>Interval Repetition Technique</label>
                </form>
                </div>
                <button className={s.game_btn} type="button" onClick={() => this.getResults()}>Start</button>
                {this.state.isCheck ? <div className={s.error_settings}>You must specify the number of new words that you plan to learn per day, as well as the maximum number of cards with words per day.<p>At least one of the following should be marked:<br/>A translation of a word<br/>A sentence explaining the meaning of the word<br/> Sentence with an example of using the studied word </p></div> : null}
            </>
        )
    };

    displayCards(data, line = 0) {
        const {translation, transcription,answerButton, audio, image, meaning, meaningRu, textExample, meaningAudio, 
            textExampleTranslate, audioExample, deleteButton, showWordButton, voiceAllow, hardButton, translationButton, 
            isAnswerWrong, sound, showTranslation, usedWord, match, mistake, miss, isRightAnswer, isAllow, isActiveDeleteBtn, isActiveHardBtn, isActiveAgainBtn, isActiveBadBtn, isActiveGoodBtn, isActiveEasyBtn, isCompl, edit} = this.state;

        let hideTextMeaning = !answerButton ? this.hideWord(data[line].textMeaning, data[line].word) : this.showWords(data[line].textMeaning, data[line].word);
        let hideTextExample = !answerButton ? this.hideWord(data[line].textExample, data[line].word) : this.showWords(data[line].textExample, data[line].word);
        
        const inputWidth = data[line].word.length * 18;
        const {endGame} = this.state;
        let answerBox = (<div style={{width: inputWidth + 'px'}} className={s.card_answer} contentEditable={edit ? true : false} onBlur = {this.handleChangeDiv} id="answer" onKeyPress={(event) => this.handleKeyPress(event, data, line)} ref={this.myRef}></div>);
        let errorBox =  this.compareWords(data[line].word, this.state.answer);
        const page = endGame ? (<div>
            <div className={s.card}>
                <div className={s.answer}>Word: {!isAnswerWrong ? answerBox : errorBox}</div>
                {translation && translationButton ? <div className={s.card_word}>Translation: {data[line].wordTranslate}</div> : null}
                {transcription ? <div className={s.card_word}>Transcription: {data[line].transcription}</div> : null}
                {audio ? <div className={s.card_word}>Audio: <audio controls src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${data[line].audio}`}></audio></div> : null}
                {image ? <div className={s.card_word}>Picture:  <img src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${data[line].image}`} alt='meaning' /></div> : null}
                {meaning ? <div className={s.card_word}>A sentence explaining the meaning of the word: {hideTextMeaning} </div> : null}
                {meaningRu && translationButton ? <div className={s.card_word}>A sentence explaining the meaning of the word in Russian: {data[line].textMeaningTranslate}</div> : null}
                {meaningAudio ? <div className={s.card_word}>Word Explanation Audio: <audio controls src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${data[line].audioMeaning}`}></audio></div> : null}
                {textExample ? <div className={s.card_word}>Sentence with an example of using the studied word: {hideTextExample}</div> : null}
                {textExampleTranslate && translationButton ? <div className={s.card_word}>Sentence with an example of using the studied word in Russian: {data[line].textExampleTranslate}</div> : null}
                {audioExample ? <div className={s.card_word}>Audio with an example of using the studied word: <audio controls src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${data[line].audioExample}`}></audio></div> : null}
                <div className={s.btn_inner}>
                    {deleteButton && !usedWord && isAllow && !isRightAnswer ? <button  className={isActiveDeleteBtn ? s.game_btn_active : s.game_btn} onClick={() => this.deleteUserWord(data, line)}>Delete</button> : null}
                    {hardButton && !usedWord && isAllow && !isRightAnswer ? <button className={isActiveHardBtn ? s.game_btn_active : s.game_btn} onClick={() => this.hardUserWord(data, line)}>Complex</button> : null }
                    <button className={!showTranslation ? s.game_btn_translaition : s.game_btn_translaition_active} onClick={() => this.toggletranslationButton()}>Show translation</button>
                    {voiceAllow ? <button className={!sound ? s.game_btn_audio : s.game_btn_audio_active} onClick={(event) => this.toggleSpeaking(event)}><i className="fas fa-volume-up"/></button> : null}
                </div>
                <div className={s.complexity_btns}>
                    {isRightAnswer && isCompl ? <button  className={isActiveAgainBtn ? s.game_btn_active : s.game_btn} onClick={(event) => this.setComplexityOfWord(event, data, line)}>Again</button> : null}
                    {isRightAnswer && isCompl ? <button  className={isActiveBadBtn ? s.game_btn_active : s.game_btn} onClick={(event) => this.setComplexityOfWord(event, data, line)}>Hard</button> : null}
                    {isRightAnswer && isCompl ? <button  className={isActiveGoodBtn ? s.game_btn_active : s.game_btn} onClick={(event) => this.setComplexityOfWord(event, data, line)}>Good</button> : null}
                    {isRightAnswer && isCompl ? <button  className={isActiveEasyBtn ? s.game_btn_active : s.game_btn} onClick={(event) => this.setComplexityOfWord(event, data, line)}>Easy</button> : null}
                </div>
                <div className={s.result_btns}>
                    {showWordButton && !isRightAnswer && isAllow ? <button className={s.game_btn} onClick={() => this.toggleAnswer(data,line)}>Show answer</button> : null}
                    {!isRightAnswer && isAllow ? <button className={s.game_btn} type="button" onClick={() => this.increment(data,line)}>Answer</button> : null}
                </div>
                <ProggresBarContainer className={s.progress_bar}>
                    {this.state.match}
                    <ProgressBar percentage={this.state.percentage}/>
                    {this.state.countOfCards}
                </ProggresBarContainer>
            </div>
        </div>) : (<div className={s.card}>
                <h2 className={s.card_word}>Hooray! That's all for today.</h2>
                <p className={s.card_word}>Cards Completed - {match}</p>
                <p className={s.card_word_error}>Made mistakes - {mistake}</p>
                <p className={s.card_word_miss}>Cards Missed - {miss}</p>
                <p className={s.card_word}>Percentage of correct answers - {match > 0 ? ((match - mistake - miss)/match * 100).toFixed() : 0}%</p>
                <p className={s.card_word}>There are still new cards, but the daily limit has been reached. You can increase the limit in the settings, but please keep in mind that the more new cards you look at, the more you will need to repeat in the near future.</p>
                <p className={s.card_word}>To study beyond the usual timetable, click on the 'Learn More' button below.</p>
                <div className={s.game_btn_inner}> 
                    <button className={s.game_btn} onClick={() => this.continueGame()}>Learn More</button>
                    <button className={s.game_btn}><Link to="/app-words">Vocabulary</Link></button>
                    <button className={s.game_btn}><Link to="/">Promo page</Link></button>
                </div>
        </div>)

        return(
            <>
                {page}
            </>
        )
    };

    async increment(data, line) {
        const {answer, stopAudio, meaningAudio, audioExample, countOfCards, percentage, count, repeat, customLevelWords, usedWord, match, mistake, complexity} = this.state;
        this.setState({isActiveAgainBtn: false})
        this.setState({isActiveBadBtn: false})
        this.setState({isActiveGoodBtn: false})
        this.setState({isActiveEasyBtn: false})
        this.setState({isRightAnswer: true});
        this.setState({isCompl: false});

        // Чекаем есть ли слова для повторения
        if (!customLevelWords.length && line === 0) {
            this.setState({page: this.state.page + 1})
            if (!this.state.data.length) {
                this.getResults();
            }
            this.getWord(this.state.userId, data[line].id);
            // Добавляем слова в изученые
            this.createUserWord({
                userId: this.state.userId,
                wordId: data[line].id,
                word: { "difficulty": "weak", "optional": {'word': data[line], 'currentDate': new Date().toISOString().split('T')[0], 'repeatDate': this.addDays(new Date(), 5).toISOString().split('T')[0], 'repeat' : 0}},
                });
        };
        // Если слово отгадано
        if (answer.toLowerCase() === data[line].word.toLowerCase()) {
            this.setState({match: match + 1});

            // Добавляем слова в изученые
            if (!usedWord) {
                this.createUserWord({
                    userId: this.state.userId,
                    wordId: data[line].id,
                    word: { "difficulty": "weak", "optional": {'word': data[line], 'currentDate': new Date().toISOString().split('T')[0], 'repeatDate': this.addDays(new Date(), 5).toISOString().split('T')[0], 'repeat' : 0}},
                });
            } else if (customLevelWords.length){
                this.getWord(this.state.userId, data[line].id);
                setTimeout(() => {
                    this.updateUserWord({
                        userId: this.state.userId,
                        wordId: data[line].id,
                        word: { "difficulty": "weak", "optional": {'word': data[line], 'currentDate': new Date().toISOString().split('T')[0], 'repeatDate': this.addDays(new Date(), 5).toISOString().split('T')[0], 'repeat' : this.state.currentWord.optional.repeat}},
                    });
                }, 1000)
            }
            
            // Увеличен счёт карточек
            this.setState({ count: count + 1 });

            // Показывает слово 
            this.setState({answerButton: true});

            // Увеличивает прогресс бар
            const step = 1 / countOfCards*100;
            this.setState({percentage: percentage + step})

            // Произносит слово и предложения
            if(stopAudio) {
                this.setState({edit: false})
                await this.sayWord(data[line].word)
                if (meaningAudio && this.myRef.current) {
                await this.sayWord(data[line].textMeaning)
                }
                if (audioExample && this.myRef.current) {
                    await this.sayWord(data[line].textExample)
                }
            }

            if (this.myRef.current) {
                // Фокус в поле ввода
                this.myRef.current.focus();
                this.setState({isCompl: true})

                if (!complexity) {
                    // Скрывает слово 
                    this.setState({answerButton: false});
                    // Очищает поле ввода
                    this.myRef.current.textContent = '';

                    //  Когда кончаются слова для повторения подкидывает новые
                    if (repeat && count === data.length - 1) {
                        this.setState({repeat: false})
                        this.setState({usedWord: false})
                    }  
                    if (count === countOfCards - 1) {
                        updateRSLangStatistic(this.state.match)
                        this.setState({endGame: false})
                    } 

                    // Переход к следующему слову
                    if (repeat) {
                        this.setState({customLine: line + 1})
                    } else {
                        if (line === data.length - 1) {
                            this.setState({ line: 0 });
                            this.setState({ page: this.state.page + 1 });
                            this.getResults();
                        } else {
                            this.setState({line: line + 1})
                        }
                    }
                    this.setState({isRightAnswer: false});
                    this.setState({edit: true})
                    if (this.myRef.current) {
                        this.myRef.current.focus();
                    }
                }
            } else {
                speechSynthesis.cancel()
            }
            
        } else {
            this.setState({isAllow: false});
            data.push(data[line]);
            // Счетчик ошибок
            this.setState({mistake: mistake + 1})

            // Выводит слово с ошибкой
            this.myRef.current.textContent = '';
            this.setState({isAnswerWrong: true})

            // Произносит слово и предложения
            if(stopAudio) {
                await this.sayWord(data[line].word)
                if (meaningAudio) {
                await this.sayWord(data[line].textMeaning)
                }
                if (audioExample) {
                    await this.sayWord(data[line].textExample)
                }
            }

            setTimeout(()=> {
                    this.setState({isAnswerWrong: false});
                    this.setState({isRightAnswer: false});
                    this.setState({isAllow: true});
                        // Фокус в поле ввода
                    if (this.myRef.current) {
                        this.myRef.current.focus();
                    } else {
                        speechSynthesis.cancel()
                    }
            }, 2000)
            
        }
    };

    setComplexityOfWord(event, data, line) {
        const {usedWord, count, countOfCards, repeat} = this.state;
        if (!this.state.currentWord.optional || !usedWord) {
            if (event.target.textContent === 'Again') {
                this.setState({isActiveAgainBtn: true})

                setTimeout(() => {
                    // Скрывает слово 
                    this.setState({answerButton: false});
                    // Очищает поле ввода
                    this.myRef.current.textContent = '';
   
                    //  Когда кончаются слова для повторения подкидывает новые
                    if (repeat && count === data.length) {
                        this.setState({repeat: false})
                        this.setState({usedWord: false})
                    } 
                    if (count === countOfCards) {
                        updateRSLangStatistic(this.state.match)
                        this.setState({endGame: false})
                    } 
   
                    // Переход к следующему слову
                    if (repeat) {
                        this.setState({customLine: line + 1})
                    } else {
                        if (line === data.length - 1) {
                            this.setState({ line: 0 });
                            this.setState({ page: this.state.page + 1 });
                            this.getResults();
                        } else {
                            this.setState({line: line + 1})
                        }
                    }
                    this.setState({isRightAnswer: false});
                    this.setState({edit: true})
                    if (this.myRef.current) {
                        this.myRef.current.focus();
                    }
                }, 1000)
                

                data.push(data[line]);
                this.updateUserWord({
                    userId: this.state.userId,
                    wordId: data[line].id,
                    word: { "difficulty": "hard", "optional": {'word': data[line], 'currentDate': new Date().toISOString().split('T')[0], 'repeatDate': new Date().toISOString().split('T')[0], 'repeat' : 0}},
                });
            } 

            if (event.target.textContent === 'Hard') {
                this.setState({isActiveBadBtn: true})
                 
                setTimeout(() => {
                    // Скрывает слово 
                    this.setState({answerButton: false});
                    // Очищает поле ввода
                    this.myRef.current.textContent = '';
   
                    //  Когда кончаются слова для повторения подкидывает новые
                    if (repeat && count === data.length) {
                        this.setState({repeat: false})
                        this.setState({usedWord: false})
                    } 
                    if (count === countOfCards) {
                        updateRSLangStatistic(this.state.match)
                        this.setState({endGame: false})
                    } 
   
                    // Переход к следующему слову
                    if (repeat) {
                        this.setState({customLine: line + 1})
                    } else {
                        if (line === data.length - 1) {
                            this.setState({ line: 0 });
                            this.setState({ page: this.state.page + 1 });
                            this.getResults();
                        } else {
                            this.setState({line: line + 1})
                        }
                    }
                    this.setState({isRightAnswer: false});
                    this.setState({edit: true})
                    if (this.myRef.current) {
                        this.myRef.current.focus();
                    }
                }, 1000)
                
                this.updateUserWord({
                    userId: this.state.userId,
                    wordId: data[line].id,
                    word: { "difficulty": "hard", "optional": {'word': data[line], 'currentDate': new Date().toISOString().split('T')[0], 'repeatDate': this.addDays(new Date(), 1).toISOString().split('T')[0], 'repeat' : 0}},
                });
            } 
    
            if (event.target.textContent === 'Good') {
                this.setState({isActiveGoodBtn: true})
                setTimeout(() => {
                    // Скрывает слово 
                    this.setState({answerButton: false});
                    // Очищает поле ввода
                    this.myRef.current.textContent = '';
   
                    //  Когда кончаются слова для повторения подкидывает новые
                    if (repeat && count === data.length) {
                        this.setState({repeat: false})
                        this.setState({usedWord: false})
                    } 
                    if (count === countOfCards) {
                        updateRSLangStatistic(this.state.match)
                        this.setState({endGame: false})
                    } 
   
                    // Переход к следующему слову
                    if (repeat) {
                        this.setState({customLine: line + 1})
                    } else {
                        if (line === data.length - 1) {
                            this.setState({ line: 0 });
                            this.setState({ page: this.state.page + 1 });
                            this.getResults();
                        } else {
                            this.setState({line: line + 1})
                        }
                    }
                    this.setState({isRightAnswer: false});
                    this.setState({edit: true})
                    if (this.myRef.current) {
                        this.myRef.current.focus();
                    }
                }, 1000)
                this.updateUserWord({
                    userId: this.state.userId,
                    wordId: data[line].id,
                    word: { "difficulty": "weak", "optional": {'word': data[line], 'currentDate': new Date().toISOString().split('T')[0], 'repeatDate': this.addDays(new Date(), 7).toISOString().split('T')[0], 'repeat' : 0}},
                });
            }
    
            if (event.target.textContent === 'Easy') {
                this.setState({isActiveEasyBtn: true})
                setTimeout(() => {
                    // Скрывает слово 
                    this.setState({answerButton: false});
                    // Очищает поле ввода
                    this.myRef.current.textContent = '';
   
                    //  Когда кончаются слова для повторения подкидывает новые
                    if (repeat && count === data.length) {
                        this.setState({repeat: false})
                        this.setState({usedWord: false})
                    } 
                    if (count === countOfCards) {
                        updateRSLangStatistic(this.state.match)
                        this.setState({endGame: false})
                    } 
   
                    // Переход к следующему слову
                    if (repeat) {
                        this.setState({customLine: line + 1})
                    } else {
                        if (line === data.length - 1) {
                            this.setState({ line: 0 });
                            this.setState({ page: this.state.page + 1 });
                            this.getResults();
                        } else {
                            this.setState({line: line + 1})
                        }
                    }
                    this.setState({isRightAnswer: false});
                    this.setState({edit: true})
                    if (this.myRef.current) {
                        this.myRef.current.focus();
                    }
                }, 1000)
                this.updateUserWord({
                    userId: this.state.userId,
                    wordId: data[line].id,
                    word: { "difficulty": "weak", "optional": {'word': data[line], 'currentDate': new Date().toISOString().split('T')[0], 'repeatDate': this.addDays(new Date(), 21).toISOString().split('T')[0], 'repeat' : 0}},
                });
            }
        } else {
            if (event.target.textContent === 'Again') {
                this.setState({isActiveAgainBtn: true})
                
                setTimeout(() => {
                    // Скрывает слово 
                    this.setState({answerButton: false});
                    // Очищает поле ввода
                    this.myRef.current.textContent = '';
   
                    //  Когда кончаются слова для повторения подкидывает новые
                    if (repeat && count === data.length) {
                        this.setState({repeat: false})
                        this.setState({usedWord: false})
                    } 
                    if (count === countOfCards ) {
                        updateRSLangStatistic(this.state.match)
                        this.setState({endGame: false})
                    } 
   
                    // Переход к следующему слову
                    if (repeat) {
                        this.setState({customLine: line + 1})
                    } else {
                        if (line === data.length - 1) {
                            this.setState({ line: 0 });
                            this.setState({ page: this.state.page + 1 });
                            this.getResults();
                        } else {
                            this.setState({line: line + 1})
                        }
                    }
                    this.setState({isRightAnswer: false});
                    this.setState({edit: true})
                    if (this.myRef.current) {
                        this.myRef.current.focus();
                    }
                }, 1000)
                
                data.push(data[line]);
                this.updateUserWord({
                    userId: this.state.userId,
                    wordId: data[line].id,
                    word: { "difficulty": "hard", "optional": {'word': data[line], 'currentDate': new Date().toISOString().split('T')[0], 'repeatDate': new Date().toISOString().split('T')[0], 'repeat' : this.state.currentWord.optional.repeat + 1}},
                });
            } 

            if (event.target.textContent === 'Hard') {
                this.setState({isActiveBadBtn: true})
                 
                setTimeout(() => {
                    // Скрывает слово 
                    this.setState({answerButton: false});
                    // Очищает поле ввода
                    this.myRef.current.textContent = '';
   
                    //  Когда кончаются слова для повторения подкидывает новые
                    if (repeat && count === data.length) {
                        this.setState({repeat: false})
                        this.setState({usedWord: false})
                    } 
                    if (count === countOfCards) {
                        updateRSLangStatistic(this.state.match)
                        this.setState({endGame: false})
                    } 
   
                    // Переход к следующему слову
                    if (repeat) {
                        this.setState({customLine: line + 1})
                    } else {
                        if (line === data.length - 1) {
                            this.setState({ line: 0 });
                            this.setState({ page: this.state.page + 1 });
                            this.getResults();
                        } else {
                            this.setState({line: line + 1})
                        }
                    }
                    this.setState({isRightAnswer: false});
                    this.setState({edit: true})
                    if (this.myRef.current) {
                        this.myRef.current.focus();
                    }
                }, 1000)
                
                this.updateUserWord({
                    userId: this.state.userId,
                    wordId: data[line].id,
                    word: { "difficulty": "hard", "optional": {'word': data[line], 'currentDate': new Date().toISOString().split('T')[0], 'repeatDate': this.addDays(new Date(), 1).toISOString().split('T')[0], 'repeat' : this.state.currentWord.optional.repeat + 1}},
                });
            } 
    
            if (event.target.textContent === 'Good') {
                this.setState({isActiveGoodBtn: true})
                setTimeout(() => {
                    // Скрывает слово 
                    this.setState({answerButton: false});
                    // Очищает поле ввода
                    this.myRef.current.textContent = '';
   
                    //  Когда кончаются слова для повторения подкидывает новые
                    if (repeat && count === data.length) {
                        this.setState({repeat: false})
                        this.setState({usedWord: false})
                    } 
                    if (count === countOfCards) {
                        updateRSLangStatistic(this.state.match)
                        this.setState({endGame: false})
                    } 
   
                    // Переход к следующему слову
                    if (repeat) {
                        this.setState({customLine: line + 1})
                    } else {
                        if (line === data.length - 1) {
                            this.setState({ line: 0 });
                            this.setState({ page: this.state.page + 1 });
                            this.getResults();
                        } else {
                            this.setState({line: line + 1})
                        }
                    }
                    this.setState({isRightAnswer: false});
                    this.setState({edit: true})
                    if (this.myRef.current) {
                        this.myRef.current.focus();
                    }
                }, 1000)
                this.updateUserWord({
                    userId: this.state.userId,
                    wordId: data[line].id,
                    word: { "difficulty": "weak", "optional": {'word': data[line], 'currentDate': new Date().toISOString().split('T')[0], 'repeatDate': this.addDays(new Date(), 7).toISOString().split('T')[0], 'repeat' : this.state.currentWord.optional.repeat + 1}},
                });
            }
    
            if (event.target.textContent === 'Easy') {
                this.setState({isActiveEasyBtn: true})
                setTimeout(() => {
                    // Скрывает слово 
                    this.setState({answerButton: false});
                    // Очищает поле ввода
                    this.myRef.current.textContent = '';
   
                    //  Когда кончаются слова для повторения подкидывает новые
                    if (repeat && count === data.length) {
                        this.setState({repeat: false})
                        this.setState({usedWord: false})
                    } 
                    if (count === countOfCards) {
                        updateRSLangStatistic(this.state.match)
                        this.setState({endGame: false})
                    } 
   
                    // Переход к следующему слову
                    if (repeat) {
                        this.setState({customLine: line + 1})
                    } else {
                        if (line === data.length - 1) {
                            this.setState({ line: 0 });
                            this.setState({ page: this.state.page + 1 });
                            this.getResults();
                        } else {
                            this.setState({line: line + 1})
                        }
                    }
                    this.setState({isRightAnswer: false});
                    this.setState({edit: true})
                    if (this.myRef.current) {
                        this.myRef.current.focus();
                    }
                }, 1000)
                this.updateUserWord({
                    userId: this.state.userId,
                    wordId: data[line].id,
                    word: { "difficulty": "weak", "optional": {'word': data[line], 'currentDate': new Date().toISOString().split('T')[0], 'repeatDate': this.addDays(new Date(), 21).toISOString().split('T')[0], 'repeat' : this.state.currentWord.optional.repeat + 1}},
                });
            }
        }
        
    }

    handleKeyPress(event,data,line) {
        if (event.key === 'Enter') {       
            this.setState({answer: event.target.textContent})     
            setTimeout(() => {
                this.increment(data,line)          
            }, 1000)
        }
    };

    async sayWord(word) {
        const msg = new SpeechSynthesisUtterance();
        msg.volume = .7;
        msg.rate = 1;
        msg.pitch = 1;
        msg.text = word;
        const voice =  {
            'lang': 'en-US',
        };
        msg.lang = voice.lang;
        speechSynthesis.speak(msg);

        return new Promise(resolve => {
            msg.onend = resolve;
        });
    };

    hideWord(str,word) {
        var hiden = '';
        for (let i = 0; i < word.length; i++) {
            hiden = hiden + '*'
        }
        let hidenString = str.replace(new RegExp(word, 'gi'), hiden).replace(new RegExp('<i>', 'g'), '').replace(new RegExp('</i>', 'g'), '').replace(new RegExp('<b>', 'g'), '').replace(new RegExp('</b>', 'g'), '');
        return hidenString
    };

    showWords(str, keyWord) {
        const string = str.replace(new RegExp('<i>', 'g'), '').replace(new RegExp('</i>', 'g'), '').replace(new RegExp('<b>', 'g'), '').replace(new RegExp('</b>', 'g'), '');
        const array = string.split(' ').map(word => {
            let newWord = word;
            if (word === keyWord) {
                newWord = (<b>{keyWord}</b>);
            }
            return newWord
        })
        return (array.map(element => (<span>{element} </span>)))
    };

    compareWords(word, answer) {
        let arrayOfWordLetters = word.split('');
        let arrayOfAnswerLetters = answer.split('');
        let result=[];
        let count = 0
        for (let i = 0; i < arrayOfWordLetters.length; i++) {
            if (arrayOfWordLetters[i] !== arrayOfAnswerLetters[i]) {
                count = count + 1;
            }
        }
        for (let i = 0; i < arrayOfWordLetters.length; i++) {
            if (arrayOfWordLetters[i] !== arrayOfAnswerLetters[i]) {
                arrayOfWordLetters[i] = (<span className={count > 2 ? s.red : s.orange}>{arrayOfWordLetters[i]}</span>)
            } else {
                arrayOfWordLetters[i] = (<span className={s.green}>{arrayOfWordLetters[i]}</span>)
            }
            result.push(arrayOfWordLetters[i]);
        }
        return <div className={s.card_answer} contentEditable={false}>{result.map(element => (element))}</div>
    };

    createUserWord = async ({ userId, wordId, word }) => {
        const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
            method: 'POST',
            withCredentials: true,
            headers: {
            'Authorization': `Bearer ${this.state.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(word)
        });
        const content = await rawResponse.json();
    };

    updateUserWord = async ({ userId, wordId, word }) => {
        const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
            method: 'PUT',
            withCredentials: true,
            headers: {
            'Authorization': `Bearer ${this.state.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(word)
        });
        const content = await rawResponse.json();
        
    };
    

    async deleteUserWord (data,line) {
        this.setState({isActiveDeleteBtn: true})
        this.createUserWord({
            userId: this.state.userId,
            wordId: data[line].id,
            word: { "difficulty": "weak", "optional": {'word': data[line], 'deleted': true, 'currentDate': new Date().toISOString().split('T')[0], 'repeatDate': 'Deleted', 'repeat' : 0}},
        });
        await this.toggleAnswer(data, line)
        this.setState({isActiveDeleteBtn: false})
    }

    async hardUserWord (data,line) {
        this.setState({isActiveHardBtn: true})
        this.createUserWord({
            userId: this.state.userId,
            wordId: data[line].id,
            word: { "difficulty": "hard", "optional": {'word': data[line], 'currentDate': new Date().toISOString().split('T')[0], 'repeatDate': this.addDays(new Date(), 1).toISOString().split('T')[0], 'repeat' : 0}}
        });
        await this.toggleAnswer(data, line)
        this.setState({isActiveHardBtn: false})
    }

    getWord (userId, wordId) {
        fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
          method: 'GET',
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${this.state.token}`,
            'Accept': 'application/json',
          }
        }).then(data => {
            return data.json();
        }).then(this.setWord)
        .catch(err => console.log(err))
    };

    setWord(data) {
        this.setState({currentWord: data})
    }


    componentDidMount() {
        this.getUserWord(this.state.userId);
    }

    getUserWord (userId) {
        fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`, {
          method: 'GET',
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${this.state.token}`,
            'Accept': 'application/json',
          }
        }).then(data => {
            return data.json();
        }).then(this.setUserWord)
        .catch(err => console.log(err))
    };

    setUserWord(data) {
        this.setState({response: data})
        for (let i = 0; i < data.length; i++) {
            this.state.allCustomWords.push(data[i].optional.word)
        }
        data = data.filter(element => element.optional.repeatDate === new Date().toISOString().split('T')[0])
        for (let i = 0; i < data.length; i++) {
            if (data[i].optional.deleted) {
                this.state.arrayOfDeletedWords.push(data[i].optional.word)
            } else if (data[i].difficulty === 'hard') {
                this.state.arrayOfHardWords.push(data[i].optional.word);
                this.state.customLevelWords.push(data[i].optional.word);
            } else {
                this.state.arrayOfLearnedWords.push(data[i].optional.word);
                this.state.customLevelWords.push(data[i].optional.word);
            }
        }
    }

    filterArray(arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
                if (arr1[i].id === arr2[j].id) {
                    arr2.splice(j, 1);
                }
            }
        }
        return arr2;
    }

    addDays(theDate, days) {
        return new Date(theDate.getTime() + days*24*60*60*1000);
    }

    componentWillUnmount() {
        speechSynthesis.cancel()
    }
    

    render() {
        const { settingPage, data, customLevelWords, repeat, line, customLine, onlyNewWords} = this.state;
        const page = settingPage ? (<div className={s.settings_inner}>
             {this.displaySettings()}
        </div>) :
        (<div>
            {repeat && customLevelWords.length  ? this.displayCards(customLevelWords,customLine) :this.displayCards(data,line)}
        </div>);

        return (
            <Page>
                <div className={s.container}>
                    <div className={s.form_inner}>
                        {page}
                    </div>
                </div>
            </Page>

        );
    }
}
