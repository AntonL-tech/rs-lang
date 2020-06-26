import React from 'react';
import s from './gamePage.module.css';

import GameOverModal from '../GameOverModal/gameOver';
import GamePauseModal from '../GamePauseModal/gamePauseModal';
import error from '../Assets/sounds/error.mp3';
import success from '../Assets/sounds/correct.mp3';
import star from '../Assets/icons/star-win.svg';
import starError from '../Assets/icons/star.svg';

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
        };
    }

    componentDidMount() {
        this.getWords();
    }

    ourInterval = () => {
        this.intervalID = setInterval(() => this.tick(), 1000);
    };

    tick() {
        console.log(this.state.isSpinner);
        if (this.state.timer === 0) {
            this.setState({ isStartFallingWord: true });
            this.changeCountCard();
            clearInterval(this.intervalID);
        }
        if (this.state.timer > 0) {
            this.setState({ timer: this.state.timer - 1 });
        }
    }

    stopGame = () => {
        this.setState({ isOpen: true });
        const highestTimeoutId = setTimeout(() => {}, 1);
        for (let i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i);
        }

        this.setState({ countCard: this.state.countCard - 4 });
        this.setState({ isShowBlock: false });
    };

    clickToMainMenuReturn = () => {
        this.setState({ isOpen: false });
        window.location.assign('/start');
    };

    clickToGameReturn = () => {
        this.setState({ isOpen: false });
        this.changeCountCard(this.state.questionWordObjCopy);
    };

    getWords = () => {
        let { page, levelValue, numberFive } = this.state;
        let arr = [];
        for (let i = page; i < page + numberFive; i++) {
            fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${i}&group=${levelValue}`)
                .then((res) => res.json())
                .then((data) => {
                    arr.push(...data);
                    if (arr.length >= 100) {
                        arr.map((el) => (el.class = 'answearWord'));
                        this.randomArraySorted(arr);
                        this.setState({ data: arr, isSpinner: false });
                        // this.changeCountCard();
                        this.ourInterval();
                    }
                });
        }
    };

    playSound = (src) => {
        const audio = new Audio();
        audio.src = src;
        audio.autoplay = true;
    };

    randomArraySorted = (array) => {
        for (let i = array.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    checkWordFinish = (slideDone) => {
        if (slideDone) {
            this.setState({ isShowBlock: false });
            this.playSound(error);
            this.setState({ countStarError: this.state.countStarError + 1, countStar: this.state.countStar - 1 });
            this.setState({
                wrongWords: [...this.state.wrongWords, this.state.questionWordObj],
            });

            const newQuestionArray = this.state.questionArray.map((el) => {
                let elementlClass = el.class;
                if (el.id === this.state.questionWordObj.id) {
                    elementlClass = 'RightAnswer';
                }
                return { ...el, class: elementlClass };
            });

            this.setState({ questionArray: newQuestionArray });
            setTimeout(() => this.changeCountCard(), 500);
        }
    };

    answearWord = (field, obj) => {
        this.setState({ slideDone: false });
        this.setState({ isShowBlock: false });
        const highestTimeoutId = setTimeout(() => {}, 1);
        for (let i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i);
        }

        if (field.id === obj.id) {
            console.log('TRUE');
            this.playSound(success);
            const newQuestionArray = this.state.questionArray.map((el) => {
                let elementlClass = el.class;
                if (el.id === field.id) {
                    elementlClass = 'RightAnswer';
                }
                return { ...el, class: elementlClass };
            });
            this.setState({
                wrightWords: [...this.state.wrightWords, this.state.questionWordObj],
            });
            this.setState({ questionArray: newQuestionArray });
        } else {
            console.log('FALSE');
            this.playSound(error);
            this.setState({ countStarError: this.state.countStarError + 1, countStar: this.state.countStar - 1 });

            const newQuestionArray = this.state.questionArray.map((el) => {
                let elementlClass = el.class;
                if (el.id === field.id) {
                    elementlClass = 'WrongAnswer';
                }
                if (el.id === obj.id) {
                    elementlClass = 'RightAnswer';
                }
                return { ...el, class: elementlClass };
            });
            this.setState({
                wrongWords: [...this.state.wrongWords, this.state.questionWordObj],
            });

            this.setState({ questionArray: newQuestionArray });
        }

        setTimeout(() => this.changeCountCard(), 500);
    };

    changeCountCard(someWord) {
        if (this.state.countStarError === 5) {
            this.showGameOverModal();
            this.setState({ isShowBlock: false });
        } else {
            this.setState({ isShowBlock: true });

            const { countCard, data } = this.state;
            if (countCard === 100) {
                this.setState({ countCard: 0 });
                this.getWords();
            }
            if (countCard <= 96) {
                this.setState({ questionArray: data.slice(countCard, countCard + 4) });

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
                    });
                    this.setState({
                        questionWordObjCopy: someWord,
                    });
                }

                this.setState({ countCard: countCard + 4 });
            }

            setTimeout(() => this.checkWordFinish(this.state.slideDone), 5000);
            this.setState({ slideDone: true });
        }
    }

    showGameOverModal = () => {
        this.setState({ isGameOver: true });
    };

    handleContinueGame = () => {
        window.location.assign('/start');
        this.setState({ isGameOver: false });
    };

    handleToMainMenu = () => {
        window.location.assign('/start');
        this.setState({ isGameOver: false });
    };

    render() {
        const { questionArray, questionWordObj, isShowBlock, countStar, countStarError, isGameOver, isOpen, wrightWords, wrongWords } = this.state;

        const wordBlock = isShowBlock && this.state.isStartFallingWord ? <div className={s.questionWord}>{questionWordObj.word}</div> : <div></div>;

        const wordList = questionArray.map((field, i, array) => (
            <div key={field.id} className={s[field.class]} onClick={(e) => this.answearWord(field, questionWordObj)}>
                {field.wordTranslate}
            </div>
        ));

        const wrongWordList = wrongWords.map((field, i, array) => (
            <div key={field.id}>
                <span className={s.lineWord}>{field.word}</span> <span>- {field.wordTranslate}</span>
            </div>
        ));

        const wrightWordList = wrightWords.map((field, i, array) => (
            <div key={field.id}>
                <span className={s.lineWord}>{field.word}</span> <span>- {field.wordTranslate}</span>
            </div>
        ));

        const title = wrightWords.length > wrongWords.length ? 'Good job. But not stop please' : 'Please. Work hardly';

        return (
            <>
                <div className={s.gamePage}>
                    <div className={!this.state.isSpinner && this.state.timer !== 0 ? `${s.timer}` : `${s.none}`}>{this.state.timer}</div>
                    <div className={this.state.isSpinner ? `${s.loader}` : ''}></div>
                    <div>
                        {Array.from({ length: countStarError }, () => null).map((field, i) => (
                            <img key={i.toString() + 5} className={s.starsBlock} src={starError} alt=''></img>
                        ))}
                        {Array.from({ length: countStar }, () => null).map((field, i) => (
                            <img key={i.toString() + 5} className={s.starsBlock} src={star} alt=''></img>
                        ))}
                    </div>
                    <div className={s.questionWordBlock}>{wordBlock}</div>
                    <div className={s.answearBlock}>{wordList}</div>
                </div>
                <GamePauseModal isOpen={isOpen} gamePause={this.stopGame} onGameReturn={this.clickToGameReturn} toMainMenu={this.clickToMainMenuReturn}>
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
            </>
        );
    }
}

export default GamePage;
