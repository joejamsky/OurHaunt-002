import { OpenAI } from "openai";

const handler = async function(event, context) {
  try {
    // Parse the request body from JSON
    const requestBody = JSON.parse(event.body);
    
    // Get the message from the request body
    let input = requestBody.message;

    if (!input) {
      // If no message was provided, use a default message
      input = "Name three states??"
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: input }],
        model: "gpt-3.5-turbo",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ response: chatCompletion }),
      // body: JSON.stringify({ response: input }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
