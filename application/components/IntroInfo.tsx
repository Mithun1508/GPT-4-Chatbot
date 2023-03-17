import {
  View,
  Text,
  rcss,
  tokens,
  Button,
  InfoIcon,
  TwitterIcon,
  GhostwriterIcon,
  SendIcon,
} from "node_modules";
import { tabAtom, messageAtom } from "application/state";
import { useAtom } from "jotai";

const defaultOptions = [
  "Describe AI in a nutshell",
  "What are some capabilities of AI?",
];

const IntroInfo = ({ submit }: { submit: (v: string) => void }) => {
  const [, setTab] = useAtom(tabAtom);
  const [, setMessage] = useAtom(messageAtom);

  return (
    <View css={[rcss.p(16), rcss.colWithGap(8), rcss.flex.column]}>
      <View css={[rcss.flex.row, rcss.rowWithGap(16)]}>
        <img
          src="/icon.png"
          style={{
            borderRadius: "50%",
            border: `solid 1px ${tokens.backgroundHigher}`,
          }}
          width="64"
          height="64"
        />
      </View>
      <Text variant="subheadDefault">GPT-4</Text>
      <Text color="dimmer" multiline>
        This is the beginning of your direct message history with{" "}
        <strong>GPT-4</strong>
      </Text>
      <hr />
      {defaultOptions.map((option) => (
        <View css={[rcss.flex.row]} key={option}>
          <Button
            onClick={() => {
              setMessage(option);
              submit(option);
            }}
            text={`"${option}"`}
            iconLeft={<SendIcon />}
          />
        </View>
      ))}
    </View>
  );
};

export default IntroInfo;
