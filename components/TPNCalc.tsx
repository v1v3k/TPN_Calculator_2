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
      " ",
  },
];



const InputForm = ({ states, input, setInput, sendMessage }: any) => {
 
  states.ilVolume[1]( Math.abs(states.il[0]*states.birthWeight[0]*5).toFixed(2))
  states.tpnVolume[1](states.birthWeight[0]*states.tfRatio[0] - states.po[0] - states.ilVolume[0]); // 7
  states.ilRate[1](states.ilVolume[0]/20)
  states.magSulfate[1](states.birthWeight[0]/4)
  // (C21/2)*0.75
  const c21 = ((states.calcium[0]*states.birthWeight[0])/200)
  const c25 = states.totalSodium[0]*states.birthWeight[0]
  states.sodiumPhosphate[1]((c21/2)*0.75)
  states.sodiumChloride[1](c25-c21/2)
  // C25-C21/2
  states.potassiumChloride[1](states.birthWeight[0]*states.totalPotassium[0])
  states.zn[1](400*states.birthWeight[0])
  states.cu[1](20*states.birthWeight[0])
  states.mn[1](1*states.birthWeight[0])
  states.heparin[1](states.tpnVolume[0]/2)

  states.gluc[1]((states.tpnVolume[0]/10)*3.4)

  const c13 = states.birthWeight[0] * states.aa[0]
  states.ptn[1](c13*4);
  // B15*B2*9
  states.ILResult[1](states.birthWeight[0]*states.il[0]*9)
  states.total[1](states.gluc[0]+states.ptn[0]+states.ILResult[0])


  states.po[0]
  states.birthWeight[0] 

  states.Kcal_19[1](((states.po[0]*19)/30)/states.birthWeight[0] )
  states.Kcal_22[1](((states.po[0]*22)/30)/states.birthWeight[0] )
  states.Kcal_24[1](((states.po[0]*24)/30)/states.birthWeight[0] )


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

        <div className={styles.input}>
          <span className={styles.inputLabel} >Total TPN volume infused in 24 hours</span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.tpnVolume[0]}

            onChange={(e) => {
              
            }}
          />
        </div>


        <div className={styles.input}>
          <span className={styles.inputLabel} >TPN fluid rate </span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={(states.tpnVolume[0])/24}

            // onChange={(e) => {
            //   //states.tpnFluidRate[1](states.tpnVolume[0]/24);
            // }}
          />
        </div>

      </div>

      <div className={styles.row}>

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

        <div className={styles.input}>
          <span className={styles.inputLabel} >IL volume </span>
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
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.input}>
          <span className={styles.inputLabel} >IL rate over 20 hours is</span>
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
        </div>

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

        <div className={styles.input}>
          <span className={styles.inputLabel} >Mag sulfate </span>
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
        </div>
      </div>

      <div className={styles.row}>
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

        <div className={styles.input}>
          <span className={styles.inputLabel} >Sodium Phosphate</span>
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
        </div>

        <div className={styles.input}>
          <span className={styles.inputLabel} >Sodium chloride or acetate</span>
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
        </div>
      </div>


      <div className={styles.row}>

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

        <div className={styles.input}>
          <span className={styles.inputLabel} >Potassium Cholride/Acetate</span>
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
        </div>
      </div>



      <div className={styles.row}>
        <div className={styles.input}>
          <span className={styles.inputLabel} >MCI</span>
          <input
            type="text"
            aria-label="chat input"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
            value={states.mci[0]}

            onChange={(e) => {
              states.mci[1](e.target.value);
            }}

            readOnly
          />
        </div>

        <div className={styles.input}>
          <span className={styles.inputLabel} >Zn (max dose is 750)</span>
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
        </div>

        <div className={styles.input}>
          <span className={styles.inputLabel} >Cu</span>
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
        </div>
      </div>


      <div className={styles.row}>
        <div className={styles.input}>
          <span className={styles.inputLabel} >Mn</span>
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
        </div>

        <div className={styles.input}>
          <span className={styles.inputLabel} >If you are adding heparin, dose is :</span>
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
        </div>

      </div>

      Calorie Calculator

      TPN Calories
      <div className={styles.row}>
        <div className={styles.input}>
          <span className={styles.inputLabel} >Gluc</span>
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
        </div>

        <div className={styles.input}>
          <span className={styles.inputLabel} >Ptn</span>
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
        </div>

        <div className={styles.input}>
          <span className={styles.inputLabel} >IL</span>
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
        </div>

        <div className={styles.input}>
          <span className={styles.inputLabel} >Total</span>
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
        </div>
      </div>

      Enteral feeds
      <div className={styles.row}>

        <div className={styles.input}>
          <span className={styles.inputLabel} > 19 Kcal </span>
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
        </div>

        <div className={styles.input}>
          <span className={styles.inputLabel} >22 Kcal</span>
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
        </div>

        <div className={styles.input}>
          <span className={styles.inputLabel} >24 Kcal</span>
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

        </div>


      </div>

      {/* <div className={styles.row}>
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
      </div> */}
    </div>
  );
}

export function TPNCalc() {
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [birthWeight, setBirthWeight] = useState("");
  const [tfRatio, setTfRatio] = useState("");
  const [tpnVolume, setTpnVolume] = useState("");
  const [tpnFluidRate, setTpnFluidRate] = useState("");
  const [po, setPo] = useState("");
  const [aa, setAa] = useState("");
  const [il, setIl] = useState("");
  const [ilVolume, setIlVolume] = useState("");
  const [ilRate, setIlRate] = useState("");
  const [calcium, setCalcium] = useState("");
  const [magSulfate, setMagSulfate] = useState("");
  const [totalSodium, setTotalSodium] = useState("");
  const [sodiumPhosphate, setSodiumPhosphate] = useState("");
  const [sodiumChloride, setSodiumChloride] = useState("");
  const [totalPotassium, setTotalPotassium] = useState("");
  const [potassiumChloride, setPotassiumChloride] = useState("");
  const [mci, setMci] = useState(3.25);
  const [zn, setZn] = useState("");
  const [cu, setCu] = useState("");
  const [mn, setMn] = useState("");
  const [heparin, setHeparin] = useState("");

  const [gluc, setGluc] = useState("");
  const [ptn, setPtn] = useState("");
  const [ILResult, setILResult] = useState("");
  const [total, setTotal] = useState("");

  const [Kcal_19, setKcal_19] = useState("");
  const [Kcal_22, setKcal_22] = useState("");
  const [Kcal_24, setKcal_24] = useState("");

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
