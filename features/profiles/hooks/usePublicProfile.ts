import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

import { getPublicProfile } from "..";

export const usePublicProfile = (did: string, contextName?: string) => {
  const fetchPublicProfile = useCallback(async () => {
    const profile = await getPublicProfile(did, contextName);
    return profile;
  }, [did, contextName]);

  const {
    data: profile,
    isPending: isProfilePending,
    isError: isProfileError,
  } = useQuery({
    queryKey: ["profile", did, contextName],
    queryFn: fetchPublicProfile,
  });

  return { profile, isProfilePending, isProfileError };
};
