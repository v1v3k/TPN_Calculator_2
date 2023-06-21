import { useEffect, useState } from "react";
import { Button } from "./Button";
import { type ChatGPTMessage, ChatLine, LoadingChatLine } from "./ChatLine";
import { useCookies } from "react-cookie";
import styles from './index.module.css';;
import { AIExplainWindow, getContent, AIIcon } from "./AIExplainWindow";
import CancelPresentationTwoToneIcon from '@mui/icons-material/CancelPresentationTwoTone';
import ComputerIcon from '@mui/icons-material/Computer';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

import Box from '@mui/material/Box';

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

  const [tpnFluidRateDisplay, setTpnFluidRateDisplay] = useState(false);
  const [tpnFluidRateExplain, setTpnFluidRateExplain] = useState("");


  const [ilVolumeDisplay, setIlVolumeDisplay] = useState(false);
  const [ilVolumeExplain, setIlVolumeExplain] = useState("");

  const [tpnVolumeDisplay, setTpnVolumeDisplay] = useState(false);
  const [tpnVolumeExplain, setTpnVolumeExplain] = useState("");

  const [ilRateDisplay, setIlRateDisplay] = useState(false);
  const [ilRateExplain, setIlRateExplain] = useState("");

  const [magSulfateDisplay, setMagSulfateDisplay] = useState(false);
  const [magSulfateExplain, setMagSulfateExplain] = useState("");

  const [sodiumPhosphateDisplay, setSodiumPhosphateDisplay] = useState(false);
  const [sodiumPhosphateExplain, setSodiumPhosphateExplain] = useState("");

  const [sodiumChlorideDisplay, setSodiumChlorideDisplay] = useState(false);
  const [sodiumChlorideExplain, setSodiumChlorideExplain] = useState("");

  const [potassiumChlorideDisplay, setPotassiumChlorideDisplay] = useState(false);
  const [potassiumChlorideExplain, setPotassiumChlorideExplain] = useState("");

  const [znDisplay, setZnDisplay] = useState(false);
  const [znExplain, setZnExplain] = useState("");

  const [cuDisplay, setCuDisplay] = useState(false);
  const [cuExplain, setCuExplain] = useState("");

  const [mnDisplay, setMnDisplay] = useState(false);
  const [mnExplain, setMnExplain] = useState("");

  const [heparinDisplay, setHeparinDisplay] = useState(false);
  const [heparinExplain, setHeparinExplain] = useState("");

  const [glucDisplay, setGlucDisplay] = useState(false);
  const [glucExplain, setGlucExplain] = useState("");

  const [ptnDisplay, setPtnDisplay] = useState(false);
  const [ptnExplain, setPtnExplain] = useState("");


  const [ilResultDisplay, setIlResultDisplay] = useState(false);
  const [ilResultExplain, setIlResultExplain] = useState("");

  const [totalDisplay, setTotalDisplay] = useState(false);
  const [totalExplain, setTotalExplain] = useState("");

  const [kcal19Display, setKcal19Display] = useState(false);
  const [kcal19Explain, setKcal19Explain] = useState("");

  const [kcal22Display, setKcal22Display] = useState(false);
  const [kcal22Explain, setKcal22Explain] = useState("");

  const [kcal24Display, setKcal24Display] = useState(false);
  const [kcal24Explain, setKcal24Explain] = useState("");

  const [mciDisplay, setMciDisplay] = useState(false);
  const [mciExplain, setMciExplain] = useState("");





  /*
    ilVolume
  */
  states.ilVolume[1](Math.abs(states.il[0] * states.birthWeight[0] * 5).toFixed(2))
  const handleIlVolumeClick = () => {

    if (ilVolumeDisplay) {
      setIlVolumeDisplay(false);
    }
    else if (!ilVolumeDisplay) {
      setIlVolumeDisplay(true);

      setIlVolumeExplain("Loading GPT Answer Composition...");

      const prompt = `  
        If any input undefined or character based mention calculation cannot be performed
  
        User:
        - Intra Lipids = 21
        - Birth Weight  = 2
  
        ***Solution = 48***
        
        System:
        Step 1: Formula for IL volume  = Intra Lipids * Birth Weight * 5

        Step 2: Values 
        - Intra Lipids = 21
        - Birth Weight  = 2
  
        Step 3: Substituion and Result
        IL volume = Intra Lipids * Birth Weight * 5
        IL volume = 21 * 2 * 5
        IL volume = 48
  
        User:
        - Intra Lipids = 3
        - Birth Weight  = 56
  
        ***Solution = 88***
        
        System:
        Step 1: Formula for IL volume  = Intra Lipids * Birth Weight * 5

        Step 2: Values 
        - Intra Lipids = 3
        - Birth Weight  = 56
  
        Step 3: Substituion and Result
        IL volume = Intra Lipids * Birth Weight * 5
        IL volume = 3 * 56 * 5
        IL volume = 88
  
        User:
        - Intra Lipids = `+ states.il[0] + `
        - Birth Weight  = `+ states.birthWeight[0] + `
  
        ***Solution =  `+ states.ilVolume[0] + `***
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
        setIlVolumeExplain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  }

  /*
    TPN Volume
  */
  states.tpnVolume[1](states.birthWeight[0] * states.tfRatio[0] - states.po[0] - states.ilVolume[0]); // 7
  const handleTpnVolumeClick = () => {
    if (tpnVolumeDisplay) {
      setTpnVolumeDisplay(false);
    }
    else if (!tpnVolumeDisplay) {
      setTpnVolumeDisplay(true);

      setTpnVolumeExplain("Loading GPT Answer Composition...");

      const prompt = `  
        If any input undefined calculation cannot be performed
  
        User:
        - TF Ratio = 21
        - Birth Weight  = 2
        - PO = 5
        - il Volume = 24
  
        ***Solution = 48***
        
        System:
        Step 1: Formula for TPN Volume  = Birth Weight  * TF Ration - PO - IL Volume 

        Step 2: Values 
        - TF Ratio = 21
        - Birth Weight  = 2
        - PO = 5
        - il Volume = 24 

        Step 3: Substituion and Result
        TPN Volume  = Birth Weight  * TF Ratio - PO - IL Volume 
        TPN Volume  = 2  * 21 - 5 - 24 
        IL volume = 48
  
        User:
        - TF Ratio = 21
        - Birth Weight  = 2
        - PO = 5
        - il Volume = 24
  
        ***Solution = 48***
        
        System:
        Step 1: Formula for TPN Volume  = Birth Weight  * TF Ration - PO - IL Volume 

        Step 2: Values 
        - TF Ratio = 21
        - Birth Weight  = 2
        - PO = 5
        - il Volume = 24 

        Step 3: Substituion and Result
        TPN Volume  = Birth Weight  * TF Ratio - PO - IL Volume 
        TPN Volume  = 2  * 21 - 5 - 24 
        IL volume = 48

        User:
        - TF Ratio = `+ states.tfRatio[0] + `
        - Birth Weight  = `+ states.birthWeight[0] + `
        - PO = `+ states.po[0] + `
        - il Volume = `+ states.ilVolume[0] + `
  
        ***Solution =  `+ states.tpnVolume[0] + `***
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
        setTpnVolumeExplain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
  states.tpnFluidRate[0]) / 24
  */
  states.tpnFluidRate[1](states.tpnVolume[0] / 24)
  const handleTpnFluidRateClick = () => {
    if (tpnFluidRateDisplay) {
      setTpnFluidRateDisplay(false);
    }
    else if (!tpnFluidRateDisplay) {
      setTpnFluidRateDisplay(true);

      setTpnFluidRateExplain("Loading GPT Answer Composition...");

      //   states.tpnFluidRate[1](states.tpnVolume[0] / 24)
      const prompt = `  
        If any input undefined calculation cannot be performed
  
        User:
        - tpnVolume = 21
  
        ***Solution = 3***
        
        System:
        Step 1: Formula for TPN Volume  = TPN Volume / 24 

        Step 2: Values 
        - tpnVolume = 21

        Step 3: Substituion and Result
        TPN Volume  = TPN Volume / 24 
        TPN Volume  = 21 / 24
        TPN Volume = 3
  

        User:
        - tpnVolume = 33
  
        ***Solution = 7***
        
        System:
        Step 1: Formula for TPN Volume  = TPN Volume / 24 

        Step 2: Values 
        - tpnVolume = 33

        Step 3: Substituion and Result
        TPN Volume  = TPN Volume / 24 
        TPN Volume  = 33 / 24
        TPN Volume = 7
  
        User:
        - tpnVolume = `+ states.tpnVolume[0] + `
  
        ***Solution =  `+ states.tpnFluidRate[0] + `***
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

        setTpnFluidRateExplain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };


  /*
  */
  states.ilRate[1](states.ilVolume[0] / 20)
  const handleIlRateClick = () => {
    if (ilRateDisplay) {
      setIlRateDisplay(false);
    }
    else if (!ilRateDisplay) {
      setIlRateDisplay(true);

      setIlRateExplain("Loading GPT Answer Composition...");

      //  states.ilRate[1](states.ilVolume[0] / 20)
      const prompt = `  
        If any input undefined calculation cannot be performed
  
        User:
        - ilVolume = 21
  
        ***Solution = 3***
        
        System:
        Step 1: Formula for ilRate  = ilVolume / 20

        Step 2: Values 
        - ilVolume = 21

        Step 3: Substituion and Result
        ilRate  = ilVolume / 20
        ilRate  = 21 / 20
        ilRate = 3
  

        User:
        - ilVolume = 33
  
        ***Solution = 5***
        
        System:
        Step 1: Formula for IL Volume  = ilVolume / 20

        Step 2: Values 
        - ilVolume = 33

        Step 3: Substituion and Result
        ilRate  = ilVolume / 20
        ilRate  = 33 / 20
        ilRate = 5
  
  
        User:
        - ilVolume = `+ states.ilVolume[0] + `
  
        ***Solution =  `+ states.ilRate[0] + `***
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
        setIlRateExplain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };


  /*
  */
  states.magSulfate[1](states.birthWeight[0] / 4)
  const handleMagSulfateClick = () => {
    if (magSulfateDisplay) {
      setMagSulfateDisplay(false);
    }
    else {
      setMagSulfateDisplay(true);

      setMagSulfateExplain("Loading GPT Answer Composition...");


      const prompt = `  
        If any input undefined calculation cannot be performed
  
        User:
        - birthWeight = 10
  
        ***Solution = 2.5***
        
        System:
        Step 1: Formula for magSulfate  = birthWeight / 4

        Step 2: Values 
        - birthWeight = 10

        Step 3: Substituion and Result
        magSulfate  = birthWeight / 4
        magSulfate  = 10 / 4
        magSulfate = 2.5
  

        User:
        - birthWeight = 8
  
        ***Solution = 2***
        
        System:
        Step 1: Formula for magSulfate  = birthWeight / 4

        Step 2: Values 
        - birthWeight = 8

        Step 3: Substituion and Result
        magSulfate  = birthWeight / 4
        magSulfate  = 8 / 4
        magSulfate = 2
  
  
        User:
        - birthWeight = `+ states.birthWeight[0] + `
  
        ***Solution =  `+ states.magSulfate[0] + `***
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
        setMagSulfateExplain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
  */
  const c21 = ((states.calcium[0] * states.birthWeight[0]) / 200)
  states.sodiumPhosphate[1]((c21 / 2) * 0.75)
  const handleSodiumPhosphateClick = () => {
    if (sodiumPhosphateDisplay) {
      setSodiumPhosphateDisplay(false);
    }
    else {
      setSodiumPhosphateDisplay(true);

      setSodiumPhosphateExplain("Loading GPT Answer Composition...");

      const prompt = `  
        If any input undefined calculation cannot be performed
  
        User:
        - calcium = 21
        - birthWeight = 10

        ***Solution = 4***
        
        System:
        Step 1: Formula for sodiumPhosphate  = (calcium * birthWeight/400)* 0.75

        Step 2: Values 
        - calcium = 21
        - birthWeight = 10

        Step 3: Substituion and Result
        sodiumPhosphate  = (calcium * birthWeight/400)* 0.75
        sodiumPhosphate  = (21 * 10 / 400)* 0.75
        sodiumPhosphate = 4
  

        User:
        - calcium = 2
        - birthWeight = 11

        ***Solution = 7***
        
        System:
        Step 1: Formula for sodiumPhosphate  = (states.calcium[0] * states.birthWeight[0]/2) / 200)* 0.75

        Step 2: Values 
        - calcium = 2
        - birthWeight = 11

        Step 3: Substituion and Result
        sodiumPhosphate  = (calcium * birthWeight/400)* 0.75
        sodiumPhosphate  = (2 * 11 / 400)* 0.75
        sodiumPhosphate = 7
  
        User:
        - calcium = `+ states.calcium[0] + `
        - birthWeight = `+ states.birthWeight[0] + `
        
  
        ***Solution =  `+ states.sodiumPhosphate[0] + `***
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
        setSodiumPhosphateExplain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };


  /*
  */
  const c25 = states.totalSodium[0] * states.birthWeight[0]
  states.sodiumChloride[1](c25 - c21 / 2)
  const handleSodiumChlorideClick = () => {
    if (sodiumChlorideDisplay) {
      setSodiumChlorideDisplay(false);
    }
    else {
      setSodiumChlorideDisplay(true);

      setSodiumChlorideExplain("Loading GPT Answer Composition...");

      const prompt = `  
        If any input undefined calculation cannot be performed
  
        User:
        - Total Sodium = 21
        - Birth Weight = 3
        - Total Calcium = 10
  
        ***Solution = 20***
        
        System:
        Step 1: Formula for Sodium Chloride  = Total Sodium * BirthWeight - Total Calcium * BirthWeight / 400

        Step 2: Values 
        - Total Sodium = 21
        - Birth Weight = 3
        - Total Calcium = 10

        Step 3: Substituion and Result
        Sodium Chloride  =  Total Sodium * BirthWeight - Total Calcium * BirthWeight / 400
        Sodium Chloride  =  21 * 3 - 10 * 3 / 400
        Sodium Chloride  =  20
  

        User:
        - Total Sodium = 5
        - Birth Weight = 10
        - Total Calcium = 12
  
        ***Solution = 4***
        
        System:
        Step 1: Formula for Sodium Chloride  = Total Sodium * BirthWeight - Total Calcium * BirthWeight / 400

        Step 2: Values 
        - Total Sodium = 5
        - Birth Weight = 10
        - Total Calcium = 12

        Step 3: Substituion and Result
        Sodium Chloride  =  Total Sodium * BirthWeight - Total Calcium * BirthWeight / 400
        Sodium Chloride  =  5 * 10 - 12 * 10 / 400
        Sodium Chloride  =  4

  
        User:
        - Total Sodium = `+ states.totalSodium[0] + `
        - Birth Weight = `+ states.birthWeight[0] + `
        - Total Calcium = `+ states.calcium[0] + `
  
        ***Solution =  `+ states.sodiumChloride[0] + `***
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
        setSodiumChlorideExplain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };


  /*
  */
  states.potassiumChloride[1](states.birthWeight[0] * states.totalPotassium[0])
  const handlePotassiumChlorideClick = () => {
    if (potassiumChlorideDisplay) {
      setPotassiumChlorideDisplay(false);
    }
    else {
      setPotassiumChlorideDisplay(true);

      setPotassiumChlorideExplain("Loading GPT Answer Composition...");

      /*
        states.ilRate[1](states.ilVolume[0] / 20)
     (birthWeight * totalPotassium)
        */

      const prompt = `  
        If any input undefined calculation cannot be performed
  
        User:
        - Birth Weight = 21
        - Total Potassium = 10
        ***Solution = 210***
        
        System:
        Step 1: Formula for Potassium Chloride  = Total Potassium * Birth Weight

        Step 2: Values 
        - Birth Weight = 21
        - Total Potassium = 10

        Step 3: Substituion and Result
        Potassium Chloride   = Total Potassium * Birth Weight
        Potassium Chloride  = 10 * 21
        Potassium Chloride = 210
  
        User:
        - Birth Weight = 3
        - Total Potassium = 10

        ***Solution = 30***
        
        System:
        Step 1: Formula for Potassium Chloride  = Total Potassium * Birth Weight

        Step 2: Values 
        - Birth Weight = 3
        - Total Potassium = 10

        Step 3: Substituion and Result
        Potassium Chloride   = Total Potassium * Birth Weight
        Potassium Chloride  = 10 * 3
        Potassium Chloride = 30  
        
        User:
        - Birth Weight = `+ states.birthWeight[0] + `
        - Total Potassium = `+ states.totalPotassium[0] + `
  
        ***Solution =  `+ states.potassiumChloride[0] + `***
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
        setPotassiumChlorideExplain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };


  // MCI
  const handleMCI = () => {

    if (mciDisplay) {
      setMciDisplay(false);
    }
    else {
      setMciDisplay(true);

      setMciExplain("MCI Value Set as 3.25");

    }
  };

  /*
  */
  states.zn[1](400 * states.birthWeight[0])
  const handleZnClick = () => {
    if (znDisplay) {
      setZnDisplay(false);
    }
    else {
      setZnDisplay(true);

      setZnExplain("Loading GPT Answer Composition...");

      //   states.zn[1](400 * states.birthWeight[0])
      const prompt = `  
        If any input undefined calculation cannot be performed
  
        User:
        - Birth Weight = 10
  
        ***Solution = 4000***
        
        System:
        Step 1: Formula for Total Zinc  = Birth Weight * 400

        Step 2: Values 
        - Birth Weight = 10

        Step 3: Substituion and Result
        Total Zinc  = Birth Weight * 400
        Total Zinc  = 10 * 400
        Total Zinc = 4000
  
        User:
        - Birth Weight = 5
  
        ***Solution = 2000***
        
        System:
        Step 1: Formula for Total Zinc  = Birth Weight * 400

        Step 2: Values 
        - Birth Weight = 5

        Step 3: Substituion and Result
        Total Zinc  = Birth Weight * 400
        Total Zinc  = 5* 400
        Total Zinc = 2000
  
  
        User:
        - Birth Weight = `+ states.birthWeight[0] + `
  
        ***Solution =  `+ states.zn[0] + `***
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
        setZnExplain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };



  /*
  */
  states.cu[1](20 * states.birthWeight[0])
  const handleCuClick = () => {
    if (cuDisplay) {
      setCuDisplay(false);
    }
    else {
      setCuDisplay(true);

      setCuExplain("Loading GPT Answer Composition...");

      // states.cu[1](20 * states.birthWeight[0])
      const prompt = `  
      If any input undefined calculation cannot be performed
  
      User:
      - Birth Weight = 10

      ***Solution = 200***
      
      System:
      Step 1: Formula for Total Cu  = Birth Weight * 20

      Step 2: Values 
      - Birth Weight = 10

      Step 3: Substituion and Result
      Total Cu = Birth Weight * 20
      Total Cu = 10 * 20
      Total Cu = 200

      User:
      - Birth Weight = 5

      ***Solution = 100 ***
      
      System:
      Step 1: Formula for Total Zinc  = Birth Weight * 20

      Step 2: Values 
      - Birth Weight = 5

      Step 3: Substituion and Result
      Total Cu  = Birth Weight * 20
      Total Cu  = 5 * 20
      Total Cu = 100


      User:
      - Birth Weight = `+ states.birthWeight[0] + `

      ***Solution =  `+ states.cu[0] + `***
  
      
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
        setCuExplain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };


  /*
  */
  states.mn[1](1 * states.birthWeight[0])
  const handleMnClick = () => {
    if (mnDisplay) {
      setMnDisplay(false);
    }
    else {
      setMnDisplay(true);

      setMnExplain("Loading GPT Answer Composition...");

      //  states.ilRate[1](states.ilVolume[0] / 20)
      const prompt = `  
      If any input undefined calculation cannot be performed
  
      User:
      - Birth Weight = 10

      ***Solution = 200***
      
      System:
      Step 1: Formula for Total Mn  = Birth Weight * 20

      Step 2: Values 
      - Birth Weight = 10

      Step 3: Substituion and Result
      Total Mn = Birth Weight * 20
      Total Mn = 10 * 20
      Total Mn = 200

      User:
      - Birth Weight = 5

      ***Solution = 5 ***
      
      System:
      Step 1: Formula for Total Mn  = Birth Weight * 1

      Step 2: Values 
      - Birth Weight = 5

      Step 3: Substituion and Result
      Total Mn = Birth Weight * 1
      Total Mn = 5 * 1
      Total Mn = 5


      User:
      - Birth Weight = `+ states.birthWeight[0] + `

      ***Solution =  `+ states.mn[0] + `***
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
        setMnExplain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };


  /*
  */
  states.heparin[1](states.tpnVolume[0] / 2)
  const handleHeparinClick = () => {
    if (heparinDisplay) {
      setHeparinDisplay(false);
    }
    else {
      setHeparinDisplay(true);

      setHeparinExplain("Loading GPT Answer Composition...");

      //  states.ilRate[1](states.ilVolume[0] / 20)
      const prompt = `  
        If any input undefined calculation cannot be performed
  
        User:
        - TPN Volume = 20
  
        ***Solution = 10***
        
        System:
        Step 1: Formula for Heparin  = TPN Volume / 2

        Step 2: Values 
        - TPN Volume = 20

        Step 3: Substituion and Result
        Heparin  = TPN Volume / 2
        Heparin  = 20 / 2
        Heparin = 10
  
        User:
        - TPN Volume = 10
  
        ***Solution = 5 ***
        
        System:
        Step 1: Formula for Heparin  = TPN Volume / 2

        Step 2: Values 
        - TPN Volume = 10

        Step 3: Substituion and Result
        Heparin  = TPN Volume / 2
        Heparin  = 10 / 2
        Heparin = 5
  
  
        User:
        - TPN Volume = `+ states.tpnVolume[0] + `
  
        ***Solution =  `+ states.heparin[0] + `***
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
        setHeparinExplain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };


  /*
  */
  states.gluc[1]((states.tpnVolume[0] / 10) * 3.4)
  const handleGlucClick = () => {
    if (glucDisplay) {
      setGlucDisplay(false);
    }
    else {
      setGlucDisplay(true);

      setGlucExplain("Loading GPT Answer Composition...");

      //  states.ilRate[1](states.ilVolume[0] / 20)
      const prompt = `  
        
      If any input undefined calculation cannot be performed
  
      User:
      - TPN Volume = 20

      ***Solution = 6.8***
      
      System:
      Step 1: Formula for Glucose  = ( TPN Volume / 10 ) * 3.4

      Step 2: Values 
      - TPN Volume = 20

      Step 3: Substituion and Result
      Glucose  = (TPN Volume / 10 ) * 3.4
      Glucose  = (20 / 10 ) * 3.4
      Glucose = 6.8

      User:
      - TPN Volume = 10

      ***Solution = 3.4 ***
      
      System:
      Step 1: Formula for Glucose  = ( TPN Volume / 10 ) * 3.4

      Step 2: Values 
      - TPN Volume = 10

      Step 3: Substituion and Result
      Glucose  = ( TPN Volume/ 10 ) * 3.4
      Glucose  = ( 10 / 10 ) * 3.4
      Glucose = 3.4


      User:
      - TPN Volume = `+ states.tpnVolume[0] + `

      ***Solution =  `+ states.gluc[0] + `***
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
        setGlucExplain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };



  /*
  */
  const c13 = states.birthWeight[0] * states.aa[0]
  states.ptn[1](c13 * 4);
  // birthWeight * aa * 4
  const handlePtnClick = () => {

    if (ptnDisplay) {
      setPtnDisplay(false);
    }
    else {
      setPtnDisplay(true);

      setPtnExplain("Loading GPT Answer Composition...");

      const prompt = `  
        If any input undefined calculation cannot be performed
  
        User:
        - birthWeight = 2
        - aa = 20
        ***Solution = 160***
        
        System:
        Step 1: Formula for Ptn  = birthWeight * aa * 4

        Step 2: Values 
        - birthWeight = 2
        - aa = 20

        Step 3: Substituion and Result
        Ptn  = birthWeight * aa * 4
        Ptn  = 2 * 20 * 4
        Ptn = 160
  

        User:
        - birthWeight = 1
        - aa = 20
        ***Solution = 80***
        
        System:
        Step 1: Formula for Ptn  = birthWeight * aa * 4

        Step 2: Values 
        - birthWeight = 1
        - aa = 20

        Step 3: Substituion and Result
        Ptn  = birthWeight * aa * 4
        Ptn  = 1 * 20 * 4
        Ptn = 80
  
  
        User:
        - birthWeight = `+ states.birthWeight[0] + `
        - aa = `+ states.aa[0] + `  
        ***Solution =  `+ states.ptn[0] + `***
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
        setPtnExplain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
  */
  states.ILResult[1](states.birthWeight[0] * states.il[0] * 9)
  const handleIlResultClick = () => {
    if (ilResultDisplay) {
      setIlResultDisplay(false);
    }
    else {
      setIlResultDisplay(true);

      setIlResultExplain("Loading GPT Answer Composition...");

      const prompt = `  
        If any input undefined calculation cannot be performed
  
        User:
        - birthWeight = 2
        - il = 10
  
        ***Solution = 180 ***
        
        System:
        Step 1: Formula for ILResult  = birthWeight * il * 9

        Step 2: Values 
        - birthWeight = 2
        - il = 10

        Step 3: Substituion and Result
        ILResult  = birthWeight * il * 9
        ILResult  = 2 * 10 * 9
        ILResult = 180
  

        User:
        - birthWeight = 3
        - il = 10
  
        ***Solution = 270 ***
        
        System:
        Step 1: Formula for ILResult  = birthWeight * il * 9

        Step 2: Values 
        - birthWeight = 3
        - il = 10

        Step 3: Substituion and Result
        ILResult  = birthWeight * il * 9
        ILResult  = 3 * 10 * 9
        ILResult = 270
  
  
        User:
        - birthWeight = `+ states.birthWeight[0] + `
        - il = `+ states.il[0] + `
        ***Solution =  `+ states.ILResult[0] + `***
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
        setIlResultExplain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
  */
  states.total[1](states.gluc[0] + states.ptn[0] + states.ILResult[0])
  const handleTotalClick = () => {
    if (totalDisplay) {
      setTotalDisplay(false);
    }
    else {
      setTotalDisplay(true);

      setTotalExplain("Loading GPT Answer Composition...");

      //  states.ilRate[1](states.ilVolume[0] / 20)
      const prompt = `  
        If any input undefined calculation cannot be performed
  
        User:
        - gluc = 2
        - ptn = 3
        - ILResult = 5
  
        ***Solution = 10 ***
        
        System:
        Step 1: Formula for Total  =   gluc + ptn + ILResult


        Step 2: Values 
        - gluc = 2
        - ptn = 3
        - ILResult = 5

        Step 3: Substituion and Result
        Total  =  gluc + ptn + ILResult
        Total  = 2 + 3 + 5
        Total = 10
  


        User:
        - gluc = 3
        - ptn = 3
        - ILResult = 5
  
        ***Solution = 11 ***
        
        System:
        Step 1: Formula for Total  =   gluc + ptn + ILResult


        Step 2: Values 
        - gluc = 3
        - ptn = 3
        - ILResult = 5

        Step 3: Substituion and Result
        Total  =  gluc + ptn + ILResult
        Total  = 3 + 3 + 5
        Total = 11
  
        User:
        - gluc = `+ states.gluc[0] + `
        - ptn = `+ states.ptn[0] + `
        - ILResult = `+ states.ILResult[0] + `
  
        ***Solution =  `+ states.total[0] + `***
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
        setTotalExplain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };


  /*
  */
  states.Kcal_19[1](((states.po[0] * 19) / 30) / states.birthWeight[0])
  const handleKcal19Click = () => {
    if (kcal19Display) {
      setKcal19Display(false);
    }
    else {
      setKcal19Display(true);

      setKcal19Explain("Loading GPT Answer Composition...");

      //  states.ilRate[1](states.ilVolume[0] / 20)
      const prompt = `  
        If any input undefined calculation cannot be performed
  
        User:
        - po = 21
        - birthWeight = 30
        ***Solution = 45***
        
        System:
        Step 1: Formula for Enteral feeds for 19 Kcal  = (po * 19 / 30) / birthWeight

        Step 2: Values 
        - po = 21
        - birthWeight = 30

        Step 3: Substituion and Result
        Enteral feeds for 19 Kcal  = (po * 19 / 30) / birthWeight
        Enteral feeds for 19 Kcal   = (21 * 19 / 30) / 30
        Enteral feeds for 19 Kcal  = 45
  

        User:
        - po = 2
        - birthWeight = 3
        ***Solution = 4***
        
        System:
        Step 1: Formula fo Enteral feeds for 19 Kcal  = (po * 19 / 30) / birthWeight

        Step 2: Values 
        - po = 2
        - birthWeight = 3

        Step 3: Substituion and Result
        Enteral feeds for 19 Kcal   = (po * 19 / 30) / birthWeight
        Enteral feeds for 19 Kcal   = (2 * 19 / 3) / 30
        Enteral feeds for 19 Kcal = 4
  
  
        User:
        - po = `+ states.po[0] + `
        - birthWeight = `+ states.birthWeight[0] + `
  
        ***Solution =  `+ states.Kcal_19[0] + `***
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
        setKcal19Explain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
  */
  states.Kcal_22[1](((states.po[0] * 22) / 30) / states.birthWeight[0])
  const handleKcal22Click = () => {

    if (kcal22Display) {
      setKcal22Display(false);
    }
    else {
      setKcal22Display(true);

      setKcal22Explain("Loading GPT Answer Composition...");

      //  states.ilRate[1](states.ilVolume[0] / 20)
      const prompt = `  
      If any input undefined calculation cannot be performed
  
      User:
      - po = 21
      - birthWeight = 30
      ***Solution = 45***
      
      System:
      Step 1: Formula for Enteral feeds for 22 Kcal  = (po * 22 / 30) / birthWeight

      Step 2: Values 
      - po = 21
      - birthWeight = 30

      Step 3: Substituion and Result
      Enteral feeds for 22 Kcal  = (po * 22 / 30) / birthWeight
      Enteral feeds for 22 Kcal  = (21 * 22 / 30) / 30
      Enteral feeds for 22 Kcal  = 45


      User:
      - po = 2
      - birthWeight = 3
      ***Solution = 4***
      
      System:
      Step 1: Enteral feeds for 22 Kcal  = (po * 22 / 30) / birthWeight

      Step 2: Values 
      - po = 2
      - birthWeight = 3

      Step 3: Substituion and Result
      Enteral feeds for 22 Kcal = (po * 22 / 30) / birthWeight
      Enteral feeds for 22 Kcal = (2 * 22 / 3) / 30
      Enteral feeds for 22 Kcal = 4


      User:
      - po = `+ states.po[0] + `
      - birthWeight = `+ states.birthWeight[0] + `

      ***Solution =  `+ states.Kcal_22[0] + `***
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
        setKcal22Explain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
  */
  states.Kcal_24[1](((states.po[0] * 24) / 30) / states.birthWeight[0])
  const handleKcal24Click = () => {

    if (kcal24Display) {
      setKcal24Display(false);
    }
    else {
      setKcal24Display(true);

      setKcal24Explain("Loading GPT Answer Composition...");

      //  states.ilRate[1](states.ilVolume[0] / 20)
      const prompt = `  
      If any input undefined calculation cannot be performed
  
      User:
      - po = 21
      - birthWeight = 30
      ***Solution = 45***
      
      System:
      Step 1: Formula for Enteral feeds for 22 Kcal  = (po * 24 / 30) / birthWeight

      Step 2: Values 
      - po = 21
      - birthWeight = 30

      Step 3: Substituion and Result
      Enteral feeds for 24 Kcal   = (po * 24 / 30) / birthWeight
      Enteral feeds for 24 Kcal   = (21 * 24 / 30) / 30
      Enteral feeds for 24 Kcal  = 45


      User:
      - po = 2
      - birthWeight = 3
      ***Solution = 4***
      
      System:
      Step 1: Formula for Kcal_24  = (po * 24 / 30) / birthWeight

      Step 2: Values 
      - po = 2
      - birthWeight = 3

      Step 3: Substituion and Result
      Enteral feeds for 24 Kcal   = (po * 24 / 30) / birthWeight
      Enteral feeds for 24 Kcal   = (2 * 24 / 3) / 30
      Enteral feeds for 24 Kcal  = 4


      User:
      - po = `+ states.po[0] + `
      - birthWeight = `+ states.birthWeight[0] + `

      ***Solution =  `+ states.Kcal_24[0] + `***
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
        setKcal24Explain(result)
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  return (
    <div className={styles.center}>

      <div className={styles.row}>
        <div className={styles.inputRequired}>
          <span className={styles.inputLabel} >Birth weight (KG) </span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.birthWeight[0]}
            onChange={(e) => {
              states.birthWeight[1](e.target.value);
            }}
          />
        </div>

        <div className={styles.inputRequired}>
          <span className={styles.inputLabel} >TF: cc/kg/day </span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.tfRatio[0]}

            onChange={(e) => {
              states.tfRatio[1](e.target.value);
            }}
          />
        </div>


        <div className={styles.inputRequired}>
          <span className={styles.inputLabel} >PO (cc /day)</span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.po[0]}

            onChange={(e) => {
              states.po[1](e.target.value);
            }}
          />
        </div>


        <div className={styles.inputRequired}>
          <span className={styles.inputLabel} >AA (gm/kg/day)</span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.aa[0]}

            onChange={(e) => {
              states.aa[1](e.target.value);
            }}
          />
        </div>


        <div className={styles.inputRequired}>
          <span className={styles.inputLabel} >IL (gm/kg/day)</span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.il[0]}

            onChange={(e) => {
              states.il[1](e.target.value);
            }}
          />
        </div>


      </div>

      <div className={styles.row}>


        <div className={styles.inputRequired}>
          <span className={styles.inputLabel} >Calcium (mg/kg/day) </span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.calcium[0]}

            onChange={(e) => {
              states.calcium[1](e.target.value);
            }}
          />
        </div>

        <div className={styles.inputRequired}>
          <span className={styles.inputLabel} >Total sodium (meq/kg/day)</span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.totalSodium[0]}

            onChange={(e) => {
              states.totalSodium[1](e.target.value);
            }}
          />
        </div>

        <div className={styles.inputRequired}>
          <span className={styles.inputLabel} >Total Potassium (meq/kg/day)</span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.totalPotassium[0]}

            onChange={(e) => {
              states.totalPotassium[1](e.target.value);
            }}
          />
        </div>

      </div>

      <div className={styles.row}>
        <div className={tpnVolumeDisplay ? styles.inputSolutionHighlight : ''}>
          <div className={styles.input}>
            <span className={styles.inputLabel} >Total TPN volume infused in 24 hours <AIIcon callback={handleTpnVolumeClick} /> </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.tpnVolume[0]}

              onChange={(e) => {

              }}
            />

            <br />
            <AIExplainWindow shouldDisplay={tpnVolumeDisplay} explainContent={tpnVolumeExplain} />

          </div>

        </div>

        <div className={tpnFluidRateDisplay ? styles.inputSolutionHighlight : ''}>
          <div className={styles.input}>
            <span className={styles.inputLabel} >TPN fluid rate  <AIIcon callback={handleTpnFluidRateClick} /> </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"

              value={states.tpnFluidRate[0]}

            // onChange={(e) => {
            //   //states.tpnFluidRate[1](states.tpnVolume[0]/24);
            // }}
            />

            <br />
            <AIExplainWindow shouldDisplay={tpnFluidRateDisplay} explainContent={tpnFluidRateExplain} />

          </div>
        </div>

        <div className={ilVolumeDisplay ? styles.inputSolutionHighlight : ''}>
          <div className={styles.input}>

            <span className={styles.inputLabel} >IL volume   <AIIcon callback={handleIlVolumeClick} /> </span>

            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.ilVolume[0]}

              onChange={(e) => {
                states.ilVolume[1](e.target.value);
              }}
            />

            <br />
            <AIExplainWindow shouldDisplay={ilVolumeDisplay} explainContent={ilVolumeExplain} />
          </div>
        </div>
      </div>


      <div className={styles.row}>
        <div className={ilRateDisplay ? styles.inputSolutionHighlight : ''}>
          <div className={styles.input}>
            <span className={styles.inputLabel} >IL rate over 20 hours is  <AIIcon callback={handleIlRateClick} /> </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.ilRate[0]}

              onChange={(e) => {
                states.ilRate[1](e.target.value);
              }}
            />
            <br />
            <AIExplainWindow shouldDisplay={ilRateDisplay} explainContent={ilRateExplain} />

          </div>
        </div>


        <div className={magSulfateDisplay ? styles.inputSolutionHighlight : ''}>
          <div className={styles.input}>
            <span className={styles.inputLabel} >Mag sulfate   <AIIcon callback={handleMagSulfateClick} /> </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.magSulfate[0]}

              onChange={(e) => {
                states.magSulfate[1](e.target.value);
              }}
            />
            <br />
            <AIExplainWindow shouldDisplay={magSulfateDisplay} explainContent={magSulfateExplain} />

          </div>
        </div>

        <div className={sodiumPhosphateDisplay ? styles.inputSolutionHighlight : ''}>
          <div className={styles.input}>
            <span className={styles.inputLabel} >Sodium Phosphate  <AIIcon callback={handleSodiumPhosphateClick} /> </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.sodiumPhosphate[0]}

              onChange={(e) => {
                states.sodiumPhosphate[1](e.target.value);
              }}
            />
            <br />
            <AIExplainWindow shouldDisplay={sodiumPhosphateDisplay} explainContent={sodiumPhosphateExplain} />

          </div>
        </div>

      </div>


      <div className={styles.row}>

        <div className={sodiumChlorideDisplay ? styles.inputSolutionHighlight : ''}>
          <div className={styles.input}>
            <span className={styles.inputLabel} >Sodium chloride or acetate  <AIIcon callback={handleSodiumChlorideClick} /> </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.sodiumChloride[0]}

              onChange={(e) => {
                states.sodiumChloride[1](e.target.value);
              }}
            />
            <br />
            <AIExplainWindow shouldDisplay={sodiumChlorideDisplay} explainContent={sodiumChlorideExplain} />

          </div>
        </div>

        <div className={potassiumChlorideDisplay ? styles.inputSolutionHighlight : ''}>

          <div className={styles.input}>
            <span className={styles.inputLabel} >Potassium Cholride/Acetate  <AIIcon callback={handlePotassiumChlorideClick} /> </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.potassiumChloride[0]}

              onChange={(e) => {
                states.potassiumChloride[1](e.target.value);
              }}
            />
            <br />
            <AIExplainWindow shouldDisplay={potassiumChlorideDisplay} explainContent={potassiumChlorideExplain} />

          </div>
        </div>

        <div className={mciDisplay ? styles.inputSolutionHighlight : ''}>
          <div className={styles.input}>
            <span className={styles.inputLabel} >MCI  <AIIcon callback={handleMCI} /> </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.mci[0]}
              readOnly
            />
            <br />
            <AIExplainWindow shouldDisplay={mciDisplay} explainContent={mciExplain} />

          </div>
        </div>

      </div>




      <div className={styles.row}>

        <div className={znDisplay ? styles.inputSolutionHighlight : ''}>

          <div className={styles.input}>
            <span className={styles.inputLabel} >Zn (max dose is 750)  <AIIcon callback={handleZnClick} /> </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.zn[0]}

              onChange={(e) => {
                states.zn[1](e.target.value);
              }}
            />
            <br />
            <AIExplainWindow shouldDisplay={znDisplay} explainContent={znExplain} />

          </div>
        </div>


        <div className={cuDisplay ? styles.inputSolutionHighlight : ''}>

          <div className={styles.input}>
            <span className={styles.inputLabel} >Cu  <AIIcon callback={handleCuClick} /> </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.cu[0]}

              onChange={(e) => {
                states.cu[1](e.target.value);
              }}
            />
            <br />
            <AIExplainWindow shouldDisplay={cuDisplay} explainContent={cuExplain} />

          </div>
        </div>


        <div className={mnDisplay ? styles.inputSolutionHighlight : ''}>

          <div className={styles.input}>
            <span className={styles.inputLabel} >Mn  <AIIcon callback={handleMnClick} /> </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.mn[0]}

              onChange={(e) => {
                states.mn[1](e.target.value);
              }}
            />
            <br />
            <AIExplainWindow shouldDisplay={mnDisplay} explainContent={mnExplain} />
          </div>
        </div>
      </div>



      <div className={styles.row}>

        <div className={heparinDisplay ? styles.inputSolutionHighlight : ''}>

          <div className={styles.input}>
            <span className={styles.inputLabel} >If you are adding heparin, dose is :  <AIIcon callback={handleHeparinClick} /> </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.heparin[0]}

              onChange={(e) => {
                states.heparin[1](e.target.value);
              }}

              readOnly
            />
            <br />
            <AIExplainWindow shouldDisplay={heparinDisplay} explainContent={heparinExplain} />

          </div>
        </div>
      </div>


      Calorie Calculator -- TPN Calories
      <div className={styles.row}>

        <div className={glucDisplay ? styles.inputSolutionHighlight : ''}>

          <div className={styles.input}>
            <span className={styles.inputLabel} >Gluc  <AIIcon callback={handleGlucClick} /> </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.gluc[0]}

              onChange={(e) => {
                states.gluc[1](e.target.value);
              }}
            />
            <br />
            <AIExplainWindow shouldDisplay={glucDisplay} explainContent={glucExplain} />

          </div>
        </div>


        <div className={ptnDisplay ? styles.inputSolutionHighlight : ''}>

          <div className={styles.input}>
            <span className={styles.inputLabel} >Ptn  <AIIcon callback={handlePtnClick} /> </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.ptn[0]}

              onChange={(e) => {
                states.ptn[1](e.target.value);
              }}
            />
            <br />
            <AIExplainWindow shouldDisplay={ptnDisplay} explainContent={ptnExplain} />

          </div>
        </div>

        <div className={ilResultDisplay ? styles.inputSolutionHighlight : ''}>
          <div className={styles.input}>
            <span className={styles.inputLabel} >IL  <AIIcon callback={handleIlResultClick} /> </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.ILResult[0]}

              onChange={(e) => {
                states.ILResult[1](e.target.value);
              }}
            />
            <br />
            <AIExplainWindow shouldDisplay={ilResultDisplay} explainContent={ilResultExplain} />

          </div>
        </div>

      </div>


      <div className={styles.row}>
        <div className={totalDisplay ? styles.inputSolutionHighlight : ''}>

          <div className={styles.input}>
            <span className={styles.inputLabel} >Total  <AIIcon callback={handleTotalClick} /> </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.total[0]}

              onChange={(e) => {
                states.total[1](e.target.value);
              }}
            />
            <br />
            <AIExplainWindow shouldDisplay={totalDisplay} explainContent={totalExplain} />

          </div>

        </div>
      </div>

      <h1>Enteral feeds if baby getting:</h1>

      <div className={styles.row}>
        <div className={kcal19Display ? styles.inputSolutionHighlight : ''}>

          <div className={styles.input}>
            <span className={styles.inputLabel} > 19 Kcal   <AIIcon callback={handleKcal19Click} /> </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.Kcal_19[0]}

              onChange={(e) => {
                states.Kcal_19[1](e.target.value);
              }}
            />
            <br />
            <AIExplainWindow shouldDisplay={kcal19Display} explainContent={kcal19Explain} />

          </div>
        </div>


        <div className={kcal22Display ? styles.inputSolutionHighlight : ''}>

          <div className={styles.input}>
            <span className={styles.inputLabel} >22 Kcal  <AIIcon callback={handleKcal22Click} /> </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.Kcal_22[0]}
              onChange={(e) => {
                states.Kcal_22[1](e.target.value);
              }}
            />
            <br />
            <AIExplainWindow shouldDisplay={kcal22Display} explainContent={kcal22Explain} />

          </div>
        </div>

        <div className={kcal24Display ? styles.inputSolutionHighlight : ''}>
          <div className={styles.input}>
            <span className={styles.inputLabel} >24 Kcal  <AIIcon callback={handleKcal24Click} /> </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.Kcal_24[0]}
              onChange={(e) => {
                states.Kcal_24[1](e.target.value);
              }}
            />
            <br />
            <AIExplainWindow shouldDisplay={kcal24Display} explainContent={kcal24Explain} />


          </div>
        </div>

      </div>


    </div>
  );
}

export function TPNCalc() {
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [birthWeight, setBirthWeight] = useState();
  const [tfRatio, setTfRatio] = useState();
  const [tpnVolume, setTpnVolume] = useState();
  const [tpnFluidRate, setTpnFluidRate] = useState();
  const [po, setPo] = useState();
  const [aa, setAa] = useState();
  const [il, setIl] = useState();
  const [ilVolume, setIlVolume] = useState();
  const [ilRate, setIlRate] = useState();
  const [calcium, setCalcium] = useState();
  const [magSulfate, setMagSulfate] = useState();
  const [totalSodium, setTotalSodium] = useState();
  const [sodiumPhosphate, setSodiumPhosphate] = useState();
  const [sodiumChloride, setSodiumChloride] = useState();
  const [totalPotassium, setTotalPotassium] = useState();
  const [potassiumChloride, setPotassiumChloride] = useState();
  const [mci, setMci] = useState(3.25);
  const [zn, setZn] = useState();
  const [cu, setCu] = useState();
  const [mn, setMn] = useState();
  const [heparin, setHeparin] = useState();

  const [gluc, setGluc] = useState();
  const [ptn, setPtn] = useState();
  const [ILResult, setILResult] = useState();
  const [total, setTotal] = useState();

  const [Kcal_19, setKcal_19] = useState();
  const [Kcal_22, setKcal_22] = useState();
  const [Kcal_24, setKcal_24] = useState();

  const states = {
    birthWeight: [birthWeight, setBirthWeight],
    tfRatio: [tfRatio, setTfRatio],
    tpnVolume: [tpnVolume, setTpnVolume],
    tpnFluidRate: [tpnFluidRate, setTpnFluidRate],
    po: [po, setPo],
    aa: [aa, setAa],
    il: [il, setIl],
    ilVolume: [ilVolume, setIlVolume],
    ilRate: [ilRate, setIlRate],
    calcium: [calcium, setCalcium],
    magSulfate: [magSulfate, setMagSulfate],
    totalSodium: [totalSodium, setTotalSodium],
    sodiumPhosphate: [sodiumPhosphate, setSodiumPhosphate],
    sodiumChloride: [sodiumChloride, setSodiumChloride],
    totalPotassium: [totalPotassium, setTotalPotassium],
    potassiumChloride: [potassiumChloride, setPotassiumChloride],
    mci: [mci, setMci],
    zn: [zn, setZn],
    cu: [cu, setCu],
    mn: [mn, setMn],
    heparin: [heparin, setHeparin],
    gluc: [gluc, setGluc],
    ptn: [ptn, setPtn],
    ILResult: [ILResult, setILResult],
    total: [total, setTotal],
    Kcal_19: [Kcal_19, setKcal_19],
    Kcal_22: [Kcal_22, setKcal_22],
    Kcal_24: [Kcal_24, setKcal_24],
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
        Notes:
        <br />
        To get results please <strong>fill out the orange colored fields</strong>
        <br />
        If results shown as <strong>NaN</strong> required input fields not provided
        <br />
        Click on <AIIcon /> icon for explanaion for any result
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
