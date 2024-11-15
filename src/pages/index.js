import "../pages/index.css";
import { enableValidation, resetValidation, settings } from "../scripts/validation.js";
import Api from "../utils/api.js";
import { setButtonText } from "../utils/helper.js";



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


const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list")
let selectedCard, selectedCardId;


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

// Delete Elements
const deleteModal = document.querySelector("#delete-modal");
const deleteFormElement = document.forms["delete-form"];


// Functions
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener('keydown', handleEscKey);
  modal.addEventListener('mousedown', handleOverlayClick);
  resetValidation(modal, settings);
};

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener('keydown', handleEscKey);
  modal.removeEventListener('mousedown', handleOverlayClick);
  resetValidation(modal, settings);
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

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  api.editUserInfo({ name: editModalNameInput.value, about: editModalDescriptionInput.value})
  .then((userInfo) => {
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
  })
  .then(() => closeModal(editModal))
  .then(() => resetValidation(editFormElement, settings))
  .catch(console.error)
  .finally(() => {
    setButtonText(submitBtn, false);
  });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  api.addNewCard({name: cardNameInput.value, link: cardLinkInput.value})
  .then(renderCard)
  .then(() => closeModal(cardModal))
  .then(() => resetValidation(cardFormElement, settings))
  .catch(console.error)
  .finally(() => {
    setButtonText(submitBtn, false);
  });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  api.editUserAvatar({ avatar: avatarLinkInput.value })
  .then((userPic) => {
    avatarLinkInput.src = userPic.avatar;
    closeModal(avatarModal);
  })
  .finally(() => {
    setButtonText(submitBtn, false);
  });
}

function handleDeleteSubmit (evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Delete", "Deleting...");
  api.deleteCard(selectedCardId)
  .then(() => {
    selectedCard.remove();
    closeModal(deleteModal);
  })
  .finally(() => {
    setButtonText(submitBtn, false, "Delete", "Deleting...");
  });
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
  editModalNameInput.value = "";
  editModalDescriptionInput.value = "";
  resetValidation(editFormElement, settings)
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

closeButtons.forEach((button) => {
  const popup = button.closest('.modal');
  button.addEventListener('click', () => closeModal(popup));
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardFormElement.addEventListener("submit", handleAddCardSubmit);
avatarFormElement.addEventListener("submit", handleAvatarSubmit);
deleteFormElement.addEventListener("submit", handleDeleteSubmit);

enableValidation(settings);


// //Cards JS
// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
//     },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
//   },
// ];
