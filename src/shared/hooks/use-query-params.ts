import { useLocation } from "react-router-dom";
import queryString from "query-string";

interface IParamsType {
    id?: any;
}

export function useQueryParams(): IParamsType {
    const location = useLocation();
    const parsedHash: IParamsType = queryString.parse(location.search);
    return parsedHash;
}
