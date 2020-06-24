import React from 'react';
import s from './gameOver.module.css';
import PropTypes from 'prop-types';

const GameOverModal = ({ title, isOpen, onCancel, onSubmit, notValidTitle, isValidTitle, numtrue, numfalse }) => {
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

                            <div className={s.invalidTitle}>
                                {notValidTitle}
                                {numfalse}
                            </div>
                            <div className={s.modalCloseBtn} onClick={onSubmit}>
                                На главную
                            </div>
                            <div className={s.modalCancelBtn} onClick={onCancel}>
                                Продолжить тренировку
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
    title: 'Неплохо, но есть над чем поработать!',
    isOpen: false,
    notValidTitle: 'Ошибок ',
    isValidTitle: 'Знаю ',
    onCancel: () => {},
    onSubmit: () => {},
    numtrue: 0,
    numfalse: 0,
};
export default GameOverModal;
