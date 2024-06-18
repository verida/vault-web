import { Warning } from "./icons/warning";

interface AlertProps {
  text: string;
}

const Alert: React.FC<AlertProps> = (props) => {
  const { text } = props;
  return (
    <div className='bg-[#F6F7F9] rounded border-l-2 border-yellow-500 p-2 mb-3'>
      <div className='flex gap-2 items-center'>
        <Warning />
        <p className='text-sm'>{text}</p>
      </div>
    </div>
  );
};

export default Alert;
