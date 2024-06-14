import { Spinner } from "../spinner";

export const LoadingInbox = () => {
  return (
    <div className='flex-grow flex flex-col justify-center items-center gap-6'>
      <Spinner />
      <div className='text-center space-y-2'>
        <h4 className='text-xl font-semibold'>Please wait...</h4>
        <p className='text-gray-500'>We&apos;are fetching your latest messages.</p>
      </div>
    </div>
  );
};
