
// Définir les types comme vous l'avez fait
export const UserProps =  {
  name: "",
  username: "",
  avatar: "",
  online: false,
};

export const MessageProps = {
  id: "",
  content: "",
  timestamp: "",
  unread : false,
  sender: UserProps | 'You',
  attachment : {
     fileName : "",
    type : "",
    size : "",
  },
    
};

export const ChatProps = {
  id: "",
  sender: UserProps,
  messages: MessageProps ,
};

