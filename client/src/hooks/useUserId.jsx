import { useSelector } from "react-redux";

function useUserId() {
  const userId = useSelector((state) => state.auth.id);
  return userId;
}

export default useUserId;
