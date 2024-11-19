!function(){"use strict";const e={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__submit-btn",inactiveButtonClass:"modal__submit-btn_inactive",inputErrorClass:"modal__input_type_error",errorClass:"modal__input-error_active"},t=(e,t,r)=>{const n=e.querySelector(`#${t.id}-error`);t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent=""},r=e=>e.some((e=>!e.validity.valid)),n=(e,t,n)=>{console.log(r(e)),r(e)?(t.disabled=!0,t.classList.add(n.inactiveButtonClass)):(t.disabled=!1,t.classList.remove(n.inactiveButtonClass))},o=(e,r)=>{const o=Array.from(e.querySelectorAll(r.inputSelector)),a=e.querySelector(r.submitButtonSelector);o.forEach((n=>{t(e,n,r)})),n(o,a,r),e.reset()},a=e=>{document.querySelectorAll(e.formSelector).forEach((r=>{((e,r)=>{const a=Array.from(e.querySelectorAll(r.inputSelector)),s=e.querySelector(r.submitButtonSelector);n(a,s,r),a.forEach((o=>{o.addEventListener("input",(function(){((e,r,n)=>{r.validity.valid?t(e,r,n):((e,t,r,n)=>{const o=e.querySelector(`#${t.id}-error`);t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)})(e,r,r.validationMessage,n)})(e,o,r),n(a,s,r)}))})),e.addEventListener("reset",(()=>{o(e,r)}))})(r,e)}))};a(e);function s(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Save",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Saving...";t.textContent=e?n:r}function i(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Saving...";t.preventDefault();const n=t.submitter,o=n.textContent;s(!0,n,o,r),e().then((()=>{t.target.reset()})).catch(console.error).finally((()=>{s(!1,n,o)}))}const c=document.querySelectorAll(".modal__close-btn"),l=document.querySelector(".profile__avatar-btn"),d=document.querySelector("#avatar-modal"),u=document.forms["avatar-form"],m=d.querySelector("#profile-avatar-input"),_=document.querySelector(".profile__edit-btn"),h=document.querySelector(".profile__name"),v=document.querySelector(".profile__description"),f=document.querySelector(".profile__avatar"),S=document.querySelector("#edit-modal"),p=document.forms["profile-form"],y=S.querySelector("#profile-name-input"),b=S.querySelector("#profile-description-input"),q=document.querySelector("#preview-modal"),L=q.querySelector(".modal__image"),g=q.querySelector(".modal__caption"),E=document.querySelector("#add-card-modal"),k=document.querySelector(".profile__add-btn"),C=document.forms["add-card-form"],U=E.querySelector("#add-card-name-input"),x=E.querySelector("#add-card-link-input"),A=document.querySelector("#card-template"),$=document.querySelector(".cards__list");let w,I;const T=document.querySelector("#delete-modal"),B=document.forms["delete-form"],N=document.querySelector(".modal__cancel-btn"),P=new class{constructor(e){let{baseUrl:t,headers:r}=e;this._baseUrl=t,this._headers=r}getAppInfo(){return Promise.all([this.getInitialCards(),this.getUserInfo()])}getInitialCards(){return this._request(`${this._baseUrl}/cards`,{headers:this._headers})}addNewCard(e){let{name:t,link:r}=e;return this._request(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:r})})}getUserInfo(){return this._request(`${this._baseUrl}/users/me`,{headers:this._headers})}editUserAvatar(e){let{avatar:t}=e;return this._request(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:t})})}editUserInfo(e){let{name:t,about:r}=e;return this._request(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:r})})}deleteCard(e){return this._request(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers})}toggleLike(e,t){const r=t?"DELETE":"PUT";return this._request(`${this._baseUrl}/cards/${e}/likes`,{method:r,headers:this._headers})}_checkResponse(e){if(e.ok)return e.json();Promise.reject(`Error: ${e.status}`)}_request(e,t){return fetch(e,t).then(this._checkResponse)}}({baseUrl:"https://around-api.en.tripleten-services.com/v1",headers:{authorization:"1aeb74b8-8c69-4315-8442-0245d829c747","Content-Type":"application/json"}});function D(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"prepend";const r=function(e){console.log(e);const t=A.content.querySelector(".card").cloneNode(!0),r=t.querySelector(".card__title"),n=t.querySelector(".card__image"),o=t.querySelector(".card__like-btn"),a=t.querySelector(".card__delete-btn");return r.textContent=e.name,n.src=e.link,n.alt=e.name,e.isLiked&&o.classList.add("card__like-btn_liked"),o.addEventListener("click",(t=>function(e,t){const r=e.target.classList.contains("card__like-btn_liked");P.toggleLike(t,r).then((t=>{t.isLiked=!r,e.target.classList.toggle("card__like-btn_liked")})).catch(console.error)}(t,e._id))),a.addEventListener("click",(()=>function(e,t){w=e,I=t,O(T)}(t,e._id))),n.addEventListener("click",(()=>{O(q),L.src=e.link,g.textContent=e.name,L.alt=e.name})),t}(e);$[t](r)}function O(e){e.classList.add("modal_opened"),document.addEventListener("keydown",J),e.addEventListener("mousedown",H)}function j(e){e.classList.remove("modal_opened"),document.removeEventListener("keydown",J),e.removeEventListener("mousedown",H)}function J(e){if("Escape"===e.key){const e=document.querySelector(".modal_opened");e&&j(e)}}function H(e){e.target.classList.contains("modal_opened")&&j(e.target)}function R(){return P.editUserInfo({name:y.value,about:b.value}).then((e=>{h.textContent=e.name,v.textContent=e.about})).then((()=>j(S)))}function z(){return P.addNewCard({name:U.value,link:x.value}).then(D).then((()=>j(E)))}function M(){return P.editUserAvatar({avatar:m.value}).then((e=>{f.src=e.avatar,j(d)}))}function F(){return P.deleteCard(I).then((()=>{w.remove(),j(T)}))}P.getAppInfo().then((e=>{let[t,r]=e;t.forEach((e=>{D(e)})),h.textContent=r.name,v.textContent=r.about,f.src=r.avatar})).catch(console.error),_.addEventListener("click",(()=>{y.value=h.textContent,b.value=v.textContent,O(S)})),k.addEventListener("click",(()=>{o(C,e),O(E)})),l.addEventListener("click",(()=>{o(u,e),O(d)})),N.addEventListener("click",(()=>{j(T)})),c.forEach((e=>{const t=e.closest(".modal");e.addEventListener("click",(()=>j(t)))})),p.addEventListener("submit",(function(e){i(R,e,"Saving...")})),C.addEventListener("submit",(function(e){i(z,e,"Saving...")})),u.addEventListener("submit",(function(e){i(M,e,"Saving...")})),B.addEventListener("submit",(function(e){i(F,e,"Deleting...")})),a(e)}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cUosRUFBVXJGLEVBQVksSUFHeEIwQixFQUFlckQsaUJBQWlCLFNBQVMsS0FDdkNzSCxFQUFXbkUsRUFBWSxJQUd6QjFCLEVBQWE5QixTQUFTWSxJQUNwQixNQUFNMkgsRUFBUTNILEVBQU80SCxRQUFRLFVBQzdCNUgsRUFBT1AsaUJBQWlCLFNBQVMsSUFBTXNILEVBQVdZLElBQU8sSUFHM0Q5RixFQUFnQnBDLGlCQUFpQixVQS9FakMsU0FBOEJlLEdBQzVCRixFQUFhNkcsRUFBaUIzRyxFQUFLLFlBQ3JDLElBOEVBNkIsRUFBZ0I1QyxpQkFBaUIsVUF0RWpDLFNBQTZCZSxHQUMzQkYsRUFBYWdILEVBQWlCOUcsRUFBSyxZQUNyQyxJQXFFQWEsRUFBa0I1QixpQkFBaUIsVUEzRG5DLFNBQTRCZSxHQUMxQkYsRUFBYWlILEVBQW1CL0csRUFBSyxZQUN2QyxJQTBEQXFDLEVBQWtCcEQsaUJBQWlCLFVBaERuQyxTQUE0QmUsR0FDMUJGLEVBQWFtSCxFQUFtQmpILEVBQUssY0FDdkMsSUFnREFsQixFQUFpQmxDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3NjcmlwdHMvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3V0aWxzL2hlbHBlci5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3BhZ2VzL2luZGV4LmpzIiwid2VicGFjazovL3NlX3Byb2plY3Rfc3BvdHMvLi9zcmMvdXRpbHMvYXBpLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBzZXR0aW5ncyA9IHtcbiAgZm9ybVNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybVwiLFxuICBpbnB1dFNlbGVjdG9yOiBcIi5tb2RhbF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19zdWJtaXQtYnRuXCIsXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX3N1Ym1pdC1idG5faW5hY3RpdmVcIixcbiAgaW5wdXRFcnJvckNsYXNzOiBcIm1vZGFsX19pbnB1dF90eXBlX2Vycm9yXCIsXG4gIGVycm9yQ2xhc3M6IFwibW9kYWxfX2lucHV0LWVycm9yX2FjdGl2ZVwiXG59XG5cbmV4cG9ydCBjb25zdCBzaG93SW5wdXRFcnJvciA9IChmb3JtRWwsIGlucHV0RWwsIGVycm9yTXNnLCBjb25maWcpID0+IHtcbiAgY29uc3QgZXJyb3JNc2dFbCA9IGZvcm1FbC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsLmlkfS1lcnJvcmApO1xuICBpbnB1dEVsLmNsYXNzTGlzdC5hZGQoY29uZmlnLmlucHV0RXJyb3JDbGFzcyk7XG4gIGVycm9yTXNnRWwudGV4dENvbnRlbnQgPSBlcnJvck1zZztcbiAgZXJyb3JNc2dFbC5jbGFzc0xpc3QuYWRkKGNvbmZpZy5lcnJvckNsYXNzKTtcbn07XG5cbmV4cG9ydCBjb25zdCBoaWRlSW5wdXRFcnJvciA9IChmb3JtRWwsIGlucHV0RWwsIGNvbmZpZykgPT4ge1xuICBjb25zdCBlcnJvck1zZ0VsID0gZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0RWwuaWR9LWVycm9yYCk7XG4gIGlucHV0RWwuY2xhc3NMaXN0LnJlbW92ZShjb25maWcuaW5wdXRFcnJvckNsYXNzKTtcbiAgZXJyb3JNc2dFbC5jbGFzc0xpc3QucmVtb3ZlKGNvbmZpZy5lcnJvckNsYXNzKTtcbiAgZXJyb3JNc2dFbC50ZXh0Q29udGVudCA9IFwiXCI7XG59O1xuXG5leHBvcnQgY29uc3QgY2hlY2tJbnB1dFZhbGlkaXR5ID0gKGZvcm1FbCwgaW5wdXRFbCwgY29uZmlnKSA9PiB7XG4gIGlmICghaW5wdXRFbC52YWxpZGl0eS52YWxpZCkge1xuICAgIHNob3dJbnB1dEVycm9yKGZvcm1FbCwgaW5wdXRFbCwgaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZSwgY29uZmlnKTtcbiAgfSBlbHNlIHtcbiAgICBoaWRlSW5wdXRFcnJvcihmb3JtRWwsIGlucHV0RWwsIGNvbmZpZyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBoYXNJbnZhbGlkSW5wdXQgPSAoaW5wdXRMaXN0KSA9PiB7XG4gIHJldHVybiBpbnB1dExpc3Quc29tZSgoaW5wdXRFbCkgPT4ge1xuICAgIHJldHVybiAhaW5wdXRFbC52YWxpZGl0eS52YWxpZDtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlQnV0dG9uU3RhdGUgPSAoaW5wdXRMaXN0LCBidXR0b25FbCwgY29uZmlnKSA9PiB7XG4gIGNvbnNvbGUubG9nKGhhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpKTtcbiAgaWYgKGhhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpKSB7XG4gICAgYnV0dG9uRWwuZGlzYWJsZWQgPSB0cnVlO1xuICAgIGJ1dHRvbkVsLmNsYXNzTGlzdC5hZGQoY29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xuICB9IGVsc2Uge1xuICAgIGJ1dHRvbkVsLmRpc2FibGVkID0gZmFsc2U7XG4gICAgYnV0dG9uRWwuY2xhc3NMaXN0LnJlbW92ZShjb25maWcuaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCByZXNldFZhbGlkYXRpb24gPSAoZm9ybUVsLCBjb25maWcpID0+IHtcbiAgY29uc3QgaW5wdXRMaXN0ID0gQXJyYXkuZnJvbShmb3JtRWwucXVlcnlTZWxlY3RvckFsbChjb25maWcuaW5wdXRTZWxlY3RvcikpO1xuICBjb25zdCBidXR0b25FbCA9IGZvcm1FbC5xdWVyeVNlbGVjdG9yKGNvbmZpZy5zdWJtaXRCdXR0b25TZWxlY3Rvcik7XG4gIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgaGlkZUlucHV0RXJyb3IoZm9ybUVsLCBpbnB1dEVsLCBjb25maWcpO1xuICB9KTtcbiAgdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbCwgY29uZmlnKTtcbiAgZm9ybUVsLnJlc2V0KCk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0RXZlbnRMaXN0ZW5lcnMgPSAoZm9ybUVsLCBjb25maWcpID0+IHtcbiAgY29uc3QgaW5wdXRMaXN0ID0gQXJyYXkuZnJvbShmb3JtRWwucXVlcnlTZWxlY3RvckFsbChjb25maWcuaW5wdXRTZWxlY3RvcikpO1xuICBjb25zdCBidXR0b25FbCA9IGZvcm1FbC5xdWVyeVNlbGVjdG9yKGNvbmZpZy5zdWJtaXRCdXR0b25TZWxlY3Rvcik7XG5cbiAgdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbCwgY29uZmlnKTtcblxuICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoZWNrSW5wdXRWYWxpZGl0eShmb3JtRWwsIGlucHV0RWwsIGNvbmZpZyk7XG4gICAgICB0b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsLCBjb25maWcpO1xuICAgIH0pO1xuICB9KTtcblxuICBmb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2V0XCIsICgpID0+IHtcbiAgICByZXNldFZhbGlkYXRpb24oZm9ybUVsLCBjb25maWcpO1xuICB9KTtcbn07XG5cblxuZXhwb3J0IGNvbnN0IGVuYWJsZVZhbGlkYXRpb24gPSAoY29uZmlnKSA9PiB7XG4gIGNvbnN0IGZvcm1MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25maWcuZm9ybVNlbGVjdG9yKTtcbiAgZm9ybUxpc3QuZm9yRWFjaCgoZm9ybUVsKSA9PiB7XG4gICAgICBzZXRFdmVudExpc3RlbmVycyhmb3JtRWwsIGNvbmZpZyk7XG4gICAgfSk7XG4gIH07XG5cbmVuYWJsZVZhbGlkYXRpb24oc2V0dGluZ3MpOyIsImV4cG9ydCBmdW5jdGlvbiByZW5kZXJMb2FkaW5nKGlzTG9hZGluZywgYnV0dG9uLCBidXR0b25UZXh0PSdTYXZlJywgbG9hZGluZ1RleHQ9J1NhdmluZy4uLicpIHtcbiAgaWYgKGlzTG9hZGluZykge1xuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IGxvYWRpbmdUZXh0XG4gIH0gZWxzZSB7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gYnV0dG9uVGV4dFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVTdWJtaXQocmVxdWVzdCwgZXZ0LCBsb2FkaW5nVGV4dCA9ICdTYXZpbmcuLi4nKSB7XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGV2dC5zdWJtaXR0ZXI7XG4gIGNvbnN0IGluaXRpYWxUZXh0ID0gc3VibWl0QnV0dG9uLnRleHRDb250ZW50O1xuICByZW5kZXJMb2FkaW5nKHRydWUsIHN1Ym1pdEJ1dHRvbiwgaW5pdGlhbFRleHQsIGxvYWRpbmdUZXh0KTtcbiAgcmVxdWVzdCgpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgZXZ0LnRhcmdldC5yZXNldCgpO1xuICAgIH0pXG4gICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpXG4gICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgcmVuZGVyTG9hZGluZyhmYWxzZSwgc3VibWl0QnV0dG9uLCBpbml0aWFsVGV4dCk7XG4gICAgfSk7XG59XG5cblxuXG4vLyAvL0NhcmRzIEpTXG4vLyBjb25zdCBpbml0aWFsQ2FyZHMgPSBbXG4vLyAgIHtcbi8vICAgICBuYW1lOiBcIlZhbCBUaG9yZW5zXCIsXG4vLyAgICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL3Nwb3RzLzEtcGhvdG8tYnktbW9yaXR6LWZlbGRtYW5uLWZyb20tcGV4ZWxzLmpwZ1wiXG4vLyAgICAgfSxcbi8vICAge1xuLy8gICAgIG5hbWU6IFwiUmVzdGF1cmFudCB0ZXJyYWNlXCIsXG4vLyAgICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL3Nwb3RzLzItcGhvdG8tYnktY2VpbGluZS1mcm9tLXBleGVscy5qcGdcIlxuLy8gICB9LFxuLy8gICB7XG4vLyAgICAgbmFtZTogXCJBbiBvdXRkb29yIGNhZmVcIixcbi8vICAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvc3BvdHMvMy1waG90by1ieS10dWJhbnVyLWRvZ2FuLWZyb20tcGV4ZWxzLmpwZ1wiXG4vLyAgIH0sXG4vLyAgIHtcbi8vICAgICBuYW1lOiBcIkEgdmVyeSBsb25nIGJyaWRnZSwgb3ZlciB0aGUgZm9yZXN0IGFuZCB0aHJvdWdoIHRoZSB0cmVlc1wiLFxuLy8gICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9zcG90cy80LXBob3RvLWJ5LW1hdXJpY2UtbGFzY2hldC1mcm9tLXBleGVscy5qcGdcIlxuLy8gICB9LFxuLy8gICB7XG4vLyAgICAgbmFtZTogXCJUdW5uZWwgd2l0aCBtb3JuaW5nIGxpZ2h0XCIsXG4vLyAgICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL3Nwb3RzLzUtcGhvdG8tYnktdmFuLWFuaC1uZ3V5ZW4tZnJvbS1wZXhlbHMuanBnXCJcbi8vICAgfSxcbi8vICAge1xuLy8gICAgIG5hbWU6IFwiTW91bnRhaW4gaG91c2VcIixcbi8vICAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvc3BvdHMvNi1waG90by1ieS1tb3JpdHotZmVsZG1hbm4tZnJvbS1wZXhlbHMuanBnXCJcbi8vICAgfSxcbi8vIF07XG4iLCJpbXBvcnQgXCIuLi9wYWdlcy9pbmRleC5jc3NcIjtcbmltcG9ydCB7IGVuYWJsZVZhbGlkYXRpb24sIHJlc2V0VmFsaWRhdGlvbiwgc2V0dGluZ3MgfSBmcm9tIFwiLi4vc2NyaXB0cy92YWxpZGF0aW9uLmpzXCI7XG5pbXBvcnQgQXBpIGZyb20gXCIuLi91dGlscy9hcGkuanNcIjtcbmltcG9ydCB7IGhhbmRsZVN1Ym1pdCB9IGZyb20gXCIuLi91dGlscy9oZWxwZXIuanNcIjtcblxuXG4vLyBET00gRWxlbWVudHNcbi8vVW5pdmVyc2FsIGVsZW1lbnRzXG5jb25zdCBjbG9zZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWxfX2Nsb3NlLWJ0bicpXG5cbi8vIEVkaXQgUHJvZmlsZSBFbGVtZW50c1xuY29uc3QgYXZhdGFyTW9kYWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2F2YXRhci1idG5cIik7XG5jb25zdCBhdmF0YXJNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXZhdGFyLW1vZGFsXCIpO1xuY29uc3QgYXZhdGFyRm9ybUVsZW1lbnQgPSBkb2N1bWVudC5mb3Jtc1tcImF2YXRhci1mb3JtXCJdO1xuY29uc3QgYXZhdGFyTGlua0lucHV0ID0gYXZhdGFyTW9kYWwucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWF2YXRhci1pbnB1dFwiKTtcbmNvbnN0IHByb2ZpbGVFZGl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19lZGl0LWJ0blwiKTtcbmNvbnN0IHByb2ZpbGVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19uYW1lXCIpO1xuY29uc3QgcHJvZmlsZURlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19kZXNjcmlwdGlvblwiKTtcbmNvbnN0IHByb2ZpbGVJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYXZhdGFyXCIpXG5jb25zdCBlZGl0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtbW9kYWxcIik7XG5jb25zdCBlZGl0Rm9ybUVsZW1lbnQgPSBkb2N1bWVudC5mb3Jtc1tcInByb2ZpbGUtZm9ybVwiXTtcbmNvbnN0IGVkaXRNb2RhbE5hbWVJbnB1dCA9IGVkaXRNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtbmFtZS1pbnB1dFwiKTtcbmNvbnN0IGVkaXRNb2RhbERlc2NyaXB0aW9uSW5wdXQgPSBlZGl0TW9kYWwucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWRlc2NyaXB0aW9uLWlucHV0XCIpO1xuXG4vLyBQcmV2aWV3IEVsZW1lbnRzXG5jb25zdCBwcmV2aWV3TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByZXZpZXctbW9kYWxcIik7XG5jb25zdCBwcmV2aWV3TW9kYWxJbWFnZUVsID0gcHJldmlld01vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2ltYWdlXCIpO1xuY29uc3QgcHJldmlld01vZGFsQ2FwdGlvbkVsID0gcHJldmlld01vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2NhcHRpb25cIik7XG5cbi8vIENhcmQtcmVsYXRlZCBFbGVtZW50c1xuY29uc3QgY2FyZE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtY2FyZC1tb2RhbFwiKTtcbmNvbnN0IGNhcmRNb2RhbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYWRkLWJ0blwiKTtcbmNvbnN0IGNhcmRGb3JtRWxlbWVudCA9IGRvY3VtZW50LmZvcm1zW1wiYWRkLWNhcmQtZm9ybVwiXTtcbmNvbnN0IGNhcmROYW1lSW5wdXQgPSBjYXJkTW9kYWwucXVlcnlTZWxlY3RvcihcIiNhZGQtY2FyZC1uYW1lLWlucHV0XCIpO1xuY29uc3QgY2FyZExpbmtJbnB1dCA9IGNhcmRNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1jYXJkLWxpbmstaW5wdXRcIik7XG5jb25zdCBjYXJkVGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtdGVtcGxhdGVcIik7XG5jb25zdCBjYXJkc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRzX19saXN0XCIpXG5sZXQgc2VsZWN0ZWRDYXJkLCBzZWxlY3RlZENhcmRJZDtcblxuLy8gRGVsZXRlIEVsZW1lbnRzXG5jb25zdCBkZWxldGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVsZXRlLW1vZGFsXCIpO1xuY29uc3QgZGVsZXRlRm9ybUVsZW1lbnQgPSBkb2N1bWVudC5mb3Jtc1tcImRlbGV0ZS1mb3JtXCJdO1xuY29uc3QgY2FuY2VsTW9kYWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19jYW5jZWwtYnRuXCIpXG5cblxuY29uc3QgYXBpID0gbmV3IEFwaSh7XG4gIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcm91bmQtYXBpLmVuLnRyaXBsZXRlbi1zZXJ2aWNlcy5jb20vdjFcIixcbiAgaGVhZGVyczoge1xuICAgIGF1dGhvcml6YXRpb246IFwiMWFlYjc0YjgtOGM2OS00MzE1LTg0NDItMDI0NWQ4MjljNzQ3XCIsXG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgfVxufSk7XG5cblxuYXBpLmdldEFwcEluZm8oKVxuICAudGhlbigoW2NhcmRzLCB1c2VySW5mb10pID0+IHtcbiAgICBjYXJkcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICByZW5kZXJDYXJkKGl0ZW0pO1xuICAgIH0pO1xuICAgICAgcHJvZmlsZU5hbWUudGV4dENvbnRlbnQgPSB1c2VySW5mby5uYW1lO1xuICAgICAgcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdXNlckluZm8uYWJvdXQ7XG4gICAgICBwcm9maWxlSW1hZ2Uuc3JjID0gdXNlckluZm8uYXZhdGFyO1xuICAgIH0pXG4gICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuXG5mdW5jdGlvbiBnZXRDYXJkRWxlbWVudChkYXRhKSB7XG4gIGNvbnNvbGUubG9nKGRhdGEpXG5cbiAgY29uc3QgY2FyZEVsZW1lbnQgPSBjYXJkVGVtcGxhdGUuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIikuY2xvbmVOb2RlKHRydWUpO1xuICBjb25zdCBjYXJkTmFtZUVsID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKTtcbiAgY29uc3QgY2FyZEltYWdlRWwgPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2ltYWdlXCIpO1xuICBjb25zdCBjYXJkTGlrZUJ0biA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idG5cIik7XG4gIGNvbnN0IGNhcmREZWxldGVCdG4gPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idG5cIik7XG5cbiAgY2FyZE5hbWVFbC50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcbiAgY2FyZEltYWdlRWwuc3JjID0gZGF0YS5saW5rO1xuICBjYXJkSW1hZ2VFbC5hbHQgPSBkYXRhLm5hbWU7XG5cbiAgaWYgKGRhdGEuaXNMaWtlZCkge1xuICAgIGNhcmRMaWtlQnRuLmNsYXNzTGlzdC5hZGQoXCJjYXJkX19saWtlLWJ0bl9saWtlZFwiKTtcbiAgfVxuXG4gIGNhcmRMaWtlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZ0KSA9PiBoYW5kbGVMaWtlQ2FyZChldnQsIGRhdGEuX2lkKSk7XG4gIGNhcmREZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhhbmRsZURlbGV0ZUNhcmQoY2FyZEVsZW1lbnQsIGRhdGEuX2lkKSk7XG5cbiAgY2FyZEltYWdlRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBvcGVuTW9kYWwocHJldmlld01vZGFsKTtcbiAgICBwcmV2aWV3TW9kYWxJbWFnZUVsLnNyYyA9IGRhdGEubGluaztcbiAgICBwcmV2aWV3TW9kYWxDYXB0aW9uRWwudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gICAgcHJldmlld01vZGFsSW1hZ2VFbC5hbHQgPSBkYXRhLm5hbWU7XG4gIH0pO1xuICByZXR1cm4gY2FyZEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNhcmQoaXRlbSwgbWV0aG9kID0gXCJwcmVwZW5kXCIpIHtcbiAgY29uc3QgY2FyZEVsZW1lbnQgPSBnZXRDYXJkRWxlbWVudChpdGVtKTtcbiAgY2FyZHNMaXN0WyBtZXRob2QgXShjYXJkRWxlbWVudCk7XG59XG5cbi8vIEZ1bmN0aW9uc1xuZnVuY3Rpb24gb3Blbk1vZGFsKG1vZGFsKSB7XG4gIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJtb2RhbF9vcGVuZWRcIik7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVFc2NLZXkpO1xuICBtb2RhbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVPdmVybGF5Q2xpY2spO1xufTtcblxuZnVuY3Rpb24gY2xvc2VNb2RhbChtb2RhbCkge1xuICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWxfb3BlbmVkXCIpO1xuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlRXNjS2V5KTtcbiAgbW9kYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlT3ZlcmxheUNsaWNrKTtcbn07XG5cbmZ1bmN0aW9uIGhhbmRsZUVzY0tleShldnQpIHtcbiAgaWYgKGV2dC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgY29uc3QgYWN0aXZlTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfb3BlbmVkJyk7XG4gICAgaWYgKGFjdGl2ZU1vZGFsKSB7XG4gICAgICBjbG9zZU1vZGFsKGFjdGl2ZU1vZGFsKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlT3ZlcmxheUNsaWNrKGV2dCkge1xuICBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21vZGFsX29wZW5lZCcpKSB7XG4gICAgY2xvc2VNb2RhbChldnQudGFyZ2V0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYWtlRWRpdFJlcXVlc3QoKSB7XG4gIHJldHVybiBhcGkuZWRpdFVzZXJJbmZvKHtcbiAgICBuYW1lOiBlZGl0TW9kYWxOYW1lSW5wdXQudmFsdWUsXG4gICAgYWJvdXQ6IGVkaXRNb2RhbERlc2NyaXB0aW9uSW5wdXQudmFsdWVcbiAgfSkudGhlbigodXNlckluZm8pID0+IHtcbiAgICBwcm9maWxlTmFtZS50ZXh0Q29udGVudCA9IHVzZXJJbmZvLm5hbWU7XG4gICAgcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdXNlckluZm8uYWJvdXQ7XG4gIH0pXG4gIC50aGVuKCgpID0+IGNsb3NlTW9kYWwoZWRpdE1vZGFsKSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUVkaXRGb3JtU3VibWl0KGV2dCkge1xuICBoYW5kbGVTdWJtaXQobWFrZUVkaXRSZXF1ZXN0LCBldnQsICdTYXZpbmcuLi4nKTtcbn1cblxuZnVuY3Rpb24gbWFrZUNhcmRSZXF1ZXN0KCkge1xuICByZXR1cm4gYXBpLmFkZE5ld0NhcmQoe25hbWU6IGNhcmROYW1lSW5wdXQudmFsdWUsIGxpbms6IGNhcmRMaW5rSW5wdXQudmFsdWV9KVxuICAudGhlbihyZW5kZXJDYXJkKVxuICAudGhlbigoKSA9PiBjbG9zZU1vZGFsKGNhcmRNb2RhbCkpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVBZGRDYXJkU3VibWl0KGV2dCkge1xuICBoYW5kbGVTdWJtaXQobWFrZUNhcmRSZXF1ZXN0LCBldnQsICdTYXZpbmcuLi4nKTtcbn1cblxuZnVuY3Rpb24gbWFrZUF2YXRhclJlcXVlc3QoKSB7XG4gIHJldHVybiBhcGkuZWRpdFVzZXJBdmF0YXIoeyBhdmF0YXI6IGF2YXRhckxpbmtJbnB1dC52YWx1ZSB9KVxuICAudGhlbigodXNlclBpYykgPT4ge1xuICAgIHByb2ZpbGVJbWFnZS5zcmMgPSB1c2VyUGljLmF2YXRhcjtcbiAgICBjbG9zZU1vZGFsKGF2YXRhck1vZGFsKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUF2YXRhclN1Ym1pdChldnQpIHtcbiAgaGFuZGxlU3VibWl0KG1ha2VBdmF0YXJSZXF1ZXN0LCBldnQsICdTYXZpbmcuLi4nKTtcbn1cblxuZnVuY3Rpb24gbWFrZURlbGV0ZVJlcXVlc3QoKSB7XG4gIHJldHVybiBhcGkuZGVsZXRlQ2FyZChzZWxlY3RlZENhcmRJZClcbiAgLnRoZW4oKCkgPT4ge1xuICAgIHNlbGVjdGVkQ2FyZC5yZW1vdmUoKTtcbiAgICBjbG9zZU1vZGFsKGRlbGV0ZU1vZGFsKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURlbGV0ZVN1Ym1pdChldnQpIHtcbiAgaGFuZGxlU3VibWl0KG1ha2VEZWxldGVSZXF1ZXN0LCBldnQsICdEZWxldGluZy4uLicpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEZWxldGVDYXJkKGNhcmRFbGVtZW50LCBjYXJkSWQpIHtcbiAgc2VsZWN0ZWRDYXJkID0gY2FyZEVsZW1lbnQ7XG4gIHNlbGVjdGVkQ2FyZElkID0gY2FyZElkO1xuICBvcGVuTW9kYWwoZGVsZXRlTW9kYWwpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVMaWtlQ2FyZChldnQsIGlkKSB7XG4gIGNvbnN0IGlzTGlrZWQgPSBldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNhcmRfX2xpa2UtYnRuX2xpa2VkXCIpXG4gIGFwaS50b2dnbGVMaWtlKGlkLCBpc0xpa2VkKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBkYXRhLmlzTGlrZWQgPSAhaXNMaWtlZDtcbiAgICAgIGV2dC50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2xpa2UtYnRuX2xpa2VkXCIpO1xuICAgIH0pXG4gICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xufVxuXG5wcm9maWxlRWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBlZGl0TW9kYWxOYW1lSW5wdXQudmFsdWUgPSBwcm9maWxlTmFtZS50ZXh0Q29udGVudDtcbiAgZWRpdE1vZGFsRGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IHByb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudDtcbiAgb3Blbk1vZGFsKGVkaXRNb2RhbCk7XG59KTtcblxuY2FyZE1vZGFsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHJlc2V0VmFsaWRhdGlvbihjYXJkRm9ybUVsZW1lbnQsIHNldHRpbmdzKVxuICBvcGVuTW9kYWwoY2FyZE1vZGFsKTtcbn0pO1xuXG5hdmF0YXJNb2RhbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICByZXNldFZhbGlkYXRpb24oYXZhdGFyRm9ybUVsZW1lbnQsIHNldHRpbmdzKVxuICBvcGVuTW9kYWwoYXZhdGFyTW9kYWwpO1xufSk7XG5cbmNhbmNlbE1vZGFsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNsb3NlTW9kYWwoZGVsZXRlTW9kYWwpO1xufSk7XG5cbmNsb3NlQnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgY29uc3QgcG9wdXAgPSBidXR0b24uY2xvc2VzdCgnLm1vZGFsJyk7XG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGNsb3NlTW9kYWwocG9wdXApKTtcbn0pO1xuXG5lZGl0Rm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVFZGl0Rm9ybVN1Ym1pdCk7XG5jYXJkRm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVBZGRDYXJkU3VibWl0KTtcbmF2YXRhckZvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgaGFuZGxlQXZhdGFyU3VibWl0KTtcbmRlbGV0ZUZvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgaGFuZGxlRGVsZXRlU3VibWl0KTtcblxuZW5hYmxlVmFsaWRhdGlvbihzZXR0aW5ncyk7IiwiY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3Ioe2Jhc2VVcmwsIGhlYWRlcnN9KSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgdGhpcy5faGVhZGVycyA9IGhlYWRlcnM7XG4gIH1cblxuICBnZXRBcHBJbmZvKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRJbml0aWFsQ2FyZHMoKSwgdGhpcy5nZXRVc2VySW5mbygpXSk7XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoYCR7dGhpcy5fYmFzZVVybH0vY2FyZHNgLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICB9KTtcbiAgfVxuXG4gIGFkZE5ld0NhcmQoeyBuYW1lLCBsaW5rIH0pIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkc2AsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBsaW5rLFxuICAgICAgfSksXG4gICAgfSk7XG4gIH1cblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZWAsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gIH0pO1xuICB9XG5cbiAgZWRpdFVzZXJBdmF0YXIoeyBhdmF0YXIgfSkge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lL2F2YXRhcmAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgYXZhdGFyXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfVxuXG5cbiAgZWRpdFVzZXJJbmZvKHsgbmFtZSwgYWJvdXQgfSkge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBhYm91dCxcbiAgICAgIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlQ2FyZCAoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkcy8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICB0b2dnbGVMaWtlIChpZCwgaXNMaWtlZCkge1xuICAgIGNvbnN0IG1ldGhvZCA9IGlzTGlrZWQgPyBcIkRFTEVURVwiIDogXCJQVVRcIjtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkcy8ke2lkfS9saWtlc2AsIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KTtcbiAgfVxuXG4gIF9jaGVja1Jlc3BvbnNlKHJlcykge1xuICAgIGlmIChyZXMub2spIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH1cbiAgICBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgfTtcblxuICBfcmVxdWVzdCh1cmwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gZmV0Y2godXJsLCBvcHRpb25zKS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBpOyJdLCJuYW1lcyI6WyJzZXR0aW5ncyIsImZvcm1TZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJpbnB1dEVycm9yQ2xhc3MiLCJlcnJvckNsYXNzIiwiaGlkZUlucHV0RXJyb3IiLCJmb3JtRWwiLCJpbnB1dEVsIiwiY29uZmlnIiwiZXJyb3JNc2dFbCIsInF1ZXJ5U2VsZWN0b3IiLCJpZCIsImNsYXNzTGlzdCIsInJlbW92ZSIsInRleHRDb250ZW50IiwiaGFzSW52YWxpZElucHV0IiwiaW5wdXRMaXN0Iiwic29tZSIsInZhbGlkaXR5IiwidmFsaWQiLCJ0b2dnbGVCdXR0b25TdGF0ZSIsImJ1dHRvbkVsIiwiY29uc29sZSIsImxvZyIsImRpc2FibGVkIiwiYWRkIiwicmVzZXRWYWxpZGF0aW9uIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJyZXNldCIsImVuYWJsZVZhbGlkYXRpb24iLCJkb2N1bWVudCIsInNldEV2ZW50TGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNoZWNrSW5wdXRWYWxpZGl0eSIsInNob3dJbnB1dEVycm9yIiwiZXJyb3JNc2ciLCJ2YWxpZGF0aW9uTWVzc2FnZSIsInJlbmRlckxvYWRpbmciLCJpc0xvYWRpbmciLCJidXR0b24iLCJidXR0b25UZXh0IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwibG9hZGluZ1RleHQiLCJoYW5kbGVTdWJtaXQiLCJyZXF1ZXN0IiwiZXZ0IiwicHJldmVudERlZmF1bHQiLCJzdWJtaXRCdXR0b24iLCJzdWJtaXR0ZXIiLCJpbml0aWFsVGV4dCIsInRoZW4iLCJ0YXJnZXQiLCJjYXRjaCIsImVycm9yIiwiZmluYWxseSIsImNsb3NlQnV0dG9ucyIsImF2YXRhck1vZGFsQnRuIiwiYXZhdGFyTW9kYWwiLCJhdmF0YXJGb3JtRWxlbWVudCIsImZvcm1zIiwiYXZhdGFyTGlua0lucHV0IiwicHJvZmlsZUVkaXRCdXR0b24iLCJwcm9maWxlTmFtZSIsInByb2ZpbGVEZXNjcmlwdGlvbiIsInByb2ZpbGVJbWFnZSIsImVkaXRNb2RhbCIsImVkaXRGb3JtRWxlbWVudCIsImVkaXRNb2RhbE5hbWVJbnB1dCIsImVkaXRNb2RhbERlc2NyaXB0aW9uSW5wdXQiLCJwcmV2aWV3TW9kYWwiLCJwcmV2aWV3TW9kYWxJbWFnZUVsIiwicHJldmlld01vZGFsQ2FwdGlvbkVsIiwiY2FyZE1vZGFsIiwiY2FyZE1vZGFsQnRuIiwiY2FyZEZvcm1FbGVtZW50IiwiY2FyZE5hbWVJbnB1dCIsImNhcmRMaW5rSW5wdXQiLCJjYXJkVGVtcGxhdGUiLCJjYXJkc0xpc3QiLCJzZWxlY3RlZENhcmQiLCJzZWxlY3RlZENhcmRJZCIsImRlbGV0ZU1vZGFsIiwiZGVsZXRlRm9ybUVsZW1lbnQiLCJjYW5jZWxNb2RhbEJ0biIsImFwaSIsImNvbnN0cnVjdG9yIiwiX3JlZiIsImJhc2VVcmwiLCJoZWFkZXJzIiwidGhpcyIsIl9iYXNlVXJsIiwiX2hlYWRlcnMiLCJnZXRBcHBJbmZvIiwiUHJvbWlzZSIsImFsbCIsImdldEluaXRpYWxDYXJkcyIsImdldFVzZXJJbmZvIiwiX3JlcXVlc3QiLCJhZGROZXdDYXJkIiwiX3JlZjIiLCJuYW1lIiwibGluayIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiZWRpdFVzZXJBdmF0YXIiLCJfcmVmMyIsImF2YXRhciIsImVkaXRVc2VySW5mbyIsIl9yZWY0IiwiYWJvdXQiLCJkZWxldGVDYXJkIiwidG9nZ2xlTGlrZSIsImlzTGlrZWQiLCJfY2hlY2tSZXNwb25zZSIsInJlcyIsIm9rIiwianNvbiIsInJlamVjdCIsInN0YXR1cyIsInVybCIsIm9wdGlvbnMiLCJmZXRjaCIsImF1dGhvcml6YXRpb24iLCJyZW5kZXJDYXJkIiwiaXRlbSIsImNhcmRFbGVtZW50IiwiZGF0YSIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJjYXJkTmFtZUVsIiwiY2FyZEltYWdlRWwiLCJjYXJkTGlrZUJ0biIsImNhcmREZWxldGVCdG4iLCJzcmMiLCJhbHQiLCJjb250YWlucyIsInRvZ2dsZSIsImhhbmRsZUxpa2VDYXJkIiwiX2lkIiwiY2FyZElkIiwib3Blbk1vZGFsIiwiaGFuZGxlRGVsZXRlQ2FyZCIsImdldENhcmRFbGVtZW50IiwibW9kYWwiLCJoYW5kbGVFc2NLZXkiLCJoYW5kbGVPdmVybGF5Q2xpY2siLCJjbG9zZU1vZGFsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImtleSIsImFjdGl2ZU1vZGFsIiwibWFrZUVkaXRSZXF1ZXN0IiwidmFsdWUiLCJ1c2VySW5mbyIsIm1ha2VDYXJkUmVxdWVzdCIsIm1ha2VBdmF0YXJSZXF1ZXN0IiwidXNlclBpYyIsIm1ha2VEZWxldGVSZXF1ZXN0IiwiY2FyZHMiLCJwb3B1cCIsImNsb3Nlc3QiXSwic291cmNlUm9vdCI6IiJ9