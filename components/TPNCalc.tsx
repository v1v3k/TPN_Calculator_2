import { useEffect, useState } from "react";
import { Button } from "./Button";
import { type ChatGPTMessage, ChatLine, LoadingChatLine } from "./ChatLine";
import { useCookies } from "react-cookie";
import styles from "./index.module.css";
import { AIExplainWindow, getContent, AIIcon } from "./AIExplainWindow";
import CancelPresentationTwoToneIcon from "@mui/icons-material/CancelPresentationTwoTone";
import ComputerIcon from "@mui/icons-material/Computer";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";

import Box from "@mui/material/Box";

const COOKIE_NAME = "nextjs-example-ai-chat-gpt3";

type Message = {
  content: string;
  sender: string;
};

// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: ChatGPTMessage[] = [
  {
    role: "assistant",
    content: " ",
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

  const [potassiumChlorideDisplay, setPotassiumChlorideDisplay] =
    useState(false);
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

  const [caDisplay, setcaDisplay] = useState(false);
  const [caExplain, setcaExplain] = useState("");

  const [NaAccetateDisplay, setNaAccetateDisplay] = useState(false);
  const [NaAccetateExplain, setNaAccetateExplain] = useState("");
  const [NaPhDisplay, setNaPhDisplay] = useState(false);
  const [NaPhExplain, setNaPhExplain] = useState("");
  const [NaClDisplay, setNaClDisplay] = useState(false);
  const [NaClExplain, setNaClExplain] = useState("");
  const [PoAccDisplay, setPoAccDisplay] = useState(false);
  const [PoAccExplain, setPoAccExplain] = useState("");
  const [PoPhosDisplay, setPoPhosDisplay] = useState(false);
  const [PoPhosExplain, setPoPhosExplain] = useState("");
  const [PoChloDisplay, setPoChloDisplay] = useState(false);
  const [PoChloExplain, setPoChloExplain] = useState("");

  /*
    ilVolume
  */
  states.ilVolume[1](
    Math.abs(states.il[0] * states.birthWeight[0] * 5).toFixed(2)
  );
  const handleIlVolumeClick = () => {
    if (ilVolumeDisplay) {
      setIlVolumeDisplay(false);
    } else if (!ilVolumeDisplay) {
      setIlVolumeDisplay(true);

      setIlVolumeExplain("Loading GPT Answer Composition...");

      const prompt =
        `
        20 g IL --> 100 Cc

        Step 1: Formula for IL volume  = Intra Lipids * Birth Weight * 100 / 20

        Step 2: Values 
        - Intra Lipids = ` +
        states.il[0] +
        `
        - Birth Weight  = ` +
        states.birthWeight[0] +
        `

        Step 3: Substituion and Result
        IL volume = Intra Lipids * Birth Weight * 100 / 20
        IL volume =  ` +
        states.il[0] +
        ` * ` +
        states.birthWeight[0] +
        ` * 5
        IL volume =` +
        states.ilVolume[0] +
        `

        `;
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setIlVolumeExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
    TPN Volume
  */
  states.tpnVolume[1](
    states.birthWeight[0] * states.tfRatio[0] -
      states.po[0] -
      states.ilVolume[0]
  ); // 7
  const handleTpnVolumeClick = () => {
    if (tpnVolumeDisplay) {
      setTpnVolumeDisplay(false);
    } else if (!tpnVolumeDisplay) {
      setTpnVolumeDisplay(true);

      setTpnVolumeExplain("Loading GPT Answer Composition...");

      const prompt =
        `          Step 1: Formula for TPN Volume  = Birth Weight  * TF  - PO - IL Volume 

        Step 2: Values 
        - TF  = ` +
        states.tfRatio[0] +
        `
        - Birth Weight  = ` +
        states.birthWeight[0] +
        `
        - PO = ` +
        states.po[0] +
        `
        - il Volume = ` +
        states.ilVolume[0] +
        `

        Step 3: Substituion and Result
        TPN Volume  = Birth Weight  * TF  - PO - IL Volume 
        TPN Volume  = ` +
        states.birthWeight[0] +
        `  * ` +
        states.tfRatio[0] +
        ` - ` +
        states.po[0] +
        ` - ` +
        states.ilVolume[0] +
        `
        TPN Volume = ` +
        states.tpnVolume[0] +
        `
      `;
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setTpnVolumeExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
  states.tpnFluidRate[0]) / 24
  */
  states.tpnFluidRate[1](states.tpnVolume[0] / 24);
  const handleTpnFluidRateClick = () => {
    if (tpnFluidRateDisplay) {
      setTpnFluidRateDisplay(false);
    } else if (!tpnFluidRateDisplay) {
      setTpnFluidRateDisplay(true);

      setTpnFluidRateExplain("Loading GPT Answer Composition...");

      //   states.tpnFluidRate[1](states.tpnVolume[0] / 24)
      const prompt =
        `       Step 1: Formula for Infusion Rate  = TPN Volume / 24 

        Step 2: Values 
        - tpnVolume = ` +
        states.tpnVolume[0] +
        `

        Step 3: Substituion and Result
        Infusion Rate  = TPN Volume / 24 
        Infusion Rate  = ` +
        states.tpnVolume[0] +
        ` / 24
        Infusion Rate =  ` +
        states.tpnFluidRate[0] +
        `
      `;
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;

        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }

        setTpnFluidRateExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
   */
  states.ilRate[1](states.ilVolume[0] / 20);

  /*
   */
  const c21 = (states.calcium[0] * states.birthWeight[0]) / 200;
  states.sodiumPhosphate[1]((c21 / 2) * 0.75);
  const handleSodiumPhosphateClick = () => {
    if (sodiumPhosphateDisplay) {
      setSodiumPhosphateDisplay(false);
    } else {
      setSodiumPhosphateDisplay(true);

      setSodiumPhosphateExplain("Loading GPT Answer Composition...");

      const prompt =
        ` Step 1: Formula for sodiumPhosphate  = (states.calcium[0] * states.birthWeight[0]/2) / 200)* 0.75

        Step 2: Values 
        - calcium = ` +
        states.calcium[0] +
        `
        - birthWeight = ` +
        states.birthWeight[0] +
        `

        Step 3: Substituion and Result
        sodiumPhosphate  = (calcium * birthWeight/400)* 0.75
        sodiumPhosphate  = ( ` +
        states.calcium[0] +
        ` * ` +
        states.birthWeight[0] +
        ` / 400)* 0.75
        sodiumPhosphate =  ` +
        states.sodiumPhosphate[0] +
        `
      `;
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setSodiumPhosphateExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
   */
  const c25 = states.totalSodium[0] * states.birthWeight[0];
  states.sodiumChloride[1](c25 - c21 / 2);
  const handleSodiumChlorideClick = () => {
    if (sodiumChlorideDisplay) {
      setSodiumChlorideDisplay(false);
    } else {
      setSodiumChlorideDisplay(true);

      setSodiumChlorideExplain("Loading GPT Answer Composition...");

      const prompt =
        `
        Step 1: Formula for Sodium Chloride  = Total Sodium * BirthWeight - Total Calcium * BirthWeight / 400

        Step 2: Values 
        - Total Sodium = ` +
        states.totalSodium[0] +
        `
        - Birth Weight = ` +
        states.birthWeight[0] +
        `
        - Total Calcium = ` +
        states.calcium[0] +
        `

        Step 3: Substituion and Result
        Sodium Chloride  =  Total Sodium * BirthWeight - Total Calcium * BirthWeight / 400
        Sodium Chloride  =  ` +
        states.totalSodium[0] +
        ` * ` +
        states.birthWeight[0] +
        ` -  ` +
        states.calcium[0] +
        ` * ` +
        states.birthWeight[0] +
        ` / 400
        Sodium Chloride  =  ` +
        states.sodiumChloride[0] +
        `
      `;
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setSodiumChlorideExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
   */
  states.potassiumChloride[1](states.birthWeight[0] * states.totalPotassium[0]);
  const handlePotassiumChlorideClick = () => {
    if (potassiumChlorideDisplay) {
      setPotassiumChlorideDisplay(false);
    } else {
      setPotassiumChlorideDisplay(true);

      setPotassiumChlorideExplain("Loading GPT Answer Composition...");

      /*
        states.ilRate[1](states.ilVolume[0] / 20)
     (birthWeight * totalPotassium)
        */

      const prompt =
        `  
        Step 1: Formula for Potassium Chloride  = Total Potassium * Birth Weight

        Step 2: Values 
        - Birth Weight = ` +
        states.birthWeight[0] +
        `
        - Total Potassium = ` +
        states.totalPotassium[0] +
        `
        Step 3: Substituion and Result
        Potassium Chloride   = Total Potassium * Birth Weight
        Potassium Chloride  =  ` +
        states.totalPotassium[0] +
        ` * ` +
        states.birthWeight[0] +
        `
        Potassium Chloride =  ` +
        states.potassiumChloride[0] +
        `
      `;
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setPotassiumChlorideExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  // MCI
  const handleMCI = () => {
    if (mciDisplay) {
      setMciDisplay(false);
    } else {
      setMciDisplay(true);

      setMciExplain("MCI Value Set as 3.25");
    }
  };

  // CA
  const handleCA = () => {
    if (caDisplay) {
      setcaDisplay(false);
    } else {
      setcaDisplay(true);
      const prompt =
        `  
      Step 1: Formula for Potassium Chloride  = Total Potassium * Birth Weight
        \n
      Step 2: Values 
      - Birth Weight = ` +
        states.birthWeight[0] +
        `
      - Total Potassium = ` +
        states.totalPotassium[0] +
        `
      Step 3: Substituion and Result
      Potassium Chloride   = Total Potassium * Birth Weight
      Potassium Chloride  =  ` +
        states.totalPotassium[0] +
        ` * ` +
        states.birthWeight[0] +
        `
      Potassium Chloride =  ` +
        states.potassiumChloride[0] +
        `
    `;
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setcaExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  const totalSodiumPercentage =
    parseFloat(states.phosphatePercentage[0]) +
    parseFloat(states.chloridePercentage[0]) +
    parseFloat(states.acetatePercentage[0]);

  states.totalSodiumAcetateNeeded[1](
    (states.totalSodium[0] *
      states.birthWeight[0] *
      states.acetatePercentage[0]) /
      totalSodiumPercentage
  );

  states.totalSodiumChlorideNeeded[1](
    (states.totalSodium[0] *
      states.birthWeight[0] *
      states.chloridePercentage[0]) /
      totalSodiumPercentage
  );

  states.totalSodiumPhosphateNeeded[1](
    (states.totalSodium[0] *
      states.birthWeight[0] *
      states.phosphatePercentage[0] *
      3) /
      (totalSodiumPercentage * 4)
  );

  ////

  const totalPotassiumPercentage =
    parseFloat(states.PottasiumphosphatePercentage[0]) +
    parseFloat(states.PottasiumchloridePercentage[0]) +
    parseFloat(states.PottasiumacetatePercentage[0]);

  states.totalPotassiumAcetateNeeded[1](
    (states.totalPotassium[0] *
      states.birthWeight[0] *
      states.PottasiumacetatePercentage[0]) /
      totalPotassiumPercentage
  );

  states.totalPotassiumChlorideNeeded[1](
    (states.totalPotassium[0] *
      states.birthWeight[0] *
      states.PottasiumchloridePercentage[0]) /
      totalPotassiumPercentage
  );

  states.totalPotassiumPhosphateNeeded[1](
    (states.totalPotassium[0] *
      states.birthWeight[0] *
      states.PottasiumphosphatePercentage[0] *
      3) /
      (totalPotassiumPercentage * 4.4)
  );

  // SodiumAccetate
  const handleNaAccetate = () => {
    if (NaAccetateDisplay) {
      setNaAccetateDisplay(false);
    } else {
      setNaAccetateDisplay(true);
      const prompt =
        `
        Total Sodium Acetate Needed = Sodium per KG * Birth Weight * Sodium Acetate Ratio / Ratio Sum
        Total Sodium Acetate Needed =` +
        states.totalSodium[0] +
        `*` +
        states.birthWeight[0] +
        `*` +
        states.acetatePercentage[0] +
        `/` +
        totalSodiumPercentage +
        `\nTotal Sodium Acetate Needed=` +
        states.totalSodiumAcetateNeeded[0];

      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setNaAccetateExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  //Sodium Phosphate
  const handleNaPh = () => {
    if (NaPhDisplay) {
      setNaPhDisplay(false);
    } else {
      setNaPhDisplay(true);

      const prompt =
        `
        Total Sodium Phospohate Needed = Sodium per KG * Birth Weight * Sodium Phospohate Ratio * 3 / Ratio Sum * 4        
        \n Total Sodium Phospohate Needed =` +
        states.totalSodium[0] +
        `*` +
        states.birthWeight[0] +
        `*` +
        states.phosphatePercentage[0] +
        ` * 3 /` +
        totalSodiumPercentage +
        `* 4` +
        `\n Total Sodium Phospohate Needed=` +
        states.totalSodiumPhosphateNeeded[0];
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setNaPhExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  // Sodium Chlride
  const handleNaCl = () => {
    if (NaClDisplay) {
      setNaClDisplay(false);
    } else {
      setNaClDisplay(true);
      const prompt =
        `
        Total Sodium Chloride Needed = Sodium per KG * Birth Weight * Sodium Chloride Ratio / Ratio Sum
        Total Sodium Chloride Needed =` +
        states.totalSodium[0] +
        `*` +
        states.birthWeight[0] +
        `*` +
        states.chloridePercentage[0] +
        `/` +
        totalSodiumPercentage +
        `\nTotal Sodium Chloride Needed=` +
        states.totalSodiumChlorideNeeded[0];

      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setNaClExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  // PoAcc
  const handlePoAcc = () => {
    if (PoAccDisplay) {
      setPoAccDisplay(false);
    } else {
      setPoAccDisplay(true);
      const prompt =
        `
        Total Potassium Acetate Needed = Potassium per KG * Birth Weight * Potassium Acetate Ratio / Ratio Sum
        \n Total Potassium Acetate Needed =` +
        states.totalPotassium[0] +
        `*` +
        states.birthWeight[0] +
        `*` +
        states.PottasiumacetatePercentage[0] +
        `/` +
        totalPotassiumPercentage +
        `\n Total Potassium Acetate Needed=` +
        states.totalPotassiumAcetateNeeded[0];
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setPoAccExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };
  // PoPhos
  const handlePoPhos = () => {
    if (PoPhosDisplay) {
      setPoPhosDisplay(false);
    } else {
      setPoPhosDisplay(true);
      const prompt =
        `
        Total Potassium Phospohate Needed = Potassium per KG * Birth Weight * Potassium Phospohate Ratio * 3 / Ratio Sum * 4.4   
        \n Total Potassium Phospohate Needed =` +
        states.totalPotassium[0] +
        `*` +
        states.birthWeight[0] +
        `*` +
        states.PottasiumphosphatePercentage[0] +
        ` * 3 /` +
        totalPotassiumPercentage +
        `* 4.4` +
        `\n Total Potassium Phospohate Needed=` +
        states.totalPotassiumPhosphateNeeded[0];
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setPoPhosExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  // PoChlo
  const handlePoChlo = () => {
    if (PoChloDisplay) {
      setPoChloDisplay(false);
    } else {
      setPoChloDisplay(true);
      const prompt =
        `
        Total Potassium Chloride Needed = Potassium per KG * Birth Weight * Potassium Chloride Ratio / Ratio Sum
        Total Potassium Chloride Needed =` +
        states.totalPotassium[0] +
        `*` +
        states.birthWeight[0] +
        `*` +
        states.PottasiumchloridePercentage[0] +
        `/` +
        totalPotassiumPercentage +
        `\n Total Potassium Chloride Needed=` +
        states.totalPotassiumChlorideNeeded[0];

      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setPoChloExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };
  //

  /*
   */
  states.zn[1](400 * states.birthWeight[0]);
  const handleZnClick = () => {
    if (znDisplay) {
      setZnDisplay(false);
    } else {
      setZnDisplay(true);

      setZnExplain("Loading GPT Answer Composition...");

      //   states.zn[1](400 * states.birthWeight[0])
      const prompt =
        ` 
        Step 1: Formula for Total Zinc  = Birth Weight * 400

        Step 2: Values 
        - Birth Weight = ` +
        states.birthWeight[0] +
        `

        Step 3: Substituion and Result
        Total Zinc  = Birth Weight * 400
        Total Zinc  = ` +
        states.birthWeight[0] +
        `* 400
        Total Zinc =  ` +
        states.zn[0] +
        `
      `;
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setZnExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
   */
  states.cu[1](20 * states.birthWeight[0]);
  const handleCuClick = () => {
    if (cuDisplay) {
      setCuDisplay(false);
    } else {
      setCuDisplay(true);

      setCuExplain("Loading GPT Answer Composition...");

      // states.cu[1](20 * states.birthWeight[0])
      const prompt =
        `  
      Step 1: Formula for Total Zinc  = Birth Weight * 20

      Step 2: Values 
      - Birth Weight = ` +
        states.birthWeight[0] +
        `

      Step 3: Substituion and Result
      Total Cu  = Birth Weight * 20
      Total Cu  =` +
        states.birthWeight[0] +
        ` * 20
      Total Cu =  ` +
        states.cu[0] +
        `     
      `;
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setCuExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
   */
  states.mn[1](1 * states.birthWeight[0]);
  const handleMnClick = () => {
    if (mnDisplay) {
      setMnDisplay(false);
    } else {
      setMnDisplay(true);

      setMnExplain("Loading GPT Answer Composition...");

      //  states.ilRate[1](states.ilVolume[0] / 20)
      const prompt =
        `  
      Step 1: Formula for Total Mn  = Birth Weight * 1

      Step 2: Values 
      - Birth Weight = ` +
        states.birthWeight[0] +
        `

      Step 3: Substituion and Result
      Total Mn = Birth Weight * 1
      Total Mn =  ` +
        states.birthWeight[0] +
        ` * 1
      Total Mn =` +
        states.mn[0] +
        `
      `;
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setMnExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
   */
  states.heparin[1](states.tpnVolume[0] / 2);
  const handleHeparinClick = () => {
    if (heparinDisplay) {
      setHeparinDisplay(false);
    } else {
      setHeparinDisplay(true);

      setHeparinExplain("Loading GPT Answer Composition...");

      //  states.ilRate[1](states.ilVolume[0] / 20)
      const prompt =
        `  
        Step 1: Formula for Heparin  = TPN Volume / 2

        Step 2: Values 
        - TPN Volume = ` +
        states.tpnVolume[0] +
        `

        Step 3: Substituion and Result
        Heparin  = TPN Volume / 2
        Heparin  = ` +
        states.tpnVolume[0] +
        ` / 2
        Heparin = ` +
        states.heparin[0] +
        `
      `;
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setHeparinExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
   */
  states.gluc[1](states.tpnVolume[0] * 0.034 * states.dextrose[0]);
  const handleGlucClick = () => {
    if (glucDisplay) {
      setGlucDisplay(false);
    } else {
      setGlucDisplay(true);

      setGlucExplain("Loading GPT Answer Composition...");

      //  states.ilRate[1](states.ilVolume[0] / 20)
      const prompt =
        `  
        1% Dextrose -> 0.034 Kcal/ml 

        Step 1: Formula for Glucose  =  TPN Volume  * 0.034 * Dextrose %

      Step 2: Values 
      - TPN Volume = ` +
        states.tpnVolume[0] +
        `
      - Dextrose Percentage = ` +
        states.dextrose[0] +
        `
      Step 3: Substituion and Result
      Glucose  = TPN Volume  * 0.034 * Dextrose %
      Glucose  =  ` +
        states.tpnVolume[0] +
        ` * 0.034 * ` +
        states.dextrose[0] +
        `
      Glucose = ` +
        states.gluc[0] +
        `
      `;
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setGlucExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
   */
  const c13 = states.birthWeight[0] * states.aa[0];
  states.ptn[1](c13 * 4);
  // birthWeight * aa * 4
  const handlePtnClick = () => {
    if (ptnDisplay) {
      setPtnDisplay(false);
    } else {
      setPtnDisplay(true);

      setPtnExplain("Loading GPT Answer Composition...");

      const prompt =
        `          
        1 Gram of Protein (Amino Acid) -> 4 Kcal

        Step 1: Formula for Ptn  = Birth Weight * Amino Acid per KG * 4

        Step 2: Values 
        - Birth Weight = ` +
        states.birthWeight[0] +
        `
        - Amino Acid = ` +
        states.aa[0] +
        `  

        Step 3: Substituion and Result
        Ptn  = Birth Weight * Amino Acid per KG * 4
        Ptn  = ` +
        states.birthWeight[0] +
        ` * ` +
        states.aa[0] +
        `   * 4
        Ptn =` +
        states.ptn[0] +
        `
      `;
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setPtnExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
   */
  // Todo

  states.ILResult[1](((states.ilVolume[0] * 20) / 100) * 2);
  const handleIlResultClick = () => {
    if (ilResultDisplay) {
      setIlResultDisplay(false);
    } else {
      setIlResultDisplay(true);

      setIlResultExplain("Loading GPT Answer Composition...");

      const prompt =
        `  
        1ml of intra lipid --> 2 Kcal
        For 20% IL , volume of IL --> IL volume * 20 / 100 (amount)

        Calaroies from Total Intra Lipid  = (Total Intra Lipid Volume * 20 /100 ) * 2

        Step 2: Values 
        - Total Intra Lipid Volume = ` +
        states.ilVolume[0] +
        `

        Step 3: Substituion and Result
        IL Cal  = (Total Intra Lipid Volume * 20 /100 ) * 2
        IL Cal  = (` +
        states.ilVolume[0] +
        ` * 20 /100 )` +
        ` * 2
        IL Cal =` +
        states.ILResult[0] +
        `
  
  
        
      `;
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setIlResultExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
   */
  states.total[1](states.gluc[0] + states.ptn[0] + states.ILResult[0]);
  const handleTotalClick = () => {
    if (totalDisplay) {
      setTotalDisplay(false);
    } else {
      setTotalDisplay(true);

      setTotalExplain("Loading GPT Answer Composition...");

      //  states.ilRate[1](states.ilVolume[0] / 20)
      const prompt =
        `         System:
        Step 1: Formula for Total  =   gluc + ptn + ILResult


        Step 2: Values 
        - gluc = ` +
        states.gluc[0] +
        `
        - ptn = ` +
        states.ptn[0] +
        `
        - ILResult = ` +
        states.ILResult[0] +
        `

        Step 3: Substituion and Result
        Total  =  gluc + ptn + ILResult
        Total  = ` +
        states.gluc[0] +
        ` + ` +
        states.ptn[0] +
        ` + ` +
        states.ILResult[0] +
        `
        Total = ` +
        states.total[0] +
        `
      `;
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setTotalExplain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
   */
  states.Kcal_19[1]((states.po[0] * 19) / 30 / states.birthWeight[0]);
  const handleKcal19Click = () => {
    if (kcal19Display) {
      setKcal19Display(false);
    } else {
      setKcal19Display(true);

      setKcal19Explain("Loading GPT Answer Composition...");

      //  states.ilRate[1](states.ilVolume[0] / 20)
      const prompt =
        `  
     
        Step 1: Formula fo Enteral feeds for 19 Kcal  = (po * 19 / 30) / birthWeight

        Step 2: Values 
        - po = ` +
        states.po[0] +
        `
        - birthWeight = ` +
        states.birthWeight[0] +
        `

        Step 3: Substituion and Result
        Enteral feeds for 19 Kcal   = (po * 19 / 30) / birthWeight
        Enteral feeds for 19 Kcal   = (` +
        states.po[0] +
        ` * 19 / 30) / ` +
        states.birthWeight[0] +
        `
        Enteral feeds for 19 Kcal = ` +
        states.Kcal_19[0] +
        `
      `;
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setKcal19Explain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
   */
  states.Kcal_22[1]((states.po[0] * 22) / 30 / states.birthWeight[0]);
  const handleKcal22Click = () => {
    if (kcal22Display) {
      setKcal22Display(false);
    } else {
      setKcal22Display(true);

      setKcal22Explain("Loading GPT Answer Composition...");

      //  states.ilRate[1](states.ilVolume[0] / 20)
      const prompt =
        `  
      Step 1: Enteral feeds for 22 Kcal  = (po * 22 / 30) / birthWeight

      Step 2: Values 
      - po = ` +
        states.po[0] +
        `
      - birthWeight = ` +
        states.birthWeight[0] +
        `

      Step 3: Substituion and Result
      Enteral feeds for 22 Kcal = (po * 22 / 30) / birthWeight
      Enteral feeds for 22 Kcal = (` +
        states.po[0] +
        ` * 22 / 30) / ` +
        states.birthWeight[0] +
        `
      Enteral feeds for 22 Kcal = ` +
        states.Kcal_22[0] +
        `
      `;
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setKcal22Explain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  /*
   */
  states.Kcal_24[1]((states.po[0] * 24) / 30 / states.birthWeight[0]);
  const handleKcal24Click = () => {
    if (kcal24Display) {
      setKcal24Display(false);
    } else {
      setKcal24Display(true);

      setKcal24Explain("Loading GPT Answer Composition...");

      //  states.ilRate[1](states.ilVolume[0] / 20)
      const prompt =
        `  
      Step 1: Formula for Kcal_24  = (po * 24 / 30) / birthWeight

      Step 2: Values 
      - po = ` +
        states.po[0] +
        `
    - birthWeight = ` +
        states.birthWeight[0] +
        `


      Step 3: Substituion and Result
      Enteral feeds for 24 Kcal   = (po * 24 / 30) / birthWeight
      Enteral feeds for 24 Kcal   = (` +
        states.po[0] +
        ` * 24 / 30) / ` +
        states.birthWeight[0] +
        `
      Enteral feeds for 24 Kcal  = ` +
        states.Kcal_24[0] +
        `
      `;
      const newMessages = [
        {
          role: "system",
          content: prompt,
        } as ChatGPTMessage,
      ];

      getContent(newMessages).then((result) => {
        debugger;
        try {
          result = result.replace(/\n/g, "<br>");
        } catch (error) {
          console.log(error);
        }
        setKcal24Explain(result);
        console.log(result); // Handle the result of the asynchronous task
      });
    }
  };

  states.CalciumGluconate[1]((states.calcium[0] * states.birthWeight[0]) / 200);

  return (
    <div className={styles.center}>
      <div className={styles.row}>
        <div className={styles.inputRequired}>
          <span className={styles.inputLabel}>Birth weight (kg) </span>
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
          <span className={styles.inputLabel}>Total Fluid: cc/kg/day </span>
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
          <span className={styles.inputLabel}>PO (cc /day)</span>
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
          <span className={styles.inputLabel}>Amino Acid (gm/kg/day)</span>
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
          <span className={styles.inputLabel}>Intra Lipids (gm/kg/day)</span>
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
        <div className={tpnVolumeDisplay ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              Total TPN volume infused in 24 hours (ml/day){" "}
              <AIIcon callback={handleTpnVolumeClick} />{" "}
            </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.tpnVolume[0]}
              onChange={(e) => {}}
            />

            <br />
            <AIExplainWindow
              shouldDisplay={tpnVolumeDisplay}
              explainContent={tpnVolumeExplain}
            />
          </div>
        </div>

        <div
          className={tpnFluidRateDisplay ? styles.inputSolutionHighlight : ""}
        >
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              Infusion rate (ml/hr){" "}
              <AIIcon callback={handleTpnFluidRateClick} />{" "}
            </span>
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
            <AIExplainWindow
              shouldDisplay={tpnFluidRateDisplay}
              explainContent={tpnFluidRateExplain}
            />
          </div>
        </div>

        <div className={ilVolumeDisplay ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              Intra Lipid volume (cc) <AIIcon callback={handleIlVolumeClick} />{" "}
            </span>

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
            <AIExplainWindow
              shouldDisplay={ilVolumeDisplay}
              explainContent={ilVolumeExplain}
            />
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputRequired}>
          <span className={styles.inputLabel}>Dextrose Percentage</span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.dextrose[0]}
            onChange={(e) => {
              states.dextrose[1](e.target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputRequired}>
          <span className={styles.inputLabel}>Sodium (meq/kg/day)</span>
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
          <span className={styles.inputLabel}>Soddium Accetate Ratio </span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.acetatePercentage[0]}
            onChange={(e) => {
              states.acetatePercentage[1](e.target.value);
            }}
          />
        </div>
        <div className={styles.inputRequired}>
          <span className={styles.inputLabel}>Sodium Phosphate Ratio </span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.phosphatePercentage[0]}
            onChange={(e) => {
              states.phosphatePercentage[1](e.target.value);
            }}
          />
        </div>{" "}
        <div className={styles.inputRequired}>
          <span className={styles.inputLabel}>Sodium Chloride Ratio </span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.chloridePercentage[0]}
            onChange={(e) => {
              states.chloridePercentage[1](e.target.value);
            }}
          />
        </div>
      </div>
      {/* todo */}
      <div className={styles.row}>
        <div className={NaAccetateDisplay ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              Sodium Accetate (mEq)
              <AIIcon callback={handleNaAccetate} />{" "}
            </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.totalSodiumAcetateNeeded[0]}
              readOnly
            />
            <br />
            <AIExplainWindow
              shouldDisplay={NaAccetateDisplay}
              explainContent={NaAccetateExplain}
            />
          </div>
        </div>
        <div className={NaPhDisplay ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              Sodium Phosphate (mM)
              <AIIcon callback={handleNaPh} />{" "}
            </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.totalSodiumPhosphateNeeded[0]}
              readOnly
            />
            <br />
            <AIExplainWindow
              shouldDisplay={NaPhDisplay}
              explainContent={NaPhExplain}
            />
          </div>
        </div>
        <div className={NaClDisplay ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              Sodium Chloride (mEq)
              <AIIcon callback={handleNaCl} />{" "}
            </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.totalSodiumChlorideNeeded[0]}
              readOnly
            />
            <br />
            <AIExplainWindow
              shouldDisplay={NaClDisplay}
              explainContent={NaClExplain}
            />
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputRequired}>
          <span className={styles.inputLabel}>Potassium (meq/kg/day)</span>
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
        <div className={styles.inputRequired}>
          <span className={styles.inputLabel}>Potassium Accetate Ratio </span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.PottasiumacetatePercentage[0]}
            onChange={(e) => {
              states.PottasiumacetatePercentage[1](e.target.value);
            }}
          />
        </div>
        <div className={styles.inputRequired}>
          <span className={styles.inputLabel}>Potassium Phosphate Ratio </span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.PottasiumphosphatePercentage[0]}
            onChange={(e) => {
              states.PottasiumphosphatePercentage[1](e.target.value);
            }}
          />
        </div>{" "}
        <div className={styles.inputRequired}>
          <span className={styles.inputLabel}>Potassium Chloride Ratio </span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.PottasiumchloridePercentage[0]}
            onChange={(e) => {
              states.PottasiumchloridePercentage[1](e.target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={PoAccDisplay ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              Pottasium Accetate (mEq)
              <AIIcon callback={handlePoAcc} />{" "}
            </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.totalPotassiumAcetateNeeded[0]}
              readOnly
            />
            <br />
            <AIExplainWindow
              shouldDisplay={PoAccDisplay}
              explainContent={PoAccExplain}
            />
          </div>
        </div>
        <div className={PoPhosDisplay ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              Pottasium Phosphate (mM)
              <AIIcon callback={handlePoPhos} />{" "}
            </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.totalPotassiumPhosphateNeeded[0]}
              readOnly
            />
            <br />
            <AIExplainWindow
              shouldDisplay={PoPhosDisplay}
              explainContent={PoPhosExplain}
            />
          </div>
        </div>
        <div className={PoChloDisplay ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              Pottasium Chloride (mEq)
              <AIIcon callback={handlePoChlo} />{" "}
            </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.totalPotassiumChlorideNeeded[0]}
              readOnly
            />
            <br />
            <AIExplainWindow
              shouldDisplay={PoChloDisplay}
              explainContent={PoChloExplain}
            />
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputRequired}>
          <span className={styles.inputLabel}>Calcium (mg/kg/day) </span>
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
        <div className={caDisplay ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              Calcium Gluconate (mEq) <AIIcon callback={handleCA} />{" "}
            </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.CalciumGluconate[0]}
              readOnly
            />
            <br />
            <AIExplainWindow
              shouldDisplay={caDisplay}
              explainContent={caExplain}
            />
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={mciDisplay ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              MCI <AIIcon callback={handleMCI} />{" "}
            </span>
            <input
              type="text"
              aria-label="chat input"
              required
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={states.mci[0]}
              readOnly
            />
            <br />
            <AIExplainWindow
              shouldDisplay={mciDisplay}
              explainContent={mciExplain}
            />
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={znDisplay ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              Zn (mcg) (max 750mcg) <AIIcon callback={handleZnClick} />{" "}
            </span>
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
            <AIExplainWindow
              shouldDisplay={znDisplay}
              explainContent={znExplain}
            />
          </div>
        </div>

        <div className={cuDisplay ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              Cu (mcg) (max 50mcg)
              <AIIcon callback={handleCuClick} />{" "}
            </span>
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
            <AIExplainWindow
              shouldDisplay={cuDisplay}
              explainContent={cuExplain}
            />
          </div>
        </div>

        <div className={mnDisplay ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              Mn (mcg) (max 12.5 mcg)
              <AIIcon callback={handleMnClick} />{" "}
            </span>
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
            <AIExplainWindow
              shouldDisplay={mnDisplay}
              explainContent={mnExplain}
            />
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={heparinDisplay ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              Heparin <AIIcon callback={handleHeparinClick} />{" "}
            </span>
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
            <AIExplainWindow
              shouldDisplay={heparinDisplay}
              explainContent={heparinExplain}
            />
          </div>
        </div>
      </div>
      Calorie Calculator -- TPN Calories
      <div className={styles.row}>
        <div className={glucDisplay ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              Glucose (Kcal) <AIIcon callback={handleGlucClick} />{" "}
            </span>
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
            <AIExplainWindow
              shouldDisplay={glucDisplay}
              explainContent={glucExplain}
            />
          </div>
        </div>

        <div className={ptnDisplay ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              Protein (Kcal)
              <AIIcon callback={handlePtnClick} />{" "}
            </span>
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
            <AIExplainWindow
              shouldDisplay={ptnDisplay}
              explainContent={ptnExplain}
            />
          </div>
        </div>

        <div className={ilResultDisplay ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              Inta Lipid Calories <AIIcon callback={handleIlResultClick} />{" "}
            </span>
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
            <AIExplainWindow
              shouldDisplay={ilResultDisplay}
              explainContent={ilResultExplain}
            />
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={totalDisplay ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              Total Calories from TPN
              <AIIcon callback={handleTotalClick} />{" "}
            </span>
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
            <AIExplainWindow
              shouldDisplay={totalDisplay}
              explainContent={totalExplain}
            />
          </div>
        </div>
      </div>
      <h1>Enteral feeds Total Calories </h1>
      <div className={styles.row}>
        <div className={kcal19Display ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              {" "}
              If getting 19 Kcal (Kcal/kg/day)
              <AIIcon callback={handleKcal19Click} />{" "}
            </span>
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
            <AIExplainWindow
              shouldDisplay={kcal19Display}
              explainContent={kcal19Explain}
            />
          </div>
        </div>

        <div className={kcal22Display ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              If getting 22 Kcal (Kcal/kg/day)
              <AIIcon callback={handleKcal22Click} />{" "}
            </span>
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
            <AIExplainWindow
              shouldDisplay={kcal22Display}
              explainContent={kcal22Explain}
            />
          </div>
        </div>

        <div className={kcal24Display ? styles.inputSolutionHighlight : ""}>
          <div className={styles.input}>
            <span className={styles.inputLabel}>
              If getting 24 Kcal (Kcal/kg/day)
              <AIIcon callback={handleKcal24Click} />{" "}
            </span>
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
            <AIExplainWindow
              shouldDisplay={kcal24Display}
              explainContent={kcal24Explain}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export function TPNCalc() {
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [dextrose, setDextrose] = useState(0);
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

  const [phosphatePercentage, setPhosphatePercentage] = useState(0);
  const [chloridePercentage, setChloridePercentage] = useState(0);
  const [acetatePercentage, setAcetatePercentage] = useState(0);
  const [totalSodiumNeeded, setTotalSodiumNeeded] = useState(0);

  const [PottasiumphosphatePercentage, setPottasiumPhosphatePercentage] =
    useState(0);
  const [PottasiumchloridePercentage, setPottasiumChloridePercentage] =
    useState(0);
  const [PottasiumacetatePercentage, setPottasiumAcetatePercentage] =
    useState(0);

  const [totalPotassiumPhosphateNeeded, setTotalPotassiumPhosphateNeeded] =
    useState(0);
  const [totalPotassiumChlorideNeeded, setTotalPotassiumChlorideNeeded] =
    useState(0);
  const [totalPotassiumAcetateNeeded, setTotalPotassiumAcetateNeeded] =
    useState(0);

  const [totalSodiumPhosphateNeeded, setTotalSodiumPhosphateNeeded] =
    useState(0);
  const [totalSodiumChlorideNeeded, setTotalSodiumChlorideNeeded] = useState(0);
  const [totalSodiumAcetateNeeded, setTotalSodiumAcetateNeeded] = useState(0);

  const [gluc, setGluc] = useState();
  const [ptn, setPtn] = useState();
  const [ILResult, setILResult] = useState();
  const [total, setTotal] = useState();

  const [Kcal_19, setKcal_19] = useState();
  const [Kcal_22, setKcal_22] = useState();
  const [Kcal_24, setKcal_24] = useState();

  const [CalciumGluconate, setCalciumGluconate] = useState();
  const [DextrosePercentage, setDextrosePercentage] = useState();

  const states = {
    dextrose: [dextrose, setDextrose],
    totalPotassiumPhosphateNeeded: [
      totalPotassiumPhosphateNeeded,
      setTotalPotassiumPhosphateNeeded,
    ],
    totalPotassiumChlorideNeeded: [
      totalPotassiumChlorideNeeded,
      setTotalPotassiumChlorideNeeded,
    ],
    totalPotassiumAcetateNeeded: [
      totalPotassiumAcetateNeeded,
      setTotalPotassiumAcetateNeeded,
    ],

    PottasiumphosphatePercentage: [
      PottasiumphosphatePercentage,
      setPottasiumPhosphatePercentage,
    ],
    PottasiumchloridePercentage: [
      PottasiumchloridePercentage,
      setPottasiumChloridePercentage,
    ],
    PottasiumacetatePercentage: [
      PottasiumacetatePercentage,
      setPottasiumAcetatePercentage,
    ],
    DextrosePercentage: [DextrosePercentage, setDextrosePercentage],
    CalciumGluconate: [CalciumGluconate, setCalciumGluconate],
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

    totalSodiumNeeded: [totalSodiumNeeded, setTotalSodiumNeeded],
    acetatePercentage: [acetatePercentage, setAcetatePercentage],
    chloridePercentage: [chloridePercentage, setChloridePercentage],
    phosphatePercentage: [phosphatePercentage, setPhosphatePercentage],
    totalSodiumPhosphateNeeded: [
      totalSodiumPhosphateNeeded,
      setTotalSodiumPhosphateNeeded,
    ],
    totalSodiumChlorideNeeded: [
      totalSodiumChlorideNeeded,
      setTotalSodiumChlorideNeeded,
    ],
    totalSodiumAcetateNeeded: [
      totalSodiumAcetateNeeded,
      setTotalSodiumAcetateNeeded,
    ],
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
    const newMessages = [{ role: "user", content: message } as ChatGPTMessage];
    setMessages([]);

    getContent(newMessages).then((result) => {
      debugger;
      console.log(result); // Handle the result of the asynchronous task
      setMessages([{ role: "assistant", content: result } as ChatGPTMessage]);
      setLoading(false);
    });

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
        To get results please{" "}
        <strong>fill out the orange colored fields</strong>
        <br />
        If results shown as <strong>NaN</strong> required input fields not
        provided
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
