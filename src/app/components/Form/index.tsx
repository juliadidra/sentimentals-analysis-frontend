"use client";

import { useState } from "react";
import { toast } from "sonner";

import SendUrl, { CommentaryProps } from "@/app/actions/post-send-url";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Form = () => {
  const [language, setLanguage] = useState<"en" | "pt">("en");
  const [mostNeg, setMostNeg] = useState<CommentaryProps | null>(null);
  const [mostPos, setMostPos] = useState<CommentaryProps | null>(null);
  const [media, setMedia] = useState<number | null>(null);
  console.log("🚀 ~ Form ~ media:", media)

  function isNeutral() {
    if(media !== null) {
      if(media < 0) 
        return media > -0.01
      else if(media > 0)
        return media < 0.01
    }
    return false;
  }

  return (
    <>
      <form
        action={async (form) => {
          form.append("lang", language);
          const { error, data } = await SendUrl(form);
          if (error !== null) toast(data);
          else {
            console.log(data);
            const initialResult = {
              minScoreEntry: data[0],
              maxScoreEntry: data[0],
              totalScore: 0,
            };

            const result = data.reduce((acc, entry) => {
              if (entry.score < acc.minScoreEntry.score) {
                acc.minScoreEntry = entry;
              }
              if (entry.score > acc.maxScoreEntry.score) {
                acc.maxScoreEntry = entry;
              }
              acc.totalScore += entry.score;
              return acc;
            }, initialResult);

            const averageScore = result.totalScore / data.length;

            setMostNeg(result.minScoreEntry);
            setMostPos(result.maxScoreEntry);
            setMedia(averageScore);
          }
        }}
        className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-500 rounded-md flex flex-col items-center gap-4 p-5 w-96"
      >
        <Tabs
          defaultValue="en"
          onValueChange={(v) => setLanguage(v as typeof language)}
        >
          <TabsList className="bg-zinc-200 dark:bg-zinc-800 mx-auto">
            <TabsTrigger value="en">Inglês</TabsTrigger>
            <TabsTrigger value="pt">Portugues</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="link" className="cursor-pointer">
            Link
          </Label>
          <Input
            id="link"
            name="link"
            placeholder="URL do vídeo"
            className="w-full"
          />
        </div>
        <SubmitButton text="Send to AI" className="w-full" />
      </form>
      
      <div className="flex flex-col md:flex-row items-center gap-5 max-h-72">
        {mostNeg &&(
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-500 rounded-md flex flex-col items-center gap-4 p-5 w-96 h-full overflow-y-auto">
            <h3 className="text-start w-full text-lg dark:text-red-300 text-red-600">Comentário mais negativo</h3>
            <p className="text-justify dark:text-zinc-300 text-zinc-700">{mostNeg.commentary}</p>
            <p className="w-full dark:text-red-300 text-red-600 mt-auto">score: {mostNeg.score}</p>
          </div>
        )}
        {mostPos && (
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-500 rounded-md flex flex-col items-center gap-4 p-5 w-96 h-full overflow-y-auto">
            <h3 className="text-start w-full text-lg dark:text-green-300 text-green-600">Comentário mais positivo</h3>
            <p className="text-justify dark:text-zinc-300 text-zinc-700">{mostPos.commentary}</p>
            <p className="w-full dark:text-green-300 text-green-600 mt-auto">score: {mostPos.score}</p>
          </div>
        )}
      </div>
      {media !== null && (
        <div className="flex flex-col gap-1 items-center">
          <div className="flex items-center gap-2">
            <p>Média dos comentários: </p>
            <p
              data-media={isNeutral() ? "neutra" : media > 0 ? "positiva" : "negativa"}
              className="data-[media=positiva]:text-green-600 data-[media=positiva]:bg-green-200 data-[media=neutra]:text-zinc-600 data-[media=neutra]:bg-zinc-200 data-[media=negativa]:text-red-600 data-[media=negativa]:bg-red-200 px-4 py-1 rounded-full"
            >
              {isNeutral() ? "Neutra" : media > 0 ? "Positiva" : "Negativa"}
            </p>
          </div>

          {(media < -0.01 || media > 0.01) && (
            <p>
              score: {" "}
              <span
                data-media={media > 0 ? "positiva" : "negativa"}
                className="data-[media=positiva]:text-green-600 data-[media=neutra]:text-zinc-600 data-[media=negativa]:text-red-500 font-semibold"
              >
                {media.toFixed(5)}
              </span>
            </p>
          )}
          
        </div>
      )}
    </>
  );
};

export default Form;
