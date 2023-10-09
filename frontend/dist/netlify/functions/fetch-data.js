// netlify/fetch-data.js
exports.handler = async function(event, context) {
    // const apiKey = process.env.GPT_API_KEY;
  
    // Use your API key to interact with a third-party service
    // const response = await fetch('https://some-api.com/data', {
    //   headers: {
    //     'Authorization': `Bearer ${apiKey}`
    //   }
    // });
    const testVariable = process.env.TEST_VARIABLE
    console.log("test", testVariable)

    // const data = await response.json();
    
    // // Return the data to the frontend
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify(data)
    // };
    return testVariable
};
  