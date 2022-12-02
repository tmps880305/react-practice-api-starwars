import React, {useState, useCallback} from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (httpRequestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(httpRequestConfig.url, {
                method: httpRequestConfig.method ? httpRequestConfig.method : 'GET',
                headers: httpRequestConfig.headers ? httpRequestConfig.headers : {},
                body: httpRequestConfig.body ? JSON.stringify(httpRequestConfig.body) : null
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            applyData(data);

        } catch (error) {
            setError(error.message || 'Something went wrong.');
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest

        // Same as:
        // isLoading: isLoading,
        // error: error,
        // sendRequest: sendRequest
    }
};

export default useHttp;
