import React, { FC, PropsWithChildren, useEffect, useState } from "react";

const ClientOnly: FC<PropsWithChildren> = function ClientOnly({ children }) {
  /** this is probably a super inefficient way of doing this **/
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return children;
};

export default ClientOnly;
