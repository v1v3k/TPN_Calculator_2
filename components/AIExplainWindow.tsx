import React from 'react';

export const AIExplainWindow = (props: any) => {
    return (
        <div>
            {
                props.shouldDisplay && <div dangerouslySetInnerHTML={{ __html: props.explainContent }} />
            }
        </div>
    )
}



export async function getContent(newMessages: any) {
    try {
        const url = "https://api.openai.com/v1/chat/completions";

        let API_messages = [];

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
                    Authorization: "Bearer <Open AI API Key>",
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
        const data = await result.json();

        console.log(data.choices[0].message.content);

        return (data.choices[0].message.content);
    } catch (error) {
        console.log(error);
    }
}