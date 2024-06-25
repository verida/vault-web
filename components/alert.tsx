import { Warning } from "./icons/warning";

interface AlertProps {
  text: string;
}

const Alert: React.FC<AlertProps> = (props) => {
  const { text } = props;
  return (
    <div className="rounded border-l-2 border-yellow-500 bg-[#F6F7F9] p-2">
      <div className="flex items-center gap-2">
        <Warning />
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};

export default Alert;
