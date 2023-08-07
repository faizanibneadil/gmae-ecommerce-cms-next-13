"use client";

import {
  Check,
  Edit,
  Eye,
  Globe,
  Layout,
  Loader,
  LucideProps,
  Plus,
  RefreshCw,
  Trash,
  XCircle,
} from "lucide-react";

export const PlusIcon = (props: LucideProps) => <Plus {...props} />;
export const PublicIcon = (props: LucideProps) => <Globe {...props} />;
export const EyeIcon = (props: LucideProps) => <Eye {...props} />;
export const LayoutIcon = (props: LucideProps) => <Layout {...props} />;
export const EditIcon = (props: LucideProps) => <Edit {...props} />;
export const XCircleIcon = (props: LucideProps) => <XCircle {...props} />;
export const TrashIcon = (props: LucideProps) => <Trash {...props} />;
export const RefreshIcon = (props: LucideProps) => <RefreshCw {...props} />;
export const CheckIcon = (props: LucideProps) => <Check {...props} />;
export const NoIcon = () => null;
export const Spin = (props: LucideProps) => (
  <Loader className="w-4 h-4 animate-spin`" />
);
