import React, {Component} from 'react';
import s from './app-settings.module.css'

class Settings extends React.Component{
    state = {
        translation: false,
        transcription: false,
        meaning: false,
        example: false,
        image: false,
        countOfWords: '',
        countOfCards: ''
    }

    handleChange = (event) => {
        console.log(+event.target.value);
        this.setState({[event.target.id]: +event.target.value})

    }

    handleCheck = (event) => {
        console.log(event.target.id);
        console.log(this);
        this.setState({[event.target.id]: event.target.checked})

    }

    showState = (event) => {
        event.preventDefault()
        console.log(this.state)
    }


    render() {
        return (
            <div className={s.settings_inner}>
                <form className={s.settings_form}>
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
                        Предложение с объяснением значения слова:
                        <input id='meaning' type="checkbox" checked={this.state.meaning}
                         onChange = {this.handleCheck}/>
                    </label>

                    <label>
                        Предложение с примером использования изучаемого слова:
                        <input id='example' type="checkbox" checked={this.state.example}
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
                    
                    <input type="submit" value="Submit" onClick={this.showState} />
                </form>
            </div>
        );
    }
}
export default Settings;
