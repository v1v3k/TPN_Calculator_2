import { useEffect, useState } from "react";
import { Button } from "./Button";
import { type ChatGPTMessage, ChatLine, LoadingChatLine } from "./ChatLine";
import { useCookies } from "react-cookie";
import styles from './index.module.css';;

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
      "Hi! I am a Pediatric Test Bot, which is learning to calculate TPN, Please fill the form and I will try my best to explain how I calcluate TPN",
  },
];



const InputForm = ({ states, input, setInput, sendMessage }: any) => {

  return (
    <div className={styles.center}>

      <div className={styles.row}>
        <div className={styles.input}>
          <span className={styles.inputLabel} >BW: Kg </span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.BW[0]}
            onChange={(e) => {
              states.BW[1](e.target.value);
            }}
          />
        </div>

        <div className={styles.input}>
          <span className={styles.inputLabel} >TF: cc/kg/day </span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.TF[0]}

            onChange={(e) => {
              states.TF[1](e.target.value);
            }}
          />
        </div>

      </div>

      <div className={styles.row}>

        <div className={styles.input}>
          <span className={styles.inputLabel} >D10 (2.2.300)</span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.D10[0]}

            onChange={(e) => {
              states.D10[1](e.target.value);
            }}
          />
        </div>


        <div className={styles.input}>
          <span className={styles.inputLabel} >AA: g/kg/day</span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.AA[0]}

            onChange={(e) => {
              states.AA[1](e.target.value);
            }}
          />
        </div>

        <div className={styles.input}>
          <span className={styles.inputLabel} >IL: g/kg/day </span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.IL[0]}

            onChange={(e) => {
              states.IL[1](e.target.value);
            }}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.input}>
          <span className={styles.inputLabel} >Zn: mcg/kg/day</span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.ZN[0]}

            onChange={(e) => {
              states.ZN[1](e.target.value);
            }}
          />
        </div>

        <div className={styles.input}>
          <span className={styles.inputLabel} >Cu: mcg/kg/day </span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.CU[0]}

            onChange={(e) => {
              states.CU[1](e.target.value);
            }}
          />
        </div>

        <div className={styles.input}>
          <span className={styles.inputLabel} >Mn: mcg/kg/day </span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.MN[0]}

            onChange={(e) => {
              states.MN[1](e.target.value);
            }}
          />
        </div>
      </div>

      <div className={styles.row}>
        <Button
          type="submit"
          className="ml-4 flex-none"
          onClick={() => {
            const tpnState = {
              BW: states.BW[0],
              TF: states.TF[0],
              D10: states.D10[0],
              AA: states.AA[0],
              IL: states.IL[0],
              ZN: states.ZN[0],
              CU: states.CU[0],
              MN: states.MN[0],
            }
            const tpnStateStringified = JSON.stringify(tpnState);
            console.log(tpnStateStringified);
            sendMessage(tpnStateStringified);
            // states.BW[1]("");
            // states.TF[1]("");
            // states.D10[1]("");
            // states.AA[1]("");
            // states.IL[1]("");
            // states.ZN[1]("");
            // states.CU[1]("");
            // states.MN[1]("");
          }}
        >
          Calculate
        </Button>
      </div>
    </div>
  );
}

export function Chat() {
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [BW, setBW] = useState("");
  const [TF, setTF] = useState("");
  const [D10, setD10] = useState("");
  const [AA, setAA] = useState("");
  const [IL, setIL] = useState("");
  const [ZN, setZN] = useState("");
  const [CU, setCU] = useState("");
  const [MN, setMN] = useState("");

  const states = {
    BW: [BW, setBW],
    TF: [TF, setTF],
    D10: [D10, setD10],
    AA: [AA, setAA],
    IL: [IL, setIL],
    ZN: [ZN, setZN],
    CU: [CU, setCU],
    MN: [MN, setMN]
  }



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
        Hi! I am a Pediatric Test Bot, which is learning to calculate TPN, Please fill the form and I will try my best to explain how I calcluate TPN
      </div>

      <div className="rounded-2xl border-zinc-100  lg:border lg:p-6">
        <InputForm
          states={states}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />

        {messages.map(({ content, role }, index) => (
          <ChatLine key={index} role={role} content={content} />
        ))}

        {loading && <LoadingChatLine />}



      </div>
    </div>
  );
}




export default async function getContent(newMessages: any) {

  try {
    // const { content, sender }: Message  = req.body;
    // For this example, let's simulate an asynchronous operation
    const apiKey = "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"; // Replace with your OpenAI API key
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
          Authorization: `Bearer ${apiKey}`,
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
