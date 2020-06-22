import React, {Component} from 'react';
import s from './app-settings.module.css'
import Header from '../app-header/app-header'
import Sidebar from '../app-sidebar/app-sidebar'


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
           example: false,
           image: false,
           countOfWords: '',
           countOfCards: '',
           level: '',
           data: [],
           line: 0,
           page: 1,
           count: 0
        };

        this.setResults = this.setResults.bind(this)
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
        this.setState({ settingPage: false });
        console.log(data)
    }

    displayCards(data, line = 0) {
        const translation = this.state.translation ? {display: 'block'} : {display: 'none'}
        const transcription = this.state.transcription ? {display: 'block'} : {display: 'none'}
        const audio = this.state.audio ? {display: 'block'} : {display: 'none'}
        const meaning = this.state.meaning ? {display: 'block'} : {display: 'none'}
        const meaningRu = this.state.meaningRu ? {display: 'block'} : {display: 'none'}
        const image = this.state.image ? {display: 'block'} : {display: 'none'}
        const meaningAudio = this.state.meaningAudio ? {display: 'block'} : {display: 'none'}
        const textExample = this.state.textExample ? {display: 'block'} : {display: 'none'}
        const textExampleTranslate = this.state.textExampleTranslate ? {display: 'block'} : {display: 'none'}

        return(
            <div className={s.card}>
                <div>Слово: <input type='input' onChange = {this.handleChangeInput} id="answer" autoFocus={true}/></div>
                <div style={translation}>Перевод: {data[line].wordTranslate}</div>
                <div style={transcription}>Транскрипция: {data[line].transcription}</div>
                <div style={audio}>Аудио: <audio controls src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${data[line].audio}`}></audio></div>
                <div style={image}>Картинка:  <img src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${data[line].image}`} width="200" height="200" alt='meaning' /></div>
                <div style={meaning}>Предложение на англе: {data[line].textMeaning} </div>
                <div style={meaningRu}>Предложение на русском: {data[line].textMeaningTranslate}</div>
                <div style={meaningAudio}>Аудио предложение на англе: <audio controls src={`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${data[line].audioMeaning}`}></audio></div>
                <div style={textExample}>Предложение с примером использования изучаемого слова: {data[line].textExample}</div>
                <div style={textExampleTranslate}>Предложение с примером использования изучаемого слова на русском: {data[line].textExampleTranslate}</div>
            </div>
        )
    }

    increment() {
        if (this.state.answer.toLowerCase() === this.state.data[this.state.line].word.toLowerCase()) {
            this.sayWord(this.state.answer)
            console.log('Good job')
            this.setState({ line: this.state.line + 1 });
            if (this.state.line === 19) {
                this.setState({ line: 0 });
                this.setState({ page: this.state.page + 1 });
                this.getResults();
            }

            this.setState({ count: this.state.count + 1 });
            if (this.state.count === this.state.countOfWords) {
                console.log('Great')
            }
        } else {
            console.log('Wrong word')
        }
    }

    sayWord(word) {
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
    };

    render() {
        const { settingPage, data } = this.state;
        const page = settingPage ? (<div className={s.settings_inner}>
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
                        <input id='countOfWords' type="number" onChange = {this.handleChange} min="1" max="50"/>
                    </label>

                    <label>
                        Новых карточек в день:
                        <input id='countOfCards' type="number" onChange = {this.handleChange} min="1" max="50"/>
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
                        Транскрипция:
                        <input id='transcription' type="checkbox" checked={this.state.transcription}
                         onChange = {this.handleCheck}/>
                    </label>

                    <label>
                        Картинка:
                        <input id='image' type="checkbox" checked={this.state.image}
                         onChange = {this.handleCheck}/>
                    </label>
                </form>
            </div>
            <button type="button" onClick={() => this.getResults()}>Editor</button>
        </div>) :
        (<div>
            {this.displayCards(data,this.state.line)}
            <button type="button" onClick={() => this.increment()}>Next</button>
        </div>);


        return (
            <div>
                <Header/>
                <div>
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
