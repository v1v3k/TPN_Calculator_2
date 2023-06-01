import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser'

import {Configuration, OpenAIApi} from 'openai-edge';


export type ChatGPTAgent = 'user' | 'system' | 'assistant'

export interface ChatGPTMessage {
  role: ChatGPTAgent
  content: string
}

export interface OpenAIStreamPayload {
  model: string
  messages: ChatGPTMessage[]
  temperature: number
  top_p: number
  frequency_penalty: number
  presence_penalty: number
  max_tokens: number
  stream: boolean
  stop?: string[]
  user?: string
  n: number
}

const openaiApiKey ="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";

const configuration = new Configuration({
  apiKey: openaiApiKey,
});

const openai = new OpenAIApi(configuration);

export async function OpenAIStream(payload: OpenAIStreamPayload) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  let counter = 0

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? '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'}`,
  }

  if (process.env.OPENAI_API_ORG) {
    requestHeaders['OpenAI-Organization'] = process.env.OPENAI_API_ORG
  }

  // Fetch response here

  // const res = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: "You: How do I combine arrays?\nJavaScript chatbot: You can use the concat() method.\nYou: How do you make an alert appear after 10 seconds?\nJavaScript chatbot",
  //   temperature: 0,
  //   max_tokens: 150,
  //   top_p: 1,
  //   frequency_penalty: 0.5,
  //   presence_penalty: 0,
  //   stop: ["You:"],
  // });


  // curl https://api.openai.com/v1/chat/completions \
  // -H "Content-Type: application/json" \
  // -H "Authorization: Bearer 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" \
  // -d '{
  //   "model": "gpt-3.5-turbo",
  //   "messages": [{"role": "user", "content": "Hello!"}]
  // }'


  const apiKey = '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'; // Replace with your OpenAI API key
  const url = 'https://api.openai.com/v1/chat/completions';

  const prompt = 'What is the meaning of life?';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
    }),
  });

  const data = await res.json();

  console.log(data.choices[0].message.content);
  // const res = await fetch('https://api.openai.com/v1/chat/completions', {
  //   headers: requestHeaders,
  //   method: 'POST',
  //   body: JSON.stringify(payload),
  // })

  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === 'event') {
          const data = event.data
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === '[DONE]') {
            console.log('DONE')
            controller.close()
            return
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta?.content || ''
            if (counter < 2 && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return
            }
            const queue = encoder.encode(text)
            controller.enqueue(queue)
            counter++
          } catch (e) {
            // maybe parse error
            controller.error(e)
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse)
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    },
  })

  return stream
}
