import React from 'react';
import s from './app-words.module.css';
import Page from '../app-page-structure/app-page-structure';


const token = window.localStorage.getItem('token');
const userId = window.localStorage.getItem('userId');

export default class Words extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            arrayOfDeletedWords: [],
            arrayOfHardWords: [],
            arrayOfLearnedWords: [],
            show: false,
            response: [],
            arrayOfCurrentDatesForHard: []
        }

        this.setUserWord = this.setUserWord.bind(this)
        this.showWords = this.showWords.bind(this)
    }

    componentDidMount() {
        this.getUserWord(userId);
        setTimeout(() => {
            this.setState({show: true});
        }, 3000)
    }

    getUserWord (userId) {
        fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`, {
          method: 'GET',
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${token}`,
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
            if (data[i].optional.deleted) {
                this.state.arrayOfDeletedWords.push(data[i])
            } else if (data[i].difficulty === 'hard') {
                this.state.arrayOfHardWords.push(data[i]);
            } else {
                this.state.arrayOfLearnedWords.push(data[i])
            }
        }
        console.log(this.state)
    }

    showRepeatStars(count) {
        let array = [];
        const star = (<i class="fas fa-star"></i>)
        for (let i=0 ; i < count; i++) {
            array.push(star)
        }
        return (array.map(element => (<span className={s.star}>{element} </span>)))
    }

    showWords (array, textOfButton) {
        if (array === this.state.arrayOfDeletedWords) {
            textOfButton = 'Восстановить'
        } else if (array === this.state.arrayOfHardWords) {
            textOfButton = 'Удалить из сложных'
        } else if (array === this.state.arrayOfLearnedWords) {
            textOfButton = 'Удалить из изученых'
        }
        return (array.map(element => (<div className={s.word}><span> {element.optional.word.word}{this.showRepeatStars(element.optional.repeat)}</span> 
            <span>{element.optional.word.transcription}</span>    
            <span>{element.optional.word.wordTranslate}</span>
            <span>Повторено/Изучено: {element.optional.currentDate}</span>
            <span>Следующее повторение: {element.optional.repeatDate}</span>
            <span>Всего повторений: {element.optional.repeat}</span>
            <button id={element.optional.word.id}  onClick={(event) => this.deleteWord(event, event.target.id, array)} className={s.word_button}>{textOfButton}</button>
            </div>)));
    };

    deleteWord(event,wordId, array) {
        fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
            method: 'DELETE',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            }
        })
        array = array.filter(item => item.optional.word.id !== event.target.id);
        console.log(event.target.textContent)
        if (event.target.textContent === 'Восстановить') {
            this.setState({arrayOfDeletedWords: array})
        } else if (event.target.textContent === 'Удалить из сложных') {
            this.setState({arrayOfHardWords: array})
        } else if (event.target.textContent === 'Удалить из изученых'){
            this.setState({arrayOfLearnedWords: array})
        }
    }

    render() {
        const {arrayOfDeletedWords, arrayOfHardWords, show, arrayOfLearnedWords} = this.state;
        return (
            <Page>
                <div className={'flex'}>
                    <div className={s.words_inner}>
                        <div className={s.words_item}>
                            Удалённые слова:
                            {show ? this.showWords(arrayOfDeletedWords) : null}
                        </div>
                        <div className={s.words_item}>
                            Сложные слова:
                            {show ? this.showWords(arrayOfHardWords) : null}
                        </div>
                        <div className={s.words_item}>
                            Изученные слова:
                            {show ? this.showWords(arrayOfLearnedWords) : null}
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
    
}

