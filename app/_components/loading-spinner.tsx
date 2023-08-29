import { Loader } from "lucide-react";
import { FC, memo } from "react";

interface Props {
  className?: string;
}

const Spin: FC<Props> = ({ className }) => (
  <Loader className={`${className} animate-spin`} />
);

export default memo(Spin);
