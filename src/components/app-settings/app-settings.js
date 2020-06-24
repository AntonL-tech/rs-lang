import React, {Component} from 'react';
import styled from 'styled-components'
import s from './app-settings.module.css'
import Header from '../app-header/app-header'
import Sidebar from '../app-sidebar/app-sidebar'
import ProgressBar from './progress-bar/index'

const ProggresBarContainer = styled.div`
    width: 300px;
`


class Settings extends React.Component {
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
           isCheck: false
        };
        this.setResults = this.setResults.bind(this)
        this.myRef = React.createRef();
    }

    toggleSpeaking() {
        this.setState({stopAudio: !this.state.stopAudio})
    }

    async toggleAnswer(data,line) {
        this.setState({answerButton: !this.state.answerButton});
        if(this.state.stopAudio) {
            await this.sayWord(this.state.answer)
            if (this.state.meaningAudio) {
            await this.sayWord(data[line].textMeaning)
            }
            if (this.state.audioExample) {
                await this.sayWord(data[line].textExample)
            }
        }
        this.setState({ line: this.state.line + 1 });
        if (this.state.line === 19) {
            this.setState({ line: 0 });
            this.setState({ page: this.state.page + 1 });
            this.getResults();
        }

        this.setState({ count: this.state.count + 1 });
        if (this.state.count === this.state.countOfCards) {
            this.setState({endGame: false})
        }

        this.setState({ answer: '' });
        this.setState({answerButton: false})
    }

    toggletranslationButton() {
        this.setState({translationButton: !this.state.translationButton});
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: +event.target.value})
    }

    handleChangeInput = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    handleCheck = (event) => {
        this.setState({[event.target.id]: event.target.checked})

    }

    handleSelect = (event) => {
        this.setState({level : +event.target.value})
    }

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
    }

    setResults(data) {
        this.setState({data: data})
        console.log(this.state)
        if ((this.state.translation || this.state.meaning || this.state.textExample) && (this.state.countOfWords > 0 && this.state.countOfCards > 0)) {
            this.setState({ settingPage: false });
        } else {
            this.setState({isCheck: true})
        }
        console.log(data)
    }

    displaySettings() {
        return (
            <>
                <div >
                <form className={s.settings_form}>
                    <label>
                        Уровень сложности:
                        <select value={this.state.level} onChange={this.handleSelect}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </select>
                    </label>

                    <label>
                        Новых слов в день:
                        <input id='countOfWords' type="number" onChange = {this.handleChange} min="1" max="50" required/>
                    </label>

                    <label>
                        Новых карточек в день:
                        <input id='countOfCards' type="number" onChange = {this.handleChange} min="1" max="50" required/>
                    </label>

                    <label>
                        Перевод:
                        <input id='translation' type="checkbox" checked={this.state.translation}
                         onChange = {this.handleCheck}/>
                    </label>

                    <label>
                        Аудио:
                        <input id='audio' type="checkbox" checked={this.state.audio}
                         onChange = {this.handleCheck}/>
                    </label>

                    <label>
                        Предложение с объяснением значения слова:
                        <input id='meaning' type="checkbox" checked={this.state.meaning}
                         onChange = {this.handleCheck}/>
                    </label>

                    <label>
                        Предложение с объяснением значения слова на русском:
                        <input id='meaningRu' type="checkbox" checked={this.state.meaningRu}
                         onChange = {this.handleCheck}/>
                    </label>

                    <label>
                        Аудио с объяснением значения слова:
                        <input id='meaningAudio' type="checkbox" checked={this.state.meaningAudio}
                         onChange = {this.handleCheck}/>
                    </label>

                    <label>
                        Предложение с примером использования изучаемого слова:
                        <input id='textExample' type="checkbox" checked={this.state.textExample}
                         onChange = {this.handleCheck}/>
                    </label>

                    <label>
                        Предложение с примером использования изучаемого слова на русском:
                        <input id='textExampleTranslate' type="checkbox" checked={this.state.textExampleTranslate}
                         onChange = {this.handleCheck}/>
                    </label>

                    <label>
                        Аудио с примером использования изучаемого слова:
                        <input id='audioExample' type="checkbox" checked={this.state.audioExample}
                         onChange = {this.handleCheck}/>
                    </label>

                    <label>
                        Транскрипция:
                        <input id='transcription' type="checkbox" checked={this.state.transcription}
                         onChange = {this.handleCheck}/>
                    </label>

                    <label>
                        Картинка:
                        <input id='image' type="checkbox" checked={this.state.image}
                         onChange = {this.handleCheck}/>
                    </label>

                    <label>
                        Кнопка удалить 
                        <input id='deleteButton' type="checkbox" checked={this.state.deleteButton}
                         onChange = {this.handleCheck}/>
                    </label>

                    <label>
                        Кнопка cложные слова 
                        <input id='hardButton' type="checkbox" checked={this.state.hardButton}
                         onChange = {this.handleCheck}/>
                    </label>

                    <label>
                        Кнопка показать перевод 
                        <input id='showWordButton' type="checkbox" checked={this.state.showWordButton}
                         onChange = {this.handleCheck}/>
                    </label>

                    <label>
                        Кнопка звука 
                        <input id='voiceAllow' type="checkbox" checked={this.state.voiceAllow}
                         onChange = {this.handleCheck}/>
                    </label>
                </form>
                </div>
                <button type="button" onClick={() => this.getResults()}>Editor</button>
                {this.state.isCheck ? <div>olololo</div> : null}
            </>
        )
    }


    displayCards(data, line = 0) {
        const translation = (this.state.translation && this.state.translationButton) ? {display: 'block'} : {display: 'none'}
        const transcription = this.state.transcription ? {display: 'block'} : {display: 'none'}
        const audio = this.state.audio ? {display: 'block'} : {display: 'none'}
        const meaning = this.state.meaning ? {display: 'block'} : {display: 'none'}
        const meaningRu = (this.state.meaningRu && this.state.translationButton) ? {display: 'block'} : {display: 'none'}
        const image = this.state.image ? {display: 'block'} : {display: 'none'}
        const meaningAudio = this.state.meaningAudio ? {display: 'block'} : {display: 'none'}
        const textExample = this.state.textExample ? {display: 'block'} : {display: 'none'}
        const textExampleTranslate = (this.state.textExampleTranslate && this.state.translationButton) ?  {display: 'block'} : {display: 'none'}
        const deleteButton = this.state.deleteButton ? {display: 'block'} : {display: 'none'}
        const hardButton = this.state.hardButton ? {display: 'block'} : {display: 'none'}
        const showWordButton = this.state.showWordButton ? {display: 'block'} : {display: 'none'}
        const audioExample = this.state.audioExample ? {display: 'block'} : {display: 'none'}
        const voiceAllow = this.state.voiceAllow ? {display: 'block'} : {display: 'none'}
        var hideTextMeaning;
        var hideTextExample;

        if (!this.state.answerButton) {
            hideTextMeaning = this.hideWord(data[line].textMeaning, data[line].word)
            hideTextExample = this.hideWord(data[line].textExample, data[line].word)
        } else {
            hideTextMeaning = this.showWords(data[line].textMeaning, data[line].word);
            hideTextExample = this.showWords(data[line].textExample, data[line].word);
        }
        
        const inputWidth = this.state.data[line].word.length * 15;
        const {endGame} = this.state;

        const page = endGame ? (<div>
            <div className={s.card}>
                <div className={s.card_word}>Слово: <input onKeyPress={(event) => this.handleKeyPress(event, data, this.state.line)} style={{width: inputWidth + 'px'}} type='text' onChange = {this.handleChangeInput} id="answer" value={this.state.answer} ref={this.myRef} autoFocus={true}/></div>
                <div style={translation}>Перевод: {data[line].wordTranslate}</div>
                <div style={transcription}>Транскрипция: {data[line].transcription}</div>
                <div style={audio}>Аудио: <audio controls src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${data[line].audio}`}></audio></div>
                <div style={image}>Картинка:  <img src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${data[line].image}`} width="200" height="200" alt='meaning' /></div>
                <div style={meaning}>Предложение на англе: {hideTextMeaning} </div>
                <div style={meaningRu}>Предложение на русском: {data[line].textMeaningTranslate}</div>
                <div style={meaningAudio}>Аудио значение на англе: <audio controls src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${data[line].audioMeaning}`}></audio></div>
                <div style={textExample}>Предложение с примером использования изучаемого слова: {hideTextExample}</div>
                <div style={textExampleTranslate}>Предложение с примером использования изучаемого слова на русском: {data[line].textExampleTranslate}</div>
                <div style={audioExample}>Аудио предложение на англе: <audio controls src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${data[line].audioExample}`}></audio></div>
                <button style={deleteButton} >Удалить</button>
                <button style={hardButton}>Сложные</button>
                <button style={showWordButton} onClick={() => this.toggleAnswer(data,this.state.line)}>Показать ответ</button>
                <button onClick={() => this.toggletranslationButton()}>Показать/Cкрыть перевод</button>
                <button style={voiceAllow} onClick={() => this.toggleSpeaking()}><i className="fas fa-volume-up fa-5x"/></button>
                <button type="button" onClick={() => this.increment(data,this.state.line)}>Next</button>
                <ProggresBarContainer>
                    <ProgressBar percentage={this.state.percentage}/>
                </ProggresBarContainer>
            </div>
        </div>) : (<div>
                <h2>Ура! На сегодня всё.</h2>
                <p>Есть ещё новые карточки, но дневной лимит исчерпан. Вы можете увеличить лимит в настройках, но, пожалуйста, имейте в виду, что чем больше новых карточек вы просмотрите, тем больше вас надо будет повтороять в ближайшее время.</p>
                <p>Для обучения сверх обычного расписания, нажмите кнопку 'Учить ещё' ниже</p>
                <button>Учить ещё</button>
        </div>)
    
        return(
            <>
                {page}
            </>
        )
    }

    async increment(data, line) {
        if (this.state.answer.toLowerCase() === this.state.data[this.state.line].word.toLowerCase()) {
            this.setState({answerButton: !this.state.answerButton});
            const step = 1 / this.state.countOfCards*100;
            this.setState({percentage: this.state.percentage + step})
            if(this.state.stopAudio) {
                await this.sayWord(this.state.answer)
                if (this.state.meaningAudio) {
                await this.sayWord(data[line].textMeaning)
                }
                if (this.state.audioExample) {
                    await this.sayWord(data[line].textExample)
                }
            }
            this.setState({ line: this.state.line + 1 });
            if (this.state.line === 19) {
                this.setState({ line: 0 });
                this.setState({ page: this.state.page + 1 });
                this.getResults();
            }

            this.setState({ count: this.state.count + 1 });
            if (this.state.count === this.state.countOfCards) {
                this.setState({endGame: false})
            } else {
                this.myRef.current.focus();
            }

            this.setState({ answer: '' });
            this.setState({answerButton: false})
        } else {
            console.log('Wrong word')
        }
    }

    handleKeyPress(event,data,line) {
        if (event.key === 'Enter') {
            this.increment(data,line)
        }
    }

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
    }

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
export default Settings;
