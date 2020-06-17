import React from 'react';
import s from './exitGame.module.css';

class ExitGame extends React.Component {
    render() {
        return (
            <div className={s.ExitGameIcon}>              
            </div>
            <div className={s.ExitBlock}>
                <div className={s.ExitBlockTitle}>Тренировка не закончена!</div>
                <div className={s.ExitBlockText}>Если вы вернетесь к списку, ваши результаты будут потеряны</div>
                <button className={s.ExitBlockCloseBtn}>Закрыть</button>
                <div className={s.ExitBlockCanselBtn}>Отмена</div>
            </div>
        );
    }
}

export default ExitGame;

// const createFinishGameIcon = () => {
//     messageBlockElem.classList = 'message-block';
//     containerQuestion.append(messageBlockElem);
//     messageContainer.classList = 'message-block__container';
//     messageBlockElem.append(messageContainer);
//     alertText.classList = 'message-block__container_text';
//     messageContainer.append(alertText);
//     message.classList = 'message-block__container_icon';
//     messageContainer.append(message);
//     randomAudioVoice.play();
// };
