"use client";

import { usePathname } from "next/navigation";

const useIsActiveRoute = (route: string): boolean => {
  const pathname = usePathname();
  return pathname === route;
};

export default useIsActiveRoute;
