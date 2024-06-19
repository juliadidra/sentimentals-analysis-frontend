"use server";

import { apiFetcher } from "@/lib/apiFetcher";

const youtubeRegex =
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/(watch\?v=|playlist\?list=|channel\/|user\/|.+\/.+)?([^&\/\s]+)/;

function isYouTubeLink(url: string): boolean {
  return youtubeRegex.test(url);
}

export interface CommentaryProps {
  commentary: string;
  score: number;
}

export default async function SendUrl(form: FormData) {
  const url = form.get("link") as string;
  const lang = form.get("lang") as string;

  if(isYouTubeLink(url)) {
    const videoId = url.split("v=")[1];

    try {
      const { data } = await apiFetcher.post<CommentaryProps[]>("/analisar", {
        codigo: videoId,
        lang: lang
      });

      if(data.error) {
        throw new Error(data.error);
      }
  
      return {
        error: null,
        data: data
      }
    } catch (error) {
      console.log(error)

      return {
        error: 400,
        data: "erro desconhecido"
      };
    }
  }

  return {
    error: 400,
    data: "Link inválido"
  };
}
