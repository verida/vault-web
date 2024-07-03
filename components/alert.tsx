import { Warning } from "./icons/warning";
import { Typography } from "./typography";

interface AlertProps {
  text: string;
}

const Alert: React.FC<AlertProps> = (props) => {
  const { text } = props;
  return (
    <div className="rounded border-l-2 border-yellow-500 bg-[#F6F7F9] p-2">
      <div className="flex items-center gap-2">
        <Warning />
        <Typography
          variant="base-s-semibold"
          className="text-secondary-foreground"
        >
          {text}
        </Typography>
      </div>
    </div>
  );
};

export default Alert;
