import { useEffect, useRef, useState } from "react";
import { ChatMessageType } from "application/components/ChatMessage";
import { AppSettings } from "application/state";
import { useAtom } from "jotai";
import { Howl } from "howler";

export default function useType(history: Array<ChatMessageType>) {
  const [output, setOutput] = useState<Array<string>>([]);
  const [speed] = useAtom(AppSettings.delayMsMultiplier);

  const audioRef = useRef<Howl>(null);

  const fire = () => {
    const lastMessage = history.at(-1);
    const words = lastMessage.message.split(" ").filter((x) => x.length);

    let index = 0;
    let delay = 50;
    let delayCount = 0;
    const iteration = () => {
      setOutput((o) => [...o, words[index]]);
      if (index < words.length) {
        delayCount += words[index].length * speed;
        if (delayCount > delay) {
          audioRef.current.play();
          delayCount = 0;
        }

        setTimeout(() => {
          index++;
          iteration();
        }, words[index].length * speed);
      }
    };
    iteration();
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Howl({
        src: "/beep.mp3",
        volume: 0.25,
      });
    }
    if (history.length) {
      setOutput([]);
      fire();
    }
  }, [history]);

  return output;
}
