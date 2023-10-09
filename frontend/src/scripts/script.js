

// frontend code
fetch('../netlify/functions/fetch-data')
  .then(response => {
    if (!response.ok) {
      // The response status was not in the 200-299 range
      return Promise.reject('Failed to fetch');
    }
    // return response.json();
    return response;
  })
  .then(data => {
    console.log('Netlify data')
    console.log(data);  // log the data returned from your Netlify Function
  })
  .catch(error => {
    console.error('Netlify Error:', error);
  });
