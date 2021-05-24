import { useMemo } from "react";

export function useStyleUtils() {
    const cursorPointer = useMemo(() => ({ cursor: "pointer" }), []);

    return {
        cursorPointer,
    };
}
