import { useEffect, useState } from "react";
// import { Button } from "./Button";
import { type ChatGPTMessage, ChatLine, LoadingChatLine } from "./ChatLine";
import { useCookies } from "react-cookie";
import styles from './index.module.css';;
import { BottomSheet } from 'react-spring-bottom-sheet'
import Button from '@mui/material/Button';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
// if setting up the CSS is tricky, you can add this to your page somewhere:
// <link rel="stylesheet" href="https://unpkg.com/react-spring-bottom-sheet/dist/style.css" crossorigin="anonymous">
import 'react-spring-bottom-sheet/dist/style.css'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const COOKIE_NAME = "nextjs-example-ai-chat-gpt3";

type Message = {
  content: string;
  sender: string;
};

// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: ChatGPTMessage[] = [
  {
    role: "assistant",
    content:
      " ",
  },
];



const InputForm = ({ states, input, setInput, sendMessage }: any) => {

  states.GIR[1]((states.dextroseUsed[0] * states.IVFluidRate[0]) / (states.weight[0] * 6))
  /*
     const states = {
    dextroseUsed: [dextroseUsed, setDextroseUsed],
    IVFluidRate: [IVFluidRate, setIVFluidRate],
    weight: [weight, setWeight],
    GIR: [GIR, setGIR],
  };
  */

  const [open, setOpen] = useState(false)

  return (
    <div className={styles.center}>
      
      <BottomSheet open={open} onDismiss={() => setOpen(false)}>
        Bottom Sheet
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

      </BottomSheet>
      <div className={styles.row}>
        <div className={styles.inputRequired}>
          <span className={styles.inputLabel} > Dextrose used  </span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.dextroseUsed[0]}
            onChange={(e) => {
              states.dextroseUsed[1](e.target.value);
            }}
          />
        </div>

        <div className={styles.inputRequired}>
          <span className={styles.inputLabel} >IV fluid rate </span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.IVFluidRate[0]}

            onChange={(e) => {
              states.IVFluidRate[1](e.target.value);
            }}
          />
        </div>

        <div className={styles.inputRequired}>
          <span className={styles.inputLabel} >Weight (kg)</span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.weight[0]}

            onChange={(e) => {
              states.weight[1](e.target.value);
            }}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.input}>
          <span className={styles.inputLabel} >GIR: <QuestionAnswerIcon onClick={() => setOpen(true)}/></span>
          
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.GIR[0]}

          />
        </div>
      </div>
    </div>
  );
}

export function GIRCalc() {
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [dextroseUsed, setDextroseUsed] = useState(0);
  const [IVFluidRate, setIVFluidRate] = useState(0);
  const [weight, setWeight] = useState(0);
  const [GIR, setGIR] = useState(0);

  const states = {
    dextroseUsed: [dextroseUsed, setDextroseUsed],
    IVFluidRate: [IVFluidRate, setIVFluidRate],
    weight: [weight, setWeight],
    GIR: [GIR, setGIR],
  };

  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  // send message to API /api/chat endpoint
  const sendMessage = async (message: string) => {
    setLoading(true);
    const newMessages = [
      { role: "user", content: message } as ChatGPTMessage,
    ];
    setMessages([]);

    getContent(newMessages).then(result => {
      debugger;
      console.log(result); // Handle the result of the asynchronous task
      setMessages([
        { role: "assistant", content: result } as ChatGPTMessage,
      ]);
      setLoading(false);
    });;




    // const reader = data.getReader();
    // const decoder = new TextDecoder();
    // let done = false;

    // let lastMessage = "";

    // while (!done) {
    //   const { value, done: doneReading } = await reader.read();
    //   done = doneReading;
    //   let chunkValue = decoder.decode(value);
    //   chunkValue = chunkValue.substring(1, chunkValue.length - 1);
    //   lastMessage = lastMessage + chunkValue;
    //   setMessages([
    //     { role: "assistant", content: lastMessage } as ChatGPTMessage,
    //   ]);

    //   setLoading(false);
    // }
  };

  return (
    <div>

      <div className={styles.subHeader}>
        {/* Hi! I am a Pediatric Test Bot, which is learning to calculate TPN, Please fill the form and I will try my best to explain how I calcluate TPN */}
      </div>

      <div className="rounded-2xl border-zinc-100  lg:border lg:p-6">
        <InputForm
          states={states}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />

        {/* {messages.map(({ content, role }, index) => (
          <ChatLine key={index} role={role} content={content} />
        ))}

        {loading && <LoadingChatLine />} */}



      </div>
    </div>
  );
}




