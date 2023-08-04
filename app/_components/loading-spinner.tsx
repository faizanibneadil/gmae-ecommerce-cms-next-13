import { Loader } from "lucide-react";
import { FC, memo } from "react";

interface Props {
  className?: string;
}

const Spin: FC<Props> = ({ className }) => (
  <Loader className={`${className} w-2 h-2 animate-spin`} />
);

export default memo(Spin);
