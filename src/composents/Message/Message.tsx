import messageStyles from "./Message.module.css";

interface MessageProps {
  text: string;
}

const Message = ({ text }: MessageProps) => {
  return (
    <p className={messageStyles.message} role="alert">
      {text}
    </p>
  );
};

export default Message;