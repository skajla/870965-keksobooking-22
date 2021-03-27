const getFormControls = (form) => {
  return Array.from(form.getElementsByTagName('fieldset'))
    .concat(Array.from(form.getElementsByTagName('select')));
};


const setFormEnabled = (form, disabledFormClass) => {
  form.classList.remove(disabledFormClass);
  let fieldset = getFormControls(form);
  for (let item of fieldset) {
    item.removeAttribute('disabled');
  }
};

const setFormDisabled = (form, disabledFormClass) => {
  form.classList.add(disabledFormClass);
  let fieldset = getFormControls(form);
  for (let item of fieldset) {
    item.setAttribute('disabled', true);
  }
};


export {setFormDisabled, setFormEnabled};
