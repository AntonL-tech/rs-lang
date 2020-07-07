import React from 'react';
import s from './app-words.module.css'
import Header from '../app-header/app-header'
import Sidebar from '../app-sidebar/app-sidebar'
import PropTypes from 'prop-types'


const token = window.localStorage.getItem('token');
const userId = window.localStorage.getItem('userId');



class Words extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            arrayOfDeletedWords: [],
            arrayOfHardWords: [],
            arrayOfLearnedWords: [],
            show: false
        }

        this.setUserWord = this.setUserWord.bind(this)
        this.showWords = this.showWords.bind(this)
    }

    componentDidMount() {
        this.getUserWord(userId);
        setTimeout(() => {
            this.setState({show: true});
        }, 1000)
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
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            if (data[i].optional.deleted) {
                this.state.arrayOfDeletedWords.push(data[i].optional.word)
            } else if (data[i].difficulty === 'hard') {
                this.state.arrayOfHardWords.push(data[i].optional.word)
            } else (
                this.state.arrayOfLearnedWords.push(data[i].optional.word)
            )
        }
        console.log(this.state)
    }

    showWords (array, textOfButton) {
        if (array === this.state.arrayOfDeletedWords) {
            textOfButton = 'Восстановить'
        } else if (array === this.state.arrayOfHardWords) {
            textOfButton = 'Удалить из сложных'
        } else if (array === this.state.arrayOfLearnedWords) {
            textOfButton = 'Удалить из изученых'
        }
        return (array.map(element => (<div className={s.word}><span> {element.word} </span> <button id={element.id}  onClick={(event) => this.deleteWord(event, event.target.id, array)} className={s.word_button}>{textOfButton}</button></div>)));
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
        array = array.filter(item => item.id !== event.target.id);
        console.log(event.target.textContent)
        if (event.target.textContent === 'Восстановить') {
            this.setState({arrayOfDeletedWords: array})
        } else if (event.target.textContent === 'Удалить из сложных') {
            this.setState({arrayOfHardWords: array})
        } else if (event.target.textContent === 'Удалить из изученых'){
            this.setState({arrayOfLearnedWords: array})
        }
        // this.setState({array: array})
        console.log(array)
    }

    render() {
        const {arrayOfDeletedWords, arrayOfHardWords, show, arrayOfLearnedWords} = this.state;
        return (
            <div>
                <Header/>
                <div className={'flex'}>
                        <Sidebar/>
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
            </div>
        )
    }
    
}
export default Words;
