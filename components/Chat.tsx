import { useEffect, useState } from "react";
import { Button } from "./Button";
import { type ChatGPTMessage, ChatLine, LoadingChatLine } from "./ChatLine";
import { useCookies } from "react-cookie";
import styles from './index.module.css';;

const COOKIE_NAME = "nextjs-example-ai-chat-gpt3";


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
    debugger;
    const newMessages = [
      { role: "user", content: message } as ChatGPTMessage,
    ];
    setMessages([]);
    const last10messages = newMessages.slice(-10); // remember last 10 messages

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: last10messages,
        user: cookie[COOKIE_NAME],
      }),
    });

    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    let lastMessage = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      let chunkValue = decoder.decode(value);
      chunkValue = chunkValue.substring(1, chunkValue.length - 1);
      lastMessage = lastMessage + chunkValue;
      setMessages([
        { role: "assistant", content: lastMessage } as ChatGPTMessage,
      ]);

      setLoading(false);
    }
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
