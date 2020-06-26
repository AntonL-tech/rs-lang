import React from 'react';
import PropTypes from 'prop-types';
import s from './gamePauseModal.module.css';
import closeBtn from '../Assets/icons/clear.svg';

const closeIcon = {
    backgroundImage: `url(${closeBtn})`,
};

const Modal = ({ title, isOpen, onGameReturn, toMainMenu, subTitle, gamePause }) => {
    return (
        <div>
            <div className={s.muteIcon}></div>
            <div className={s.exitGameIcon} style={closeIcon} onClick={gamePause}></div>

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
    subTitle: PropTypes.string,
};

Modal.defaultProps = {
    title: "You haven't finished this training!",
    isOpen: false,
    onGameReturn: () => {},
    toMainMenu: () => {},
    gamePause: () => {},
    subTitle: 'If you return to the list, your results will not be saved',
};

export default Modal;
