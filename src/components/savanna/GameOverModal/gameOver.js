import React from 'react';
import s from './gameOver.module.css';
import PropTypes from 'prop-types';

const GameOverModal = ({ title, isOpen, onCancel, onSubmit, notValidTitle, isValidTitle, numtrue, numfalse, notValidBlock, validBlock }) => {
    return (
        <>
            {isOpen && (
                <div className={s.modalOverlay}>
                    <div className={s.modalWindow}>
                        <div className={s.modalContent}>
                            <div className={s.modalTitle}>{title}</div>
                            <div className={s.validTitle}>
                                {isValidTitle}
                                {numtrue}
                            </div>
                            <div className={s.validTextBlock}>{validBlock}</div>
                            <div className={s.line} />
                            <div className={s.invalidTitle}>
                                {notValidTitle}
                                {numfalse}
                            </div>
                            <div className={s.invalidTextBlock}>{notValidBlock}</div>

                            <div className={s.modalCloseBtn} onClick={onSubmit}>
                                To main page
                            </div>
                            <div className={s.modalCancelBtn} onClick={onCancel}>
                                Continue
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

GameOverModal.propTypes = {
    title: PropTypes.string,
    notValidTitle: PropTypes.string,
    isValidTitle: PropTypes.string,
    isOpen: PropTypes.bool,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    numtrue: PropTypes.number,
    numfalse: PropTypes.number,
};

GameOverModal.defaultProps = {
    title: "It didn't work out this time, but keep working!",
    isOpen: false,
    notValidTitle: 'Errors ',
    isValidTitle: 'I know ',
    onCancel: () => {},
    onSubmit: () => {},
    numtrue: 0,
    numfalse: 0,
};
export default GameOverModal;
