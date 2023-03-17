import { View, rcss, Text, tokens, LoadingIcon } from "node_modules";
import { MarkdownWrapper } from "./MarkdownWrapper";
import { Howl } from "howler";
import { useEffect } from "react";

export interface ChatMessageType {
  username: string;
  userImage: string;
  message: string;
  isChatbot: boolean;
  loading?: boolean;
}

export const ChatMessage = ({
  isChatbot,
  userImage,
  username,
  message,
  loading,
}: ChatMessageType) => {
  return (
    <View
      css={[
        rcss.flex.column,
        rcss.colWithGap(8),
        rcss.p(8),
        {
          background: isChatbot ? tokens.backgroundHigher : "transparent",
          borderTop: isChatbot ? "solid 1px " + tokens.backgroundRoot : "none",
          borderBottom: isChatbot
            ? "solid 1px " + tokens.backgroundRoot
            : "none",
        },
      ]}
    >
      <View css={[rcss.flex.row, rcss.rowWithGap(8), rcss.align.center]}>
        <img
          src={userImage}
          width={32}
          height={32}
          alt={username}
          style={{
            borderRadius: "50%",
            border: `solid 1px ${tokens.backgroundRoot}`,
            overflow: "hidden",
          }}
        />
        <Text>{username}</Text>
      </View>
      {loading ? (
        <View css={[rcss.flex.row, rcss.rowWithGap(8)]}>
          <LoadingIcon />
          <Text>
            <MarkdownWrapper>{message}</MarkdownWrapper>
          </Text>
        </View>
      ) : (
        <Text multiline>
          <MarkdownWrapper>{message}</MarkdownWrapper>
        </Text>
      )}
    </View>
  );
};
