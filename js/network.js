const loadBookingData = () => {
  return  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) =>  {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
};


const postBookingData = (formData) => {
  return  fetch('https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
};


export {loadBookingData, postBookingData};
