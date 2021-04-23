import useSelector from "../hooks/UseSelector";

export const useStateSelector = () => {
  return useSelector((state) => {
    return state;
  });
};
