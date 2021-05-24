export function useHasWindow() {
    return typeof window !== "undefined" ? true : false;
}
