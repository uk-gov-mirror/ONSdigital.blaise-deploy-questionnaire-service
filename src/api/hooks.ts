import {useEffect, useState} from "react";

export const useApi = (apiFunction: () => Promise<any>, change: any): [isLoading: boolean, data: any, error: string | null] => {
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        apiFunction()
            .then((r: any) => {
                setData(r);
            })
            .catch((error: string) => setError(error))
            .finally(() => setIsLoading(false));
    }, [change]);

    return [isLoading, data, error];
};
