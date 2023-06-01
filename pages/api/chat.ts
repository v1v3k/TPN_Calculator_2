
import { NextApiRequest, NextApiResponse } from "next";

type Message = {
  content: string;
  sender: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
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

      for (let i = 0; i < req.body.messages.length; i++) {
        const message = {
          role: req.body.messages[i].role,
          content: req.body.messages[i].content,
        };
        API_messages.push(message);
      }
      
      const result = await fetch(url, {
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

      console.log(result);

      const data = await result.json();

      console.log(result);

      console.log(data.choices[0].message.content);

      res.statusCode = 200;
      res.json(data.choices[0].message.content);
    } catch (error) {
      res.status(400).json({ error: "Bad Request" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

/*
Thank you for providing me with the necessary information. Based on the inputs you've provided, here's how I calculate Total Parenteral Nutrition (TPN):

First, I calculate the patient's caloric needs using the following equation:

Caloric needs = (25 x BW) + (TF x 10)

Where BW is the patient's body weight in kilograms, and TF is the patient's temperature in degrees Celsius.

Using the inputs provided, the patient's caloric needs are:

Caloric needs = (25 x 2.5) + (100 x 10) = 625 + 1000 = 1625 calories/day

Next, I calculate the patient's protein needs using the following equation:

Protein needs = AA x BW

Where AA is the patient's desired daily protein intake in grams per kilogram of body weight.

Using the inputs provided, the patient's protein needs are:

Protein needs = 2 x 2.5 = 5 g/kg/day

Next, I calculate the patient's fluid needs using the following equation:

Fluid needs = 100 x IL

Where IL is the patient's ideal body weight in kilograms.

Using the inputs provided, the patient's fluid needs are:

Fluid needs = 100 x 3 = 300 ml/kg/day

Finally, I calculate the patient's micronutrient needs using the following equations:

Zinc needs = ZN x BW / 3.4

Copper needs = CU x BW / 0.5

Manganese needs = MN x BW / 4

Where ZN, CU, and MN are the patient's desired daily intake in micrograms per kilogram of body weight.

Using the inputs provided, the patient's micronutrient needs are:

Zinc needs = 400 x 2.5 / 3.4 = 294.12 micrograms per day

Copper needs = 20 x 2.5 / 0.5 = 100 micrograms per day

Manganese needs = 1 x 2.5 / 4 = 0.625 milligrams per day

These are the basic calculations that go into calculating TPN. However, it is important to note that TPN is typically customized to each individual patient based on their specific medical needs and nutritional requirements. It is always important to consult with a qualified healthcare professional before starting TPN.
*/


/*

Input Format

{"BW":"2.5","TF":"100","D10":"2.2.300","AA":"2","IL":"3","ZN":"400","CU":"20","MN":"1"}
*/



/*
Another Sample
AI

Thank you for providing the necessary information. Based on the inputs you've provided, here's how I calculate Total Parenteral Nutrition (TPN):

First, I calculate the patient's caloric needs using the following equation:

Caloric needs = (25 x BW) + (TF x 10)

Where BW is the patient's body weight in kilograms, and TF is the patient's temperature in degrees Celsius.

Using the inputs provided, the patient's caloric needs are:

Caloric needs = (25 x 2.5) + (100 x 10) = 625 + 1000 = 1625 calories/day

Next, I calculate the patient's protein needs using the following equation:

Protein needs = AA x BW

Where AA is the patient's desired daily protein intake in grams per kilogram of body weight.

Using the inputs provided, the patient's protein needs are:

Protein needs = 2 x 2.5 = 5 g/kg/day

Next, I calculate the patient's fluid needs using the following equation:

Fluid needs = 100 x IL

Where IL is the patient's ideal body weight in kilograms.

Using the inputs provided, the patient's fluid needs are:

Fluid needs = 100 x 3 = 300 ml/kg/day

Finally, I calculate the patient's micronutrient needs using the following equations:

Zinc needs = ZN x BW / 3.4

Copper needs = CU x BW / 0.5

Manganese needs = MN x BW / 4

Where ZN, CU, and MN are the patient's desired daily intake in micrograms per kilogram of body weight.

Using the inputs provided, the patient's micronutrient needs are:

Zinc needs = 400 x 2.5 / 3.4 = 294.12 micrograms per day

Copper needs = 20 x 2.5 / 0.5 = 100 micrograms per day

Manganese needs = 1 x 2.5 / 4 = 0.625 milligrams per day

To calculate the TPN solution, we need to use the patient's D10 solution, which contains 10% dextrose. Using the inputs provided, the D10 solution contains 2.2 grams of dextrose per 100ml of solution and the patient needs 300 ml/kg/day of fluid.

Therefore, the patient needs (300 ml/kg/day) x (2.2 g dextrose/100 ml solution) = 6.6 g of dextrose/kg/day.

To calculate the TPN solution, we will assume a 3-in-1 bag that contains 10% dextrose, amino acids, and lipid emulsion.

Based on the calculations above, the patient needs:

- 1625 calories/day
- 5 g of protein/kg/day
- 300 ml/kg/day of fluid
- 294.12 micrograms of zinc/day
- 100 micrograms of copper/day
- 0.625 milligrams of manganese/day
- 6.6 g of dextrose/kg/day

Using standard TPN formulas and your hospital's protocols for compounding TPN solutions, you can create an appropriate TPN solution for the patient. However, it is important to note that TPN is typically customized to each individual patient based on their specific medical needs and nutritional requirements. It is always important to consult with a qualified healthcare professional before starting TPN.
*/