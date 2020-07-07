import React from 'react';
import PropTypes from 'prop-types';
import s from './gamePauseModal.module.css';

const Modal = ({ title, isOpen, onGameReturn, toMainMenu, subTitle, gamePause, gameSound, sound }) => {
    const logo = require('../Assets/icons/sound.svg');
    const logot = require('../Assets/icons/no-sound.svg');
    const wordBlock = sound ? <img src={logo} alt='' /> : <img src={logot} alt='' />;

    return (
        <div>
            <div class={s.muteIcon} onClick={gameSound}>
                {wordBlock}
            </div>
            <div className={s.exitGameIcon} onClick={gamePause}></div>
            {isOpen && (
                <div className={s.modalOverlay}>
                    <div className={s.modalWindow}>
                        <div className={s.modalContent}>
                            <div className={s.modalTitle}>{title}</div>
                            <div className={s.modalText}>{subTitle}</div>
                            <div className={s.modalCloseBtn} onClick={toMainMenu}>
                                Close
                            </div>
                            <div className={s.modalCancelBtn} onClick={onGameReturn}>
                                Cancel
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    onGameReturn: PropTypes.func,
    toMainMenu: PropTypes.func,
    gamePause: PropTypes.func,
    gameSound: PropTypes.func,
    subTitle: PropTypes.string,
};

Modal.defaultProps = {
    title: "You haven't finished this training!",
    isOpen: false,
    onGameReturn: () => {},
    toMainMenu: () => {},
    gamePause: () => {},
    gameSound: () => {},
    subTitle: 'If you return to the list, your results will not be saved',
};

export default Modal;
