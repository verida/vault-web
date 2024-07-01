import { Spinner } from "../spinner";
import { Typography } from "../typography";

export const LoadingInbox = () => {
  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-6">
      <Spinner />
      <div className="space-y-2 text-center">
        <Typography variant="heading-4">Please wait...</Typography>
        <Typography
          variant="base-regular"
          className="text-secondary-foreground"
        >
          We&apos;are fetching your latest messages.
        </Typography>
      </div>
    </div>
  );
};
