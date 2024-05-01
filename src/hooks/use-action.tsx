import * as React from "react";

interface ActionController {
  execute: any;
  loading: boolean;
}

export function useAction(): ActionController {
  const [loading, setLoading] = React.useState<boolean>(false);
  const execute: any = async (action: any, args: any[]) => {
    setLoading(true);
    let response;
    if (args !== undefined) {
      response = await action(...args);
    } else {
      response = await action();
    }
    setLoading(false);
    return response;
  };

  return { loading, execute };
}
