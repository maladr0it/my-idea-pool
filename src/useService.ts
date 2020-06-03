import { useReducer, useRef, useCallback } from "react";

interface ServiceState<T> {
  status: "initial" | "loading" | "error" | "success";
  data: T | null;
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
      return { ...state, status: "loading" };
    }
    case "request_succeeded": {
      return { status: "success", data: action.data };
    }
    case "request_failed": {
      return { ...state, status: "error" };
    }
    case "service_reset": {
      return { status: "initial", data: null };
    }
  }
};

export const useService = <T, U extends any[]>(service: Service<T, U>) => {
  const lastRequest = useRef<Promise<T>>();
  const [state, dispatch] = useReducer<
    (state: ServiceState<T>, action: ServiceAction<T>) => ServiceState<T>
  >(serviceReducer, {
    status: "initial",
    data: null,
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
      } catch {
        if (request === lastRequest.current) {
          dispatch({ type: "request_failed" });
        }
      }
    },
    [service],
  );

  return { ...state, call, reset };
};

// useEffect(() => {
//   let cancelled = false;

//   const callService = async () => {
//     try {
//       dispatch({ type: "request_started" });
//       const data = await service();
//       if (!cancelled) {
//         dispatch({ type: "request_succeeded", data });
//       }
//     } catch {
//       if (!cancelled) {
//         dispatch({ type: "request_failed" });
//       }
//     }
//   };

//   callService();

//   return () => {
//     cancelled = true;
//   };
// }, [service]);
