import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function QueryDevtools() {
  return process.env.NODE_ENV === "development" ? <ReactQueryDevtools /> : null;
}

export default QueryDevtools;
