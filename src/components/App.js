import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
    }

    return (
        <div className='page'>
            <Header />
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
            <Footer />
            <PopupWithForm
                name="edit"
                title="Редактировать профиль"
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}>
                <fieldset className="form__inputs">
                    <input id="form_edit-name" className="form__input form__input-name" type="text" name="name"
                        minLength="2" maxLength="40" required placeholder="Имя" />
                    <span id="form_edit-name-error" className="form__error"></span>
                    <input id="form_edit-about" className="form__input form__input-about" type="text" name="about"
                        minLength="2" maxLength="200" required placeholder="О себе" />
                    <span id="form_edit-about-error" className="form__error"></span>
                    <button type="submit" className="form__save-button" defaultValue="Сохранить" name="submit">Сохранить</button>
                </fieldset>
            </PopupWithForm>

            <PopupWithForm
                name="add"
                title="Новое место"
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}>
                <fieldset className="form__inputs">
                    <input id="form_add-name" className="form__input form__input-card-name" type="text" name="name"
                        minLength="2" maxLength="30" required placeholder="Название" />
                    <span id="form_add-name-error" className="form__error"></span>
                    <input id="form_add-about" className="form__input form__input-src" type="url" name="about" required
                        placeholder="Ссылка на картинку" />
                    <span id="form_add-about-error" className="form__error"></span>
                    <button type="submit" className="form__save-button" defaultValue="Создать" name="submit">Создать</button>
                </fieldset>
            </PopupWithForm>

            <PopupWithForm
                name="avatar"
                title="Обновить аватар"
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}>
                <fieldset className="form__inputs">
                    <input id="form_avatar-edit" className="form__input form__input-link-avatar" type="url"
                        name="avatar-input" placeholder="Ссылка на картинку" required />
                    <span id="form_avatar-edit-error" className="form__error"></span>
                    <button type="submit" className="form__save-button" defaultValue="Сохранить" name="submit">Сохранить</button>
                </fieldset>
            </PopupWithForm>

            <ImagePopup />

            {/* 

            <div className="popup popup_zoom_img">
                <div className="popup__container">
                    <img src="#" className="popup__img" alt="#" />
                    <h3 className="popup__caption">Новое место</h3>
                    <button className="popup__close-button" type="button"
                        aria-label="закрыть окно приближения изображения карточки"></button>
                </div>
            </div>

            <div className="popup popup_delete_card">
                <div className="popup__container">
                    <h2 className="popup__title">Вы уверены?</h2>
                    <form className="form form_delete" name="delete-card" noValidate>
                        <button type="submit" className="form__save-button">Да</button>
                        <button type="button" className="popup__close-button"
                            aria-label="закрыть окно подтверждения удаления"></button>
                    </form>
                </div>
            </div> */}

        </div>
    );
}

export default App;
