import React from 'react';
import s from './gamePage.module.css';

import GameOverModal from '../GameOverModal/gameOver';
import GamePauseModal from '../GamePauseModal/gamePauseModal';
import WordModal from '../WordModal/wordModal';
import error from '../Assets/sounds/error.mp3';
import success from '../Assets/sounds/correct.mp3';
import start from '../Assets/sounds/start.mp3';
import star from '../Assets/icons/star-win.svg';
import starError from '../Assets/icons/star.svg';
import updateWord from '../../sprint-game/logic/updateWord'


class GamePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countCard: 0,
            page: 0,
            data: [],
            questionArray: [],
            questionWordObj: {},
            questionWordObjCopy: {},
            levelValue: this.props.levelValue,
            numberFive: 5,
            isShowBlock: true,
            countStar: 5,
            countStarError: 0,
            slideDone: true,
            isGameOver: false,
            isOpen: false,
            isStopGame: false,
            wrightWords: [],
            wrongWords: [],
            isSpinner: true,
            timer: 3,
            isStartFallingWord: false,
            clickedModalWord: {},
            isOpenWordModal: false,
            userLevel: false
        };
    }

    componentDidMount() {
        if (this.state.levelValue === 7) {
            let arr = this.props.userData;
            arr.map((el) => (el.class = 'answearWord'));
            this.randomArraySorted(arr);
            this.setState({data: arr, isSpinner: false});
            this.ourInterval();
            this.setState({userLevel: true})
        } else {

            this.getWords();
        }
        document.addEventListener('keydown', this.onKeyPressed);
    }

    onKeyPressed = (e) => {
        this.state.questionArray.forEach((element, i) => {
            if (i + 1 === +e.key) {
                this.answearWord(element, this.state.questionWordObj);
            }
        });
    };

    ourInterval = () => {
        this.intervalID = setInterval(() => this.tick(), 1000);
    };

    tick() {
        if (this.state.timer === 0) {
            this.playSound(start)
            this.setState({isStartFallingWord: true});
            this.changeCountCard();
            clearInterval(this.intervalID);
        }
        if (this.state.timer > 0) {
            this.setState({timer: this.state.timer - 1});
        }
    }

    stopGame = () => {
        if (this.state.timer > 0) return;
        else {
            this.setState({isOpen: true});
            const highestTimeoutId = setTimeout(() => {
            }, 1);
            for (let i = 0; i < highestTimeoutId; i++) {
                clearTimeout(i);
            }
            this.setState({countCard: this.state.countCard - 4, isShowBlock: false});
        }
    };

    clickToMainMenuReturn = () => {
        this.setState({isOpen: false});
        window.location.assign('/savanna');
    };

    clickToGameReturn = () => {
        this.setState({isOpen: false});
        this.changeCountCard(this.state.questionWordObjCopy);
    };

    getWords = () => {
        let {page, levelValue} = this.state;
        let arr = [];
        for (let i = page; i < page + 30; i++) {
            fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${i}&group=${levelValue}`)
                .then((res) => res.json())
                .then((data) => {
                    arr.push(...data);
                    if (arr.length >= 600) {
                        arr.map((el) => (el.class = 'answearWord'));
                        this.randomArraySorted(arr);
                        this.setState({data: arr, isSpinner: false});
                        this.ourInterval();
                    }
                });
        }
    };

    playSound = (src) => {
        if (this.props.sound) {
            const audio = new Audio();
            audio.src = src;
            audio.autoplay = true;
        }
    };

    randomArraySorted = (array) => {
        for (let i = array.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    checkWordFinish = (slideDone) => {
        if (slideDone) {
            this.setState({isShowBlock: false});
            this.playSound(error);
            this.setState({
                countStarError: this.state.countStarError + 1,
                countStar: this.state.countStar - 1,
                wrongWords: [...this.state.wrongWords, this.state.questionWordObj],
            });

            const newQuestionArray = this.state.questionArray.map((el) => {
                let elementlClass = el.class;
                if (el.id === this.state.questionWordObj.id) {
                    elementlClass = 'RightAnswer';
                }
                return {...el, class: elementlClass};
            });
            if (this.state.userLevel) {

                updateWord(this.state.questionWordObj.id)
            }

            this.setState({questionArray: newQuestionArray});
            setTimeout(() => this.changeCountCard(), 500);
        }
    };

    answearWord = (field, obj) => {
        this.setState({slideDone: false, isShowBlock: false});
        const highestTimeoutId = setTimeout(() => {
        }, 1);
        for (let i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i);
        }

        if (field.id === obj.id) {

            this.playSound(success);
            const newQuestionArray = this.state.questionArray.map((el) => {
                let elementlClass = el.class;
                if (el.id === field.id) {
                    elementlClass = 'RightAnswer';
                }
                return {...el, class: elementlClass};
            });
            this.setState({
                wrightWords: [...this.state.wrightWords, this.state.questionWordObj],
            });
            this.setState({questionArray: newQuestionArray});
        } else {
            this.playSound(error);
            this.setState({countStarError: this.state.countStarError + 1, countStar: this.state.countStar - 1});

            const newQuestionArray = this.state.questionArray.map((el) => {
                let elementlClass = el.class;
                if (el.id === field.id) {
                    elementlClass = 'WrongAnswer';
                    if (this.state.userLevel) {
                        console.log(obj.word)
                        updateWord(obj.id)
                    }

                }
                if (el.id === obj.id) {
                    elementlClass = 'RightAnswer';
                }
                return {...el, class: elementlClass};
            });
            this.setState({
                wrongWords: [...this.state.wrongWords, this.state.questionWordObj],
            });

            this.setState({questionArray: newQuestionArray});
        }

        setTimeout(() => this.changeCountCard(), 500);
    };

    createQuestionAnswearWords = (someWord) => {
        const {countCard, data} = this.state;
        this.setState({questionArray: data.slice(countCard, countCard + 4)});

        if (someWord === undefined) {
            this.setState({
                questionWordObj: data.slice(countCard, countCard + 4)[Math.floor(Math.random() * 4)],
            });

            this.setState({
                questionWordObjCopy: this.state.questionWordObj,
            });
        } else {
            this.setState({
                questionWordObj: someWord,
                questionWordObjCopy: someWord,
            });
        }

        this.setState({countCard: countCard + 4});
    };

    changeCountCard(someWord) {
        const {countCard, data} = this.state;
        if (this.state.countStarError >= 5 || countCard === 600 || countCard + 4 > data.length) {
            this.showGameOverModal();
            this.setState({isShowBlock: false});
        } else {
            this.createQuestionAnswearWords(someWord);
            setTimeout(() => this.checkWordFinish(this.state.slideDone), 5000);
            this.setState({slideDone: true, isShowBlock: true});
        }
    }

    showGameOverModal = () => {
        this.setState({isGameOver: true});
    };

    handleContinueGame = () => {
        window.location.assign('/savanna');
        this.setState({isGameOver: false});
    };

    handleToMainMenu = () => {
        window.location.assign('/');
        this.setState({isGameOver: false});
    };

    playAudioEnd = (str) => {
        if (this.props.sound) {
            const audio = new Audio(`https://raw.githubusercontent.com/timon4ik2102/rslang-data/master/${str}`);
            audio.play();
        }
    };

    showWordInfo = (obj) => {
        this.setState({clickedModalWord: obj, isOpenWordModal: true});
    };

    closeWordModal = () => {
        this.setState({isOpenWordModal: false});
    };

    render() {
        const {questionArray, questionWordObj, isShowBlock, countStar, countStarError, isGameOver, isOpen, wrightWords, wrongWords, clickedModalWord} = this.state;

        const messageForKeyboard = 'Use keys 1, 2, 3 and 4 to give a quick answer';

        const wordBlock = isShowBlock && this.state.isStartFallingWord ?
            <div className={s.questionWord}>{questionWordObj.word}</div> : <div></div>;

        const wordList = questionArray.map((field) => (
            <div key={field.id} className={s[field.class]} onClick={() => this.answearWord(field, questionWordObj)}>
                {field.wordTranslate}
            </div>
        ));

        const wrongWordList = wrongWords.map((field) => (
            <div className={s.statLines} key={field.id}>
                <div className={s.soundBtn} onClick={() => this.playAudioEnd(field.audio)}></div>
                <div className={s.lineWord} onClick={() => this.showWordInfo(field)}>
                    {field.word}
                </div>
                {' '}
                <span>- {field.wordTranslate}</span>
            </div>
        ));

        const wrightWordList = wrightWords.map((field) => (
            <div className={s.statLines} key={field.id}>
                <div className={s.soundBtn} onClick={() => this.playAudioEnd(field.audio)}></div>
                <div className={s.lineWord} onClick={() => this.showWordInfo(field)}>
                    {field.word}
                </div>
                {' '}
                <span>- {field.wordTranslate}</span>
            </div>
        ));

        const title = wrightWords.length > wrongWords.length ? 'Good job. But not stop please' : 'Please. Work hardly';

        return (
            <>
                <div className={s.gamePage}>
                    <div
                        className={!this.state.isSpinner && this.state.timer !== 0 ? `${s.timer}` : `${s.none}`}>{this.state.timer}</div>

                    <div className={this.state.isSpinner ? `${s.loader}` : ''}></div>
                    <div>
                        {Array.from({length: countStarError}, () => null).map((field, i) => (
                            <img key={i.toString() + 5} className={s.starsBlock} src={starError} alt=''></img>
                        ))}
                        {Array.from({length: countStar}, () => null).map((field, i) => (
                            <img key={i.toString() + 5} className={s.starsBlock} src={star} alt=''></img>
                        ))}
                    </div>
                    <div
                        className={!this.state.isSpinner && this.state.timer !== 0 ? `${s.msg}` : `${s.none}`}>{messageForKeyboard}</div>

                    <div className={s.questionWordBlock}>{wordBlock}</div>

                    <div className={s.answearBlock}>{wordList}</div>
                </div>
                <GamePauseModal
                    isOpen={isOpen}
                    gamePause={this.stopGame}
                    sound={this.props.sound}
                    gameSound={this.props.handleSound}
                    onGameReturn={this.clickToGameReturn}
                    toMainMenu={this.clickToMainMenuReturn}
                >
                    {' '}
                </GamePauseModal>
                <GameOverModal
                    isOpen={isGameOver}
                    numtrue={this.state.wrightWords.length}
                    numfalse={this.state.wrongWords.length}
                    onCancel={this.handleContinueGame}
                    onSubmit={this.handleToMainMenu}
                    notValidBlock={wrongWordList}
                    validBlock={wrightWordList}
                    title={title}
                >
                    {' '}
                </GameOverModal>

                <WordModal isOpenWordModal={this.state.isOpenWordModal} playAudioWord={this.playAudioEnd}
                           closeWordModal={this.closeWordModal} objectword={clickedModalWord}>
                    {' '}
                </WordModal>
            </>
        );
    }
}

export default GamePage;