export default async function getContent(newMessages: any) {

  try {
    // const { content, sender }: Message  = req.body;
    // For this example, let's simulate an asynchronous operation

    const apiKey = ""; // Replace with your OpenAI API key
    const url = "https://api.openai.com/v1/chat/completions";


    let API_messages = [
      {
        role: "system",
        content:
          "You are a Pediatric ER AI assistant who can answer questions about TPN calculation.\
             Use Formaat like this -- Thank you for providing me with the necessary information. Based on the inputs you've provided, here's how I calculate Total Parenteral Nutrition (TPN): First, I calculate the patient's caloric needs using the following equation: Caloric needs = (25 x BW) + (TF x 10) Where BW is the patient's body weight in kilograms, and TF is the patient's temperature in degrees Celsius. Using the inputs provided, the patient's caloric needs are: Caloric needs = (25 x 2.5) + (100 x 10) = 625 + 1000 = 1625 calories/day Next, I calculate the patient's protein needs using the following equation: Protein needs = AA x BW Where AA is the patient's desired daily protein intake in grams per kilogram of body weight. Using the inputs provided, the patient's protein needs are: Protein needs = 2 x 2.5 = 5 g/kg/day Next, I calculate the patient's fluid needs using the following equation: Fluid needs = 100 x IL Where IL is the patient's ideal body weight in kilograms. Using the inputs provided, the patient's fluid needs are: Fluid needs = 100 x 3 = 300 ml/kg/day Finally, I calculate the patient's micronutrient needs using the following equations: Zinc needs = ZN x BW / 3.4 Copper needs = CU x BW / 0.5 Manganese needs = MN x BW / 4 Where ZN, CU, and MN are the patient's desired daily intake in micrograms per kilogram of body weight. Using the inputs provided, the patient's micronutrient needs are: Zinc needs = 400 x 2.5 / 3.4 = 294.12 micrograms per day Copper needs = 20 x 2.5 / 0.5 = 100 micrograms per day Manganese needs = 1 x 2.5 / 4 = 0.625 milligrams per day These are the basic calculations that go into calculating TPN. However, it is important to note that TPN is typically customized to each individual patient based on their specific medical needs and nutritional requirements. It is always important to consult with a qualified healthcare professional before starting TPN.\
            You should talk about TPN calculation only",
      },
    ];

    for (let i = 0; i < newMessages.length; i++) {
      const message = {
        role: newMessages[i].role,
        content: newMessages[i].content,
      };
      API_messages.push(message);
    }
    let result;
    try {
      result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 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",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: API_messages,
        }),
      });
    } catch (error: any) {
      console.error('Error:', error.message);
      // Handle the error or throw it to be caught elsewhere
      throw error;
    }

    console.log(result);

    const data = await result.json();

    console.log(result);

    console.log(data.choices[0].message.content);

    return (data.choices[0].message.content);
  } catch (error) {

    console.log(error);
  }

}


/*
calculate TPN for BW 2 kg
TF 100 cc/kg/day
NPO

D10 (2.2.300)
AA 2 g/kg/day
IL 3 g/kg/day.

Zn = 400 mcg/kg/day
Cu = 20 mcg/kg/day
Mn = 1 mcg/kg/day
*/
