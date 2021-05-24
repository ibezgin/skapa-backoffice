import { useEffect } from "react";

export function useChangeFormik<T>(values: T, onChange: (values?: T) => void) {
    useEffect(() => {
        onChange(values);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values]);

    return null;
}
