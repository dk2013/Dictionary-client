import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "../store";

// Export a hook that uses our RootState type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
