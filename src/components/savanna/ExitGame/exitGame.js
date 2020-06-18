import React from 'react';
import PropTypes from 'prop-types';
import s from './exitGame.module.css';

// import Icon from '../Assets/icons/clear.svg';
// import Button from '../button/Button';
// import closeBtn from './Assets/icons/clear.svg';

const Modal = ({ title, isOpen, onCancel, onSubmit, subTitle }) => {
    return (
        <>
            {isOpen && (
                <div className={s.modalOverlay}>
                    <div className={s.modalWindow}>
                        <div className={s.modalContent}>
                            <div className={s.modalTitle}>{title}</div>
                            <div className={s.modalText}>{subTitle}</div>
                            <div className={s.modalCloseBtn} onClick={onSubmit}>
                                Закрыть
                            </div>
                            <div className={s.modalCanselBtn} onClick={onCancel}>
                                Отмена
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    subTitle: PropTypes.string,
};

Modal.defaultProps = {
    title: 'Тренировка не закончена!',
    isOpen: false,
    onCancel: () => {},
    onSubmit: () => {},
    subTitle: 'Если вы вернетесь к списку, ваши результаты не будут сохранены',
};

export default Modal;
