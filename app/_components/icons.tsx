"use client";

import {
  ArrowRight,
  Check,
  CornerDownRight,
  Edit,
  Eye,
  Factory,
  Globe,
  Image as LucideImage,
  Info,
  Layout,
  List,
  ListChecks,
  Loader,
  LucideProps,
  MapPin,
  Minus,
  MoreVertical,
  MoveLeft,
  PackagePlus,
  PackageSearch,
  Pencil,
  PieChart,
  Plug,
  Plus,
  RefreshCw,
  Search,
  Star,
  Trash,
  Truck,
  Unplug,
  User,
  XCircle,
} from "lucide-react";

export const PlusIcon = (props: LucideProps) => <Plus {...props} />;
export const ArrowBR = (props: LucideProps) => <CornerDownRight {...props} />;
export const UserIcon = (props: LucideProps) => <User {...props} />;
export const MinusIcon = (props: LucideProps) => <Minus {...props} />;
export const PublicIcon = (props: LucideProps) => <Globe {...props} />;
export const EyeIcon = (props: LucideProps) => <Eye {...props} />;
export const LayoutIcon = (props: LucideProps) => <Layout {...props} />;
export const EditIcon = (props: LucideProps) => <Edit {...props} />;
export const PencilIcon = (props: LucideProps) => <Pencil {...props} />;
export const XCircleIcon = (props: LucideProps) => <XCircle {...props} />;
export const TrashIcon = (props: LucideProps) => <Trash {...props} />;
export const RefreshIcon = (props: LucideProps) => <RefreshCw {...props} />;
export const CheckIcon = (props: LucideProps) => <Check {...props} />;
export const SearchIcon = (props: LucideProps) => <Search {...props} />;
export const MoveLeftIcon = (props: LucideProps) => <MoveLeft {...props} />;
export const PlugIcon = (props: LucideProps) => <Plug {...props} />;
export const UnPlugIcon = (props: LucideProps) => <Unplug {...props} />;
export const ArrowRightIcon = (props: LucideProps) => <ArrowRight {...props} />;
export const StarIcon = (props: LucideProps) => <Star {...props} />;
export const AddressIcon = (props: LucideProps) => <MapPin {...props} />;
export const TruckIcon = (props: LucideProps) => <Truck {...props} />;
export const InfoIcon = (props: LucideProps) => <Info {...props} />;
export const SeoIcon = (props: LucideProps) => <PackageSearch {...props} />;
export const FactoryIcon = (props: LucideProps) => <Factory {...props} />;
export const CategoriesIcon = (props: LucideProps) => <ListChecks {...props} />;
export const VariantsIcon = (props: LucideProps) => <PackagePlus {...props} />;
export const AttributesIcon = (props: LucideProps) => <List {...props} />;
export const OptionsY = (props: LucideProps) => <MoreVertical {...props} />;
export const InventoryReports = (props: LucideProps) => <PieChart {...props} />;
export const ImageIcon = (props: LucideProps) => <LucideImage {...props} />;
export const NoIcon = () => null;
export const Spin = (props: LucideProps) => (
  <Loader className="w-4 h-4 animate-spin`" />
);
