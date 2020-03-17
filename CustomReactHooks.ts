import { useEffect, useState, useCallback } from 'react';

export const useRestApi = (doAsyncApiCall, ...paramsToWatch) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const _invokeApi = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await doAsyncApiCall();
      setResponse(result);
    } catch (error) {
      console.debug('useRestApi failed', paramsToWatch, error);
      setIsError(true);
    }
    setIsLoading(false);
  }, [...paramsToWatch]);

  useEffect(() => {
    _invokeApi();
  }, [_invokeApi]);

  return [{ isLoading, isError, response }, _invokeApi];
};

export const useDebouncedFunc = (doCallback, delayMs = 3000) => {
  const [timer, setTimer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const _doTask = (keyword) => {
    clearTimeout(timer);
    setIsError(false);
    setIsLoading(true);
    const newTimer = setTimeout(async () => {
      try {
        await doCallback(keyword);
      } catch (e) {
        console.debug('useDebouncedFunc failed', e);
        setIsError(true);
      }
      setIsLoading(false);
    }, delayMs);
    setTimer(newTimer);
  };

  return [{ isLoading, isError }, _doTask];
};
