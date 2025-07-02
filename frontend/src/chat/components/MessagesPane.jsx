import * as React from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import AvatarWithStatus from "./AvatarWithStatus";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import MessagesPaneHeader from "./MessagesPaneHeader";
import { useState, useEffect } from "react";

export default function MessagesPane({prjo,id}) {
  const prj  = prjo;
  const prjid=id
  console.log(prjid)
  const [prjMessage, setprjMessages] = useState(prj.messages);

  console.log(prjMessage)

  return (
    <Sheet
      sx={{
        height: { xs: "calc(100dvh - var(--Header-height))", lg: "100dvh" },
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.level1",
      }}>
      <MessagesPaneHeader nomprj={prj.titre} />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: "scroll",
          flexDirection: "column-reverse",
        }}>
        <Stack spacing={2} justifyContent="flex-end">
          {prjMessage.map((message, index) => {
            const isYou = message.sender.first_name === "you";
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? "row-reverse" : "row"}>
                {message.sender.first_name !== "you" && (
                  <AvatarWithStatus />
                )}
                <ChatBubble
                  variant={isYou ? "sent" : "received"}
                  {...message}
                  timestamp={message.date}
                />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <MessageInput id={prjid} />
    </Sheet>
  );
}
