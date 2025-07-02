import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import { IconButton, Stack } from '@mui/joy';

import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded';
import StrikethroughSRoundedIcon from '@mui/icons-material/StrikethroughSRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useState } from 'react';
import axios from 'axios'


export default function MessageInput(id) {
  const idpr=id.id
  const [message,setMessage]=useState()
  const typesender = "you"
  console.log(idpr)

  const handleSubmit = async () => {
    // Récupérez le token depuis le local storage
    const token = localStorage.getItem("token");
  
    console.log(idpr)
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/addmessage/",
        {
          groupe_id: idpr.id,
          content: message,
        },
        {
          headers: {
            "Content-Type": "application/json", // Changez le type de contenu en application/json
            Authorization: `token ${token}`,
          },
        }
      );
      console.log("Data sent successfully:", response.data);
      
      // Rechargez la page après l'envoi réussi du message
      window.location.reload();
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  return (
    <Box sx={{ px: 2, pb: 3 }}>
      <FormControl>
        <Textarea
          placeholder="Type something here…"
          aria-label="Message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
          minRows={3}
          maxRows={10}
          color='secondary'
          endDecorator={
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="right"
              flexGrow={1}
              sx={{
                py: 1,
                pr: 1,
                borderTop: '1px solid',
  
              }}>
              <Button
                size="large"
                color="secondary"
                sx={{ alignSelf: 'center', borderRadius: 'sm' , color:"#9c27b0"}}
                endDecorator={<SendRoundedIcon />}
                onClick={handleSubmit}
              >
                Send
              </Button>
            </Stack>
          }
        />
      </FormControl>
    </Box>
  );
}
