import React from 'react';
import s from './app-words.module.css';
import Page from '../app-page-structure/app-page-structure';


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
            arrayOfCurrentDatesForHard: [],
            translation: localStorage.getItem('translation'),
            transcription: localStorage.getItem('transcription'),
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId'),
            deletedWords: false,
            hardWords: false,
            learnedWords: false
        }

        this.setUserWord = this.setUserWord.bind(this)
        this.showWords = this.showWords.bind(this)
    }

    componentDidMount() {
        this.getUserWord(this.state.userId);
        setTimeout(() => {
            this.setState({show: true});
        }, 3000)
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
            if (data[i].optional.deleted) {
                this.state.arrayOfDeletedWords.push(data[i])
            } else if (data[i].difficulty === 'hard') {
                this.state.arrayOfHardWords.push(data[i]);
            } else {
                this.state.arrayOfLearnedWords.push(data[i])
            }
        }
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
            textOfButton = 'RESTORE'
        } else if (array === this.state.arrayOfHardWords) {
            textOfButton = 'REMOVE'
        } else if (array === this.state.arrayOfLearnedWords) {
            textOfButton = 'DELETE'
        }
        return (array.map(element => (<div className={s.word}><span> {element.optional.word.word}{this.showRepeatStars(element.optional.repeat)}</span> 
            {this.state.transcription === 'true' ? <span>{element.optional.word.transcription}</span> : null}    
            {this.state.translation === 'true' ? <span>{element.optional.word.wordTranslate}</span> : null}
            <span>Repeated / Studied: {element.optional.currentDate}</span>
            <span>Next repeat: {element.optional.repeatDate}</span>
            <span>Total reps: {element.optional.repeat}</span>
            <button id={element.optional.word.id}  onClick={(event) => this.deleteWord(event, event.target.id, array)} className={s.word_button}>{textOfButton}</button>
            </div>)));
    };

    deleteWord(event,wordId, array) {
        fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.state.userId}/words/${wordId}`, {
            method: 'DELETE',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${this.state.token}`,
                'Accept': 'application/json',
            }
        })
        array = array.filter(item => item.optional.word.id !== event.target.id);
        if (event.target.textContent === 'RESTORE') {
            this.setState({arrayOfDeletedWords: array})
        } else if (event.target.textContent === 'REMOVE') {
            this.setState({arrayOfHardWords: array})
        } else if (event.target.textContent === 'DELETE'){
            this.setState({arrayOfLearnedWords: array})
        }
    }

    showContent(event) {
        this.setState({deletedWords: false})
        this.setState({hardWords: false})
        this.setState({learnedWords: false})
        if (event.target.textContent === 'Deleted words') {
            this.setState({deletedWords: true})
        }
        if (event.target.textContent === 'Hard words') {
            this.setState({hardWords: true})
        }
        if (event.target.textContent === 'Learned words') {
            this.setState({learnedWords: true})
        }
        
    }

    render() {
        const {arrayOfDeletedWords, arrayOfHardWords, show, arrayOfLearnedWords, deletedWords, hardWords, learnedWords} = this.state;
        return (
            <Page>
                <div className={'flex'}>
                    <div className={s.words_inner}>
                        <div className={s.words_nav}>
                            <button className={deletedWords ? s.nav_btn_active : s.nav_btn} onClick={(event) => this.showContent(event)}>Deleted words</button>
                            <button className={hardWords ? s.nav_btn_active : s.nav_btn} onClick={(event) => this.showContent(event)}>Hard words</button>
                            <button className={learnedWords ? s.nav_btn_active : s.nav_btn} onClick={(event) => this.showContent(event)}>Learned words</button>
                        </div>
                        {deletedWords ? <div className={s.words_item}>
                            <div className={s.word_title}>DELETED WORDS</div>
                            <div className={s.words_content}>{show ? this.showWords(arrayOfDeletedWords) : null}</div>
                        </div> : null}
                        {hardWords ? <div className={s.words_item}>
                            <div className={s.word_title}>Hard words</div>
                            <div className={s.words_content}>{show ? this.showWords(arrayOfHardWords) : null}</div>
                        </div> : null} 
                        {learnedWords ? <div className={s.words_item}>
                            <div className={s.word_title}>Learned words</div>
                            <div className={s.words_content}>{show ? this.showWords(arrayOfLearnedWords) : null}</div>
                        </div> : null}
                    </div>
                </div>
            </Page>
        )
    }
    
}

