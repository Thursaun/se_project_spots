import "../pages/index.css";
import { enableValidation, resetValidation, settings } from "../scripts/validation.js";
import Api from "../utils/api.js";
import { handleSubmit } from "../utils/helper.js";


// DOM Elements
//Universal elements
const closeButtons = document.querySelectorAll('.modal__close-btn')

// Edit Profile Elements
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarFormElement = document.forms["avatar-form"];
const avatarLinkInput = avatarModal.querySelector("#profile-avatar-input");
const profileEditButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__avatar")
const editModal = document.querySelector("#edit-modal");
const editFormElement = document.forms["profile-form"];
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector("#profile-description-input");

// Preview Elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

// Card-related Elements
const cardModal = document.querySelector("#add-card-modal");
const cardModalBtn = document.querySelector(".profile__add-btn");
const cardFormElement = document.forms["add-card-form"];
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list")
let selectedCard, selectedCardId;

// Delete Elements
const deleteModal = document.querySelector("#delete-modal");
const deleteFormElement = document.forms["delete-form"];
const cancelModalBtn = document.querySelector(".modal__cancel-btn")


const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "1aeb74b8-8c69-4315-8442-0245d829c747",
    "Content-Type": "application/json"
  }
});


api.getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((item) => {
      renderCard(item);
    });
    return api.getUserInfo()
    .then((userInfo) => {
      profileName.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      profileImage.src = userInfo.avatar;
    })
  }).catch(console.error);

function getCardElement(data) {
  console.log(data)

  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-btn_liked");
  }

  cardLikeBtn.addEventListener("click", (evt) => handleLikeCard(evt, data._id));
  cardDeleteBtn.addEventListener("click", () => handleDeleteCard(cardElement, data._id));

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalCaptionEl.textContent = data.name;
    previewModalImageEl.alt = data.name;
  });
  return cardElement;
}

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[ method ](cardElement);
}

// Functions
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener('keydown', handleEscKey);
  modal.addEventListener('mousedown', handleOverlayClick);
};

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener('keydown', handleEscKey);
  modal.removeEventListener('mousedown', handleOverlayClick);
};

function handleEscKey(evt) {
  if (evt.key === 'Escape') {
    const activeModal = document.querySelector('.modal_opened');
    if (activeModal) {
      closeModal(activeModal);
    }
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains('modal_opened')) {
    closeModal(evt.target);
  }
}

function makeEditRequest() {
  return api.editUserInfo({
    name: editModalNameInput.value,
    about: editModalDescriptionInput.value
  }).then((userInfo) => {
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
  });
}

function handleEditFormSubmit(evt) {
  handleSubmit(makeEditRequest, evt, 'Saving...');
}

function makeCardRequest() {
  return api.addNewCard({name: cardNameInput.value, link: cardLinkInput.value})
  .then(renderCard)
  .then(() => closeModal(cardModal, cardFormElement))
}

function handleAddCardSubmit(evt) {
  handleSubmit(makeCardRequest, evt, 'Saving...');
}

function makeAvatarRequest() {
  return api.editUserAvatar({ avatar: avatarLinkInput.value })
  .then((userPic) => {
    profileImage.src = userPic.avatar;
    closeModal(avatarModal);
  })
}

function handleAvatarSubmit(evt) {
  handleSubmit(makeAvatarRequest, evt, 'Saving...');
}

function makeDeleteRequest() {
  return api.deleteCard(selectedCardId)
  .then(() => {
    selectedCard.remove();
    closeModal(deleteModal);
  })
}

function handleDeleteSubmit(evt) {
  handleSubmit(makeDeleteRequest, evt, 'Deleting...');
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleLikeCard(evt, id) {
  const isLiked = evt.target.classList.contains("card__like-btn_liked")
  api.toggleLike(id, isLiked)
    .then((data) => {
      data.isLiked = !isLiked;
      evt.target.classList.toggle("card__like-btn_liked");
    })
    .catch(console.error);
}

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  openModal(editModal);
});

cardModalBtn.addEventListener("click", () => {
  resetValidation(cardFormElement, settings)
  openModal(cardModal);
});

avatarModalBtn.addEventListener("click", () => {
  resetValidation(avatarFormElement, settings)
  openModal(avatarModal);
});

cancelModalBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.modal');
  button.addEventListener('click', () => closeModal(popup));
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardFormElement.addEventListener("submit", handleAddCardSubmit);
avatarFormElement.addEventListener("submit", handleAvatarSubmit);
deleteFormElement.addEventListener("submit", handleDeleteSubmit);

enableValidation(settings);