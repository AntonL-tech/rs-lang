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
            arrayOfHardWords: []
        }

        this.setUserWord = this.setUserWord.bind(this)
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
        for (let i = 0; i < data.length; i++) {
            if (data[i].optional.deleted) {
                this.state.arrayOfDeletedWords.push(data[i].optional.word.word)
            }
            if(data[i].difficulty === 'hard') {
                this.state.arrayOfHardWords.push(data[i].optional.word.word)
            }
        }
    }

    showWords (array) {
        console.log(array);
        // return (array.map(element => (<span>{element}</span>)));
        return <span>asdsad</span>
    };

    render() {
        const deletedWords = this.showWords(this.state.arrayOfDeletedWords);
        const hardWords = this.showWords(this.state.arrayOfHardWords);
        return (
            <div>
                <Header/>
                <div className={'flex'}>
                        <Sidebar/>
                        {this.getUserWord(userId)}
                        <div>
                            <div>
                                Удалённые слова:
                                {deletedWords}
                            </div>
                            <div>
                                Сложные слова:
                                {hardWords}
                            </div>
                        </div>
                </div>
            </div>
        )
    }
    
}
export default Words;
