import React, {Component} from 'react';
import styled from 'styled-components'
import s from './app-settings.module.css'
import Header from '../app-header/app-header'
import Sidebar from '../app-sidebar/app-sidebar'
import ProgressBar from './progress-bar/index'
import PropTypes from 'prop-types'

const ProggresBarContainer = styled.div`
    width: 100%;
`
const token = window.localStorage.getItem('token');
const userId = window.localStorage.getItem('userId');

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
           showTranslation: true
        };
        this.setResults = this.setResults.bind(this)
        this.myRef = React.createRef();
    }
    toggleSpeaking() {
        this.setState({stopAudio: !this.state.stopAudio});
        this.setState({sound: !this.state.sound});
    };

    async toggleAnswer(data,line) {
        this.setState({answerButton: !this.state.answerButton});
        this.myRef.current.textContent = data[line].word;
        this.sayWord(data[line].word);
        if(this.state.stopAudio) {
            await this.sayWord(this.state.answer)
            if (this.state.meaningAudio) {
            await this.sayWord(data[line].textMeaning)
            }
            if (this.state.audioExample) {
                await this.sayWord(data[line].textExample)
            }
        }
        setTimeout(() => {
            this.gameProcess(data,line);
        }, 3000)
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
        console.log(this.state)
    };

    handleChangeDiv = (event) => {
        this.setState({answer: event.target.textContent})
    };

    handleCheck = (event) => {
        this.setState({[event.target.id]: event.target.checked})

    };

    handleSelect = (event) => {
        this.setState({level : +event.target.value})
    };

    getResults() {
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

    setResults(data) {
        this.setState({data: data})
        console.log(this.state)
        if ((this.state.translation || this.state.meaning || this.state.textExample) && (this.state.countOfWords > 0 && this.state.countOfCards > 0)) {
            this.setState({ settingPage: false });
        } else {
            this.setState({isCheck: true})
        }
        console.log(data)
    };

    displaySettings() {
        return (
            <>
                <div>
                <form className={s.settings_form}>
                    <label>
                        Уровень сложности:
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
                        Новых слов в день:
                        <input id='countOfWords' type="number" onChange = {this.handleChange} min="1" max="50" required/>
                    </label>

                    <label>
                        Новых карточек в день:
                        <input id='countOfCards' type="number" onChange = {this.handleChange} min="1" max="50" required/>
                    </label>


                    <input className={s.game_checkbox} id='translation' type="checkbox" checked={this.state.translation} onChange = {this.handleCheck}/>
                    <label htmlFor='translation' className={s.game_checkbox_label}>Перевод слова</label>

                    <input className={s.game_checkbox} id='audio' type="checkbox" checked={this.state.audio} onChange = {this.handleCheck}/>
                    <label htmlFor='audio' className={s.game_checkbox_label}>Аудио</label>

                    <input className={s.game_checkbox} id='meaning' type="checkbox" checked={this.state.meaning} onChange = {this.handleCheck}/>
                    <label htmlFor='meaning' className={s.game_checkbox_label}>Предложение с объяснением значения слова</label>

                    <input className={s.game_checkbox} id='meaningRu' type="checkbox" checked={this.state.meaningRu} onChange = {this.handleCheck}/>
                    <label htmlFor='meaningRu' className={s.game_checkbox_label}>Предложение с объяснением значения слова на русском</label>

                    <input className={s.game_checkbox} id='meaningAudio' type="checkbox" checked={this.state.meaningAudio} onChange = {this.handleCheck}/>
                    <label htmlFor='meaningAudio' className={s.game_checkbox_label}>Аудио с объяснением значения слова</label>

                    <input className={s.game_checkbox} id='textExample' type="checkbox" checked={this.state.textExample} onChange = {this.handleCheck}/>
                    <label htmlFor='textExample' className={s.game_checkbox_label}>Предложение с примером использования изучаемого слова</label>

                    <input className={s.game_checkbox} id='textExampleTranslate' type="checkbox" checked={this.state.textExampleTranslate} onChange = {this.handleCheck}/>
                    <label htmlFor='textExampleTranslate' className={s.game_checkbox_label}>Предложение с примером использования изучаемого слова на русском</label>

                    <input className={s.game_checkbox} id='audioExample' type="checkbox" checked={this.state.audioExample} onChange = {this.handleCheck}/>
                    <label htmlFor='audioExample' className={s.game_checkbox_label}>Аудио с примером использования изучаемого слова</label>

                    <input className={s.game_checkbox} id='transcription' type="checkbox" checked={this.state.transcription} onChange = {this.handleCheck}/>
                    <label htmlFor='transcription' className={s.game_checkbox_label}>Транскрипция</label>

                    <input className={s.game_checkbox} id='image' type="checkbox" checked={this.state.image} onChange = {this.handleCheck}/>
                    <label htmlFor='image' className={s.game_checkbox_label}>Картинка</label>

                    <input className={s.game_checkbox} id='deleteButton' type="checkbox" checked={this.state.deleteButton} onChange = {this.handleCheck}/>
                    <label htmlFor='deleteButton' className={s.game_checkbox_label}>Кнопка удалить</label>

                    <input className={s.game_checkbox} id='hardButton' type="checkbox" checked={this.state.hardButton} onChange = {this.handleCheck}/>
                    <label htmlFor='hardButton' className={s.game_checkbox_label}>Кнопка cложные слова</label>

                    <input className={s.game_checkbox} id='showWordButton' type="checkbox" checked={this.state.showWordButton} onChange = {this.handleCheck}/>
                    <label htmlFor='showWordButton' className={s.game_checkbox_label}>Кнопка показать перевод</label>

                    <input className={s.game_checkbox} id='voiceAllow' type="checkbox" checked={this.state.voiceAllow} onChange = {this.handleCheck}/>
                    <label htmlFor='voiceAllow' className={s.game_checkbox_label}>Кнопка звука</label>
                </form>
                </div>
                <button className={s.game_btn} type="button" onClick={() => this.getResults()}>Начать</button>
                {this.state.isCheck ? <div className={s.error_settings}>Необходимо указать количество новых слов, которые планируете выучить за день, а также максимальное количество карточек со словами на день.<p>Хотя бы один пункт из нижеперечисленных должен быть отмечен:<br/>перевод слова<br/>предложение с объяснением значения слова<br/> предложение с примером использования изучаемого слова </p></div> : null}
            </>
        )
    };

    displayCards(data, line = 0) {
        const {translation, transcription, audio, image, meaning, meaningRu, textExample, meaningAudio, textExampleTranslate, audioExample, deleteButton, showWordButton, voiceAllow, hardButton, translationButton, isAnswerWrong, sound, showTranslation} = this.state;
        let hideTextMeaning;
        let hideTextExample;

        if (!this.state.answerButton) {
            hideTextMeaning = this.hideWord(data[line].textMeaning, data[line].word)
            hideTextExample = this.hideWord(data[line].textExample, data[line].word)
        } else {
            hideTextMeaning = this.showWords(data[line].textMeaning, data[line].word);
            hideTextExample = this.showWords(data[line].textExample, data[line].word);
        }
        
        const inputWidth = this.state.data[line].word.length * 25;
        const {endGame} = this.state;
        let answerBox = (<div style={{width: inputWidth + 'px'}} className={s.card_answer} contentEditable={true} onBlur = {this.handleChangeDiv} id="answer" onKeyPress={(event) => this.handleKeyPress(event, data, this.state.line)} ref={this.myRef}></div>);
        let errorBox =  this.compareWords(data[line].word, this.state.answer);
        const page = endGame ? (<div>
            <div className={s.card}>
                <div className={s.answer}>Слово: {!isAnswerWrong ? answerBox : errorBox}</div>
                {translation && translationButton ? <div className={s.card_word}>Перевод: {data[line].wordTranslate}</div> : null}
                {transcription ? <div className={s.card_word}>Транскрипция: {data[line].transcription}</div> : null}
                {audio ? <div className={s.card_word}>Аудио: <audio controls src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${data[line].audio}`}></audio></div> : null}
                {image ? <div className={s.card_word}>Картинка:  <img src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${data[line].image}`} alt='meaning' /></div> : null}
                {meaning ? <div className={s.card_word}>Предложение на англе: {hideTextMeaning} </div> : null}
                {meaningRu && translationButton ? <div className={s.card_word}>Предложение на русском: {data[line].textMeaningTranslate}</div> : null}
                {meaningAudio ? <div className={s.card_word}>Аудио значение на англе: <audio controls src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${data[line].audioMeaning}`}></audio></div> : null}
                {textExample ? <div className={s.card_word}>Предложение с примером использования изучаемого слова: {hideTextExample}</div> : null}
                {textExampleTranslate && translationButton ? <div className={s.card_word}>Предложение с примером использования изучаемого слова на русском: {data[line].textExampleTranslate}</div> : null}
                {audioExample ? <div className={s.card_word}>Аудио предложение на англе: <audio controls src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${data[line].audioExample}`}></audio></div> : null}
                <div className={s.btn_inner}>
                    {deleteButton ? <button  className={s.game_btn} onClick={() => this.deleteUserWord(data, line)}>Удалить</button> : null}
                    {hardButton ? <button className={s.game_btn} onClick={() => this.hardUserWord(data, line)}>Сложные</button> : null }
                    <button className={!showTranslation ? s.game_btn_translaition : s.game_btn_translaition_active} onClick={() => this.toggletranslationButton()}>Показывать перевод</button>
                    {voiceAllow ? <button className={!sound ? s.game_btn_audio : s.game_btn_audio_active} onClick={(event) => this.toggleSpeaking(event)}><i className="fas fa-volume-up"/></button> : null}
                </div>
                <div className={s.result_btns}>
                    {showWordButton ? <button className={s.game_btn} onClick={() => this.toggleAnswer(data,this.state.line)}>Показать ответ</button> : null}
                    <button className={s.game_btn} type="button" onClick={() => this.increment(data,this.state.line)}>Ответить</button>
                </div>
                <ProggresBarContainer className={s.progress_bar}>
                    {this.state.percentage.toFixed()}%
                    <ProgressBar percentage={this.state.percentage}/>
                    100%
                </ProggresBarContainer>
            </div>
        </div>) : (<div className={s.card}>
                <h2 className={s.card_word}>Ура! На сегодня всё.</h2>
                <p className={s.card_word}>Есть ещё новые карточки, но дневной лимит исчерпан. Вы можете увеличить лимит в настройках, но, пожалуйста, имейте в виду, что чем больше новых карточек вы просмотрите, тем больше вас надо будет повтороять в ближайшее время.</p>
                <p className={s.card_word}>Для обучения сверх обычного расписания, нажмите кнопку 'Учить ещё' ниже</p>
                <button className={s.game_btn}>Учить ещё</button>
        </div>)

        return(
            <>
                {page}
            </>
        )
    };

    async increment(data, line) {
        const {answer,answerButton, percentage, countOfCards, stopAudio, meaningAudio, audioExample, count} = this.state;
        if (answer.toLowerCase() === this.state.data[this.state.line].word.toLowerCase()) {
            console.log(data)
            this.createUserWord({
                userId: userId,
                wordId: data[line].id,
                word: { "difficulty": "weak", "optional": {'word': data[line], 'ok': true, 'string': 'string', 'feel' : false}},
              });
            this.setState({answerButton: !answerButton});
            const step = 1 / countOfCards*100;
            this.setState({percentage: percentage + step})
            if(stopAudio) {
                await this.sayWord(answer)
                if (meaningAudio) {
                await this.sayWord(data[line].textMeaning)
                }
                if (audioExample) {
                    await this.sayWord(data[line].textExample)
                }
            }
            this.gameProcess(data,line);
        } else {
            this.myRef.current.textContent = '';
            this.setState({isAnswerWrong: true})
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
                // this.gameProcess(data,line)
            }, 3000)
        }
    };

    gameProcess(data, line) {
        const {answer,answerButton, percentage, countOfCards, stopAudio, meaningAudio, audioExample, count} = this.state;
        this.setState({ line: this.state.line + 1 });
        if (this.state.line === 19) {
            this.setState({ line: 0 });
            this.setState({ page: this.state.page + 1 });
            this.getResults();
        }
        this.setState({ count: this.state.count + 1 });
        if (count === countOfCards - 1) {
            this.setState({endGame: false})
        } else {
            this.myRef.current.focus();
            this.myRef.current.textContent = '';
        }

        this.setState({ answer: '' });
        this.setState({answerButton: false})
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
        for (let i = 0; i < arrayOfWordLetters.length; i++) {
            if (arrayOfWordLetters[i] !== arrayOfAnswerLetters[i]) {
                arrayOfWordLetters[i] = (<span className={s.red}>{arrayOfWordLetters[i]}</span>)
            } else {
                arrayOfWordLetters[i] = (<span className={s.green}>{arrayOfWordLetters[i]}</span>)
            }
            result.push(arrayOfWordLetters[i]);
        }
        return <div className={s.card_answer} contentEditable={true}>{result.map(element => (element))}</div>
    };

    createUserWord = async ({ userId, wordId, word }) => {
        const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
            method: 'POST',
            withCredentials: true,
            headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(word)
        });
        const content = await rawResponse.json();
        
        console.log(content);
    };

    deleteUserWord (data,line) {
        this.createUserWord({
            userId: userId,
            wordId: data[line].id,
            word: { "difficulty": "weak", "optional": {'word': data[line], 'deleted': true}},
        });
        console.log(data[line].word, 'удалено');
    }

    hardUserWord (data,line) {
        this.createUserWord({
            userId: userId,
            wordId: data[line].id,
            word: { "difficulty": "hard", "optional": {'word': data[line]}}
        });
        console.log(data[line].word, 'добавлено в сложные');
    }

    render() {
        const { settingPage, data} = this.state;
        const page = settingPage ? (<div className={s.settings_inner}>
             {this.displaySettings()}
        </div>) :
        (<div>
            {this.displayCards(data,this.state.line)}
        </div>);

        return (
            <div>
                <Header/>
                <div className={'flex'}>
                    <Sidebar/>
                    <div className={s.form_inner}>
                        {page}
                    </div>
                </div>
            </div>

        );
    }
}
