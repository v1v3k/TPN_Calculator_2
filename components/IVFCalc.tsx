import { useEffect, useState } from "react";
import { Button } from "./Button";
import { type ChatGPTMessage, ChatLine, LoadingChatLine } from "./ChatLine";
import { useCookies } from "react-cookie";
import styles from './index.module.css';;
import ComputerIcon from '@mui/icons-material/Computer';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { AIExplainWindow, getContent } from "./AIExplainWindow";

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

const InputForm = ({ states, stateVals, input, setInput }: any) => {

  states.caNaK[1]((states.electrolytes[0]) / (states.TF[0] - (states.totalPO[0] / states.weight[0])) * 250)
  states.netIVFRate[1](((states.TF[0] * states.weight[0]) - states.totalPO[0]) / 24)

  const [canakDisplay, setcanakDisplay] = useState(false);
  const [explaincanakContent, setcanakExplain] = useState("");

  const [ivfDisplay, setivfDisplay] = useState(false);
  const [explainivfContent, setivfExplain] = useState("");

  const onClickCANAAK = () => {
    if (canakDisplay) {
      setcanakDisplay(false)
    } else {
      setcanakDisplay(true)
      setcanakExplain("Loading GPT Answer Composition...");

      let info: any = {
        weight: stateVals.weight[0],
        electrolytes: stateVals.electrolytes[0],
        totalPO: stateVals.totalPO[0],
        TF: stateVals.TF[0],
        "```Answer for Amount of Ca/Na/K to be added is:```": stateVals.caNaK[0]
      }
      let solution: any = { "Amount of Ca/Na/K to be added is:": stateVals.caNaK[0] }
      info = JSON.stringify(info);
      solution = JSON.stringify(solution);

      const prompt = `

      User:
      - Electrolytes = 21
      - TF = 122
      - total PO = 231
      - Weight = 2
      
      ***Solution = 807.6923076923077***
     

      System:
      Step 1: Formula for  Ca/Na/K: = (electrolytes / (TF - (totalPO / weight))) * 250

      Step 2: Values 
      - Electrolytes = 21
      - TF = 122
      - total PO = 231
      - Weight = 2

      Step 3: Substituion and Result
      Ca/Na/K: = (electrolytes / (TF - (totalPO / weight))) * 250
      Ca/Na/K: = (21 / (122 - (231 / 2))) * 250
      Ca/Na/K: =  807.6923076923077

      User:
      - Electrolytes = 3
      - TF = 123
      - total PO = 9
      - Weight = 3.5
     
      ***Solution = 6.227758007117438***

      System:
      Step 1: Formula for  Ca/Na/K: = (electrolytes / (TF - (totalPO / weight))) * 250

      Step 2: Values 
      - Electrolytes = 3
      - TF = 123
      - total PO = 9
      - Weight = 3.5

      Step 3: Substituion and Result
      Ca/Na/K: = (electrolytes / (TF - (totalPO / weight))) * 250
      Ca/Na/K: = (3 / (123 - (9 / 3.5))) * 250
      Ca/Na/K: = 6.227758007117438


      User:
      - Electrolytes = `+ stateVals.electrolytes[0] + `
      - TF = `+ stateVals.TF[0] + `
      - Total PO = `+ stateVals.totalPO[0] + `
      - Weight = `+ stateVals.weight[0] + `

      ***Solution = `+ stateVals.caNaK[0] + `***

      System:
      `;

      console.log(prompt);

      const newMessages = [
        {
          role: "system", content: prompt
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then(result => {
        debugger;
        result = result.replace(/\n/g, '<br>')
        setcanakExplain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  }

  const onClickIVF = () => {
    if (ivfDisplay) {
      setivfDisplay(false)
    } else {
      setivfDisplay(true)
      setivfExplain("Loading GPT Answer Composition...");
      let info: any = {
        weight: stateVals.weight[0],
        electrolytes: stateVals.electrolytes[0],
        totalPO: stateVals.totalPO[0],
        TF: stateVals.TF[0],
        "```Answer for Amount of NET IVF rate to be added is:```": stateVals.netIVFRate[0]
      }
      let solution: any = { "Answer for Amount of NET IVF rate to be added is:": stateVals.netIVFRate[0] }
      info = JSON.stringify(info);
      solution = JSON.stringify(solution);

      const prompt = `
      User:
      - TF = 122
      - total PO = 231
      - Weight = 2

      ***Solution = 0.5416666666666666***
     

      System:
      Step 1: Formula for Solution for NET IVF rate =  ((TF * Weight) - totalPO) / 24    

      Step 2: Values 
      - TF = 122
      - total PO = 231
      - Weight = 2
  

      Step 3: Substituion and Result
      NET IVF rate =  ((TF * Weight) - totalPO) / 24   
      NET IVF rate =  ((122 * 2) - 231) / 24    
      NET IVF rate =  0.5416666666666666   

      User:
      - TF = 2
      - total PO = 12
      - Weight = 3
      - Solution = 0.25

      System:
      Step 1: Formula for Solution for NET IVF rate =  ((TF * Weight) - totalPO) / 24    

      Step 2: Values 
      - TF = 2
      - total PO = 12
      - Weight = 3
 
      Step 3: Substituion and Result
      NET IVF rate =  ((TF * Weight) - totalPO) / 24  
      NET IVF rate =  ((2 * 3) - 12) / 24    
      NET IVF rate =  0.25   

      User:
      - TF = `+ stateVals.TF[0] + `
      - total PO = `+ stateVals.totalPO[0] + `
      - Weight = `+ stateVals.weight[0] + `
      - Solution = `+ stateVals.netIVFRate[0] + `

      System:      
      `;

      const newMessages = [
        {
          role: "system", content: prompt
        } as ChatGPTMessage,

      ];

      getContent(newMessages).then(result => {
        debugger;
        result = result.replace(/\n/g, '<br>')
        setivfExplain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  }

  return (
    <div className={styles.center}>

      <div className={styles.row}>
        <div className={styles.inputRequired}>
          <span className={styles.inputLabel} >Weight (kg) </span>
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

        <div className={styles.inputRequired}>
          <span className={styles.inputLabel} >amount of electrolytes to be added in (meq/kg/day)</span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.electrolytes[0]}

            onChange={(e) => {
              states.electrolytes[1](e.target.value);
            }}
          />
        </div>

        <div className={styles.inputRequired}>
          <span className={styles.inputLabel} >Total PO (cc/day)</span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.totalPO[0]}

            onChange={(e) => {
              states.totalPO[1](e.target.value);
            }}
          />
        </div>


        <div className={styles.inputRequired}>
          <span className={styles.inputLabel} >TF (cc/kg/day)</span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={(states.TF[0])}

            onChange={(e) => {
              states.TF[1](e.target.value);
            }}
          />
        </div>

      </div>

      <div className={styles.row}>

        <div className={styles.input}>
          <span className={styles.inputLabel} >amount of Ca/Na/K to be added is: </span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.caNaK[0]}

            onChange={(e) => {
              states.caNaK[1](e.target.value);
            }}
          />
          <br />
          <Button onClick={onClickCANAAK} >GPT Answer Composition<ComputerIcon /><QuestionAnswerIcon /></Button>
          <br />
          <AIExplainWindow shouldDisplay={canakDisplay} explainContent={explaincanakContent} />

        </div>


      </div>
   
      <div className={styles.row}>
        <div className={styles.input}>
          <span className={styles.inputLabel} >NET IVF rate </span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.netIVFRate[0]}

            onChange={(e) => {
              states.netIVFRate[1](e.target.value);
            }}
          />
          <br />
          <Button onClick={onClickIVF} >GPT Answer Composition<ComputerIcon /><QuestionAnswerIcon /></Button>
          <br />
          <AIExplainWindow shouldDisplay={ivfDisplay} explainContent={explainivfContent} />
        </div>

      </div>
    </div>
  );
}

export function IVFCalc() {
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [weight, setWeight] = useState();
  const [electrolytes, setElectrolytes] = useState();
  const [totalPO, setTotalPO] = useState();
  const [TF, setTF] = useState();
  const [caNaK, setCaNaK] = useState();
  const [netIVFRate, setNetIVFRate] = useState();


  const states = {
    weight: [weight, setWeight],
    electrolytes: [electrolytes, setElectrolytes],
    totalPO: [totalPO, setTotalPO],
    TF: [TF, setTF],
    caNaK: [caNaK, setCaNaK],
    netIVFRate: [netIVFRate, setNetIVFRate],
  };

  const stateVals = {
    weight: [weight,],
    electrolytes: [electrolytes,],
    totalPO: [totalPO,],
    TF: [TF,],
    caNaK: [caNaK,],
    netIVFRate: [netIVFRate,],
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

  return (
    <div>


      <div className={styles.subHeader}>
        To get results please <strong>fill out the orange colored fields</strong>
        <br />
        If results shown as <strong>NaN</strong> required input fields not provided
      </div>

      <div className="rounded-2xl border-zinc-100  lg:border lg:p-6">
        <InputForm
          states={states}
          input={input}
          setInput={setInput}
          stateVals={stateVals}
        />
      </div>
    </div>
  );
}



