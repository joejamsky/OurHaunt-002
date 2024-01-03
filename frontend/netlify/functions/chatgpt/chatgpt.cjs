const OpenAI = require("openai");

const handler = async function(event, context) {
  try {
    // Parse the request body from JSON
    const requestBody = event.body ? JSON.parse(event.body) : {};
    
    // Split message from front end into input and system context
    let input = requestBody.message;  //This is the message from the user.
    let systemContext = requestBody.systemContext //This is the backstory and context to setup the AI.

    console.log('requestBody', requestBody)

    //Debug parameters
    if (!input) {
      // If no message was provided, use a default message to debug
      input = "This is a debug message. If it has reached chatGPT please respond 'Error: You're input message is empty. From chatgpt'."
    }
    if (!systemContext) {
      // If no context was provided, use a default context to debug
      systemContext = "Respond as if you are cookie monster."
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    const chatCompletion = await openai.chat.completions.create({
        messages: [
          {role: "system", content: systemContext },
          {role: "user", content: input}
        ],
        model: "gpt-3.5-turbo",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ response: chatCompletion }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
