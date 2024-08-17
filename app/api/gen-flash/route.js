import { processText } from "./text-cleanser";
import { NextResponse } from "next/server";

export async function POST(req){

    try{

        

        const body = await req.json()

        const res = processText(body.text);
        // console.log(res,"Body");

        const words = res.filteredWords;

        const prompt = words.join(" ");

        const flashcards = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${process.env.OPEN_ROUTER_KEY}`,
             
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "model": "meta-llama/llama-3.1-8b-instruct:free",
              "messages": [
                {"role": "user", "content": prompt},
                {"role": "system", "content": "Generate flashcards in JSON format for the content provided by user. DOnt say any intro or conclusion just return me the JSON object strictly. Include both logical and definition based questions"},
              ],
            })
          });

          const flashcardsRes = await flashcards.json();

        //   const data = await flashcardsRes.choices[0].message.content.json();
        // console.log(data);
        return NextResponse.json(flashcardsRes.choices[0].message.content);
    }
    catch(e){
        return NextResponse.json({error:e.message,status:500});

    }





}