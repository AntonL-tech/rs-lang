import React from 'react';
import s from './wordModal.module.css';

class WordInfo extends React.Component {
    delTeg = (str, tg) => {
        return str.split(`<${tg}>`).join(' ').split(`</${tg}>`).join(' ');
    };

    render() {
        let { objectword, closeWordModal, playAudioWord } = this.props;

        return (
            <div>
                {this.props.isOpenWordModal && (
                    <div className={s.modalOverlay}>
                        <div className={s.modalWindow}>
                            <div className={s.modalContent}>
                                <div className={s.exitGameIcon} onClick={closeWordModal}></div>
                                <div className={s.imgBlock}>
                                    <img className={s.img} src={`https://raw.githubusercontent.com/timon4ik2102/rslang-data/master/${objectword.image}`} alt='' />
                                </div>
                                <div className={s.wordblock}>
                                    <div className={s.audio} onClick={() => playAudioWord(objectword.audio)} />
                                    <div className={s.word}>{objectword.word}</div>
                                </div>
                                <div className={s.transcription}>{objectword.transcription}</div>
                                <div className={s.wordTranslate}>{objectword.wordTranslate}</div>
                                <div className={s.textExample}>{this.delTeg(objectword.textExample, 'b')}</div>
                                <div className={s.textExampleTranslate}>{objectword.textExampleTranslate}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default WordInfo;
