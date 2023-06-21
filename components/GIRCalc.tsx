import { useEffect, useState } from "react";
import { Button } from "./Button";
import { type ChatGPTMessage, ChatLine, LoadingChatLine } from "./ChatLine";
import { useCookies } from "react-cookie";
import styles from './index.module.css';;
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import ComputerIcon from '@mui/icons-material/Computer';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import React, { memo } from 'react';
import CancelPresentationTwoToneIcon from '@mui/icons-material/CancelPresentationTwoTone';

import { AIExplainWindow, getContent, AIIcon } from "./AIExplainWindow";

const COOKIE_NAME = "nextjs-nicu-calculator-ai-chat-gpt3";


// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: ChatGPTMessage[] = [
  {
    role: "assistant",
    content:
      " ",
  },
];

const InputForm = ({ states, stateVals, input, setInput, sendMessage }: any) => {

  // Calculations
  states.GIR[1]((states.dextroseUsed[0] * states.IVFluidRate[0]) / (states.weight[0] * 6))

  const [girDisplay, setGirDisplay] = useState(false);
  const [explainContent, setExplain] = useState("");

  const onClickGIR = () => {
    if (girDisplay) {
      setGirDisplay(false)
    } else {
      setGirDisplay(true)
      setExplain("Loading GPT Answer Composition...");
      const prompt = `  
      If any input undefined or character based mention calculation cannot be performed

      User:
      - Dextrose Used = 21
      - IV Fluid Rate  = 2
      - Weight = 23

      ***Solution = 0.30434782608695654***
      
      System:
      Step 1: Formula for GIR = (Dextrose used * IV fluid rate) / (Weight (kg) * 6)

      Step 2: Values 
      - Dextrose Used = 21
      - IV Fluid Rate  = 2
      - Weight = 23

      Step 3: Substituion and Result
      GIR = (Dextrose used * IV fluid rate) / (Weight (kg) * 6)
      GIR = (21 * 2) / (23 * 6)
      GIR = 0.30434782608695654

      User:
      - Dextrose Used = 21
      - IV Fluid Rate  = 2
      - Weight = 23

      ***Solution = 0.30434782608695654***
      
      System:
      Step 1: Formula for GIR = (Dextrose used * IV fluid rate) / (Weight (kg) * 6)

      Step 2: Values 
      - Dextrose Used = 2
      - IV Fluid Rate  = 30
      - Weight = 3.1

      Step 3: Substituion and Result
      GIR = (Dextrose used * IV fluid rate) / (Weight (kg) * 6)
      GIR = (2 * 30) / (3.1 * 6)
      GIR = 3.225806451612903

      User:
      - Dextrose Used = `+ stateVals.dextroseUsed[0] + `
      - IV Fluid Rate  = `+ stateVals.IVFluidRate[0] + `
      - Weight = `+ stateVals.weight[0] + `

      ***Solution =  `+ stateVals.GIR[0] + `***
`;
      const newMessages = [
        {
          role: "system", content: prompt
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then(result => {
        debugger;
        try {
          result = result.replace(/\n/g, '<br>')
        }
        catch (error) {
          console.log(error);
        }
        setExplain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  }

  return (
    <div className={styles.center}>


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

        <div className={girDisplay ? styles.inputSolutionHighlight : ''}>
          <div className={styles.input}>
            <span className={styles.inputLabel} >GIR:  <AIIcon callback={onClickGIR} /></span>

            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.GIR[0]}

            />
            <br />

            <AIExplainWindow shouldDisplay={girDisplay} explainContent={explainContent} />
          </div>
        </div>
      </div>
    </div>
  );
}




export function GIRCalc() {
  const [input, setInput] = useState("");
  const [dextroseUsed, setDextroseUsed] = useState();
  const [IVFluidRate, setIVFluidRate] = useState();
  const [weight, setWeight] = useState();
  const [GIR, setGIR] = useState();

  const states = {
    dextroseUsed: [dextroseUsed, setDextroseUsed],
    IVFluidRate: [IVFluidRate, setIVFluidRate],
    weight: [weight, setWeight],
    GIR: [GIR, setGIR],
  };

  const stateVals = {
    dextroseUsed: [dextroseUsed,],
    IVFluidRate: [IVFluidRate,],
    weight: [weight,],
    GIR: [GIR,],
  };

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
        Notes: 
        <br/>
        To get results please <strong>fill out the orange colored fields</strong>
        <br/>
        If results shown as <strong>NaN</strong> required input fields not provided
        <br />
        Click on <AIIcon /> icon for explanaion for any result
      </div>

      <div className="rounded-2xl border-zinc-100  lg:border lg:p-6">
        <InputForm
          states={states}
          stateVals={stateVals}
          input={input}
          setInput={setInput}
        />
      </div>
    </div>
  );
}



