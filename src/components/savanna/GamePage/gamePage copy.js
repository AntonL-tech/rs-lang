import React from 'react';
import s from './gamePage.module.css';

import GameOverModal from '../GameOverModal/gameOver';
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
            levelValue: this.props.levelValue,
            numberFive: 5,
            isShowBlock: true,
            countStar: 5,
            countStarError: 0,
            isClicked: false,
            isCorrectAnswer: false,
            slideDone: true,
            isGameOver: false,
            isToMainMenu: false,
            isContinue: false,
        };
    }

    componentDidMount() {
        this.getWords();
    }

    addGreenBg = (e) => {
        e.currentTarget.classList.add('active');
    };

    getWords = () => {
        console.log('Клик начать и запрос на слова', this.state.levelValue);
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

                        this.setState({ data: arr });
                        this.changeCountCard();
                        this.setState({ page: page + numberFive });
                        console.log(this.state);
                    }
                });
        }
    };

    // handleStartGame = () => {
    //     this.getWords();
    // };

    playSound = (src) => {
        const audio = new Audio();
        audio.src = src;
        audio.autoplay = true;
    };

    randomArraySorted = (array) => array.sort(() => 0.5 - Math.random());

    checkWordFinish = (slideDone) => {
        if (slideDone) {
            this.setState({ isShowBlock: false });
            console.log('FALSE');
            this.playSound(error);
            this.setState({ countStarError: this.state.countStarError + 1, countStar: this.state.countStar - 1 });

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

            console.log(this.state);
            this.setState({ questionArray: newQuestionArray });
        }

        setTimeout(() => this.changeCountCard(), 500);
    };

    changeCountCard() {
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
                this.setState({
                    questionWordObj: data.slice(countCard, countCard + 4)[Math.floor(Math.random() * 4)],
                });
                this.setState({ countCard: countCard + 4 });
            }

            setTimeout(() => this.checkWordFinish(this.state.slideDone), 5000);
            this.setState({ slideDone: true });
        }
    }

    showGameOverModal = () => {
        this.setState({ isGameOver: true });
    };

    handleToMainMenu = () => {
        console.log('Submit function!');
        window.location.assign('/start');
        this.setState({ isGameOver: false });
    };

    handleContinueGame = () => {
        console.log('Cancel function!');
        window.location.assign('/start');
        this.setState({ isGameOver: false });
    };

    render() {
        const { questionArray, questionWordObj, isShowBlock, countStar, countStarError, isGameOver } = this.state;

        const wordBlock = isShowBlock ? <div className={s.questionWord}>{questionWordObj.word}</div> : <div></div>;

        const wordList = questionArray.map((field, i, array) => (
            <div key={field.id} className={s[field.class]} onClick={(e) => this.answearWord(field, questionWordObj)}>
                {field.wordTranslate}
            </div>
        ));

        return (
            <div className={s.gamePage}>
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
                <GameOverModal isOpen={isGameOver} onCancel={this.handleContinueGame} onSubmit={this.handleToMainMenu}>
                    {' '}
                </GameOverModal>
            </div>
        );
    }
}

export default GamePage;
