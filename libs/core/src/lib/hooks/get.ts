import { useEffect, useState } from 'react';
import { UseCase } from '../..';

export function useGet<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  usecase: UseCase<T, any>,
  params,
  initialState: T
): [T, boolean] {
  const [data, setData] = useState<T>(initialState);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await usecase.call(params);
        setData(result);
      } catch (e) {
        setError(true);
      }
    };
    fetchData();
  }, []);

  return [data, error];
}
