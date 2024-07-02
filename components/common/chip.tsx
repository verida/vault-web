import Image from "next/image";
import { Typography } from "../typography";
import { Close } from "../icons/close";

interface ChipProps {
  id: string;
  icon: string;
  text: string;
  onClose?: (id: string) => void;
}

export const Chip: React.FC<ChipProps> = (props) => {
  const { id, icon, text, onClose } = props;
  return (
    <div className="flex items-center gap-2 rounded-full bg-primary-button p-1">
      <Image
        src={icon}
        alt=""
        width="24"
        height="24"
        className="rounded-full bg-primary"
      />
      <Typography variant="base-s-regular" className="text-primary">
        {text}
      </Typography>
      <Close
        className="mr-1 h-4 w-4 cursor-pointer text-primary"
        onClick={() => onClose && onClose(id)}
      />
    </div>
  );
};
