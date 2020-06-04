import { useReducer, useRef, useCallback, useEffect } from "react";

interface ServiceState<T> {
  loading: boolean;
  data: T | null;
  error: Error | null;
}

type ServiceAction<T> =
  | {
      type: "request_started";
    }
  | {
      type: "request_succeeded";
      data: T;
    }
  | {
      type: "request_failed";
      error: Error;
    }
  | {
      type: "service_reset";
    };

type Service<T, U extends any[]> = (...args: U) => Promise<T>;

const serviceReducer = <T>(
  state: ServiceState<T>,
  action: ServiceAction<T>,
): ServiceState<T> => {
  switch (action.type) {
    case "request_started": {
      return { ...state, loading: true, error: null };
    }
    case "request_succeeded": {
      return { loading: false, data: action.data, error: null };
    }
    case "request_failed": {
      return { ...state, loading: false, error: action.error };
    }
    case "service_reset": {
      return { loading: false, error: null, data: null };
    }
  }
};

export const useService = <T, U extends any[]>(service: Service<T, U>) => {
  const lastRequest = useRef<Promise<T>>();
  const [state, dispatch] = useReducer<
    (state: ServiceState<T>, action: ServiceAction<T>) => ServiceState<T>
  >(serviceReducer, {
    loading: false,
    data: null,
    error: null,
  });

  const reset = () => dispatch({ type: "service_reset" });

  const call = useCallback(
    async (...args: Parameters<typeof service>) => {
      let request: Promise<T> | null = null;

      try {
        dispatch({ type: "request_started" });
        request = service(...args);
        lastRequest.current = request;
        const data = await request;
        if (request === lastRequest.current) {
          dispatch({ type: "request_succeeded", data });
        }
      } catch (error) {
        if (request === lastRequest.current) {
          dispatch({ type: "request_failed", error });
        }
      }
    },
    [service],
  );

  useEffect(() => {
    // invalidate the last made request when the component unmounts
    return () => {
      lastRequest.current = undefined;
    };
  }, []);

  return { ...state, call, reset };
};
