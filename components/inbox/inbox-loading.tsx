import { Spinner } from "../spinner";

export const LoadingInbox = () => {
  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-6">
      <Spinner />
      <div className="space-y-2 text-center">
        <h4 className="text-xl font-semibold">Please wait...</h4>
        <p className="text-gray-500">
          We&apos;are fetching your latest messages.
        </p>
      </div>
    </div>
  );
};
