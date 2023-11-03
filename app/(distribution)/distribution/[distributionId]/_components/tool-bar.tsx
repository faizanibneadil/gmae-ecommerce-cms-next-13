import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const SearchInput = dynamic(() => import("./search-input"), {
  ssr: false,
  loading: () => <div>Loading ...</div>,
});
const ActionsButtons = dynamic(() => import("./main-actions-buttons"), {
  ssr: false,
  loading: () => <div>Loading ...</div>,
});
const InventoryActions = dynamic(() => import("./inventory-actions"), {
  ssr: false,
  loading: () => <div>Loading ...</div>,
});
const AreasActions = dynamic(() => import("./areas-actions"), {
  ssr: false,
  loading: () => <div>Loading ...</div>,
});
const CompanyActions = dynamic(() => import("./company-actions"), {
  ssr: false,
  loading: () => <div>Loading ...</div>,
});
const ShopsActions = dynamic(() => import("./shop-actions"), {
  ssr: false,
  loading: () => <div>Loading ...</div>,
});
const ImagesActions = dynamic(() => import("./images-actions"), {
  ssr: false,
  loading: () => <div>Loading ...</div>,
});
const CategoriesActions = dynamic(() => import("./categories-actions"), {
  ssr: false,
  loading: () => <div>Loading ...</div>,
});

const ToolBar: React.FC<{}> = () => {
  const inventoryId = useParams()?.inventoryId as string;
  const imageId = useParams()?.imageId as string;
  const areaId = useParams()?.areaId as string;
  const shopId = useParams()?.shopId as string;
  const userId = useParams()?.userId as string;
  const categoryId = useParams()?.categoryId as string;
  const companyId = useParams()?.companyId as string;

  if (inventoryId) {
    return (
      <div className="sticky top-0 z-20 w-full h-auto border-b shadow-inner">
        <div className="flex items-center justify-between space-x-1">
          <SearchInput />
          <div className="flex space-x-0.5">
            <InventoryActions />
          </div>
        </div>
      </div>
    );
  } else if (imageId) {
    return (
      <div className="sticky top-0 z-20 w-full h-auto border-b shadow-inner">
        <div className="flex items-center justify-between space-x-1">
          <SearchInput />
          <div className="flex space-x-0.5">
            <ImagesActions />
          </div>
        </div>
      </div>
    );
  } else if (areaId) {
    return (
      <div className="sticky top-0 z-20 w-full h-auto border-b shadow-inner">
        <div className="flex items-center justify-between space-x-1">
          <SearchInput />
          <div className="flex space-x-0.5">
            <AreasActions />
          </div>
        </div>
      </div>
    );
  } else if (shopId) {
    return (
      <div className="sticky top-0 z-20 w-full h-auto border-b shadow-inner">
        <div className="flex items-center justify-between space-x-1">
          <SearchInput />
          <div className="flex space-x-0.5">
            <ShopsActions />
          </div>
        </div>
      </div>
    );
  } else if (userId) {
    return (
      <div className="sticky top-0 z-20 w-full h-auto border-b shadow-inner">
        <div className="flex items-center justify-between space-x-1">
          <SearchInput />
          <div className="flex space-x-0.5">Users Actions Buttons</div>
        </div>
      </div>
    );
  } else if (categoryId) {
    return (
      <div className="sticky top-0 z-20 w-full h-auto border-b shadow-inner">
        <div className="flex items-center justify-between space-x-1">
          <SearchInput />
          <div className="flex space-x-0.5">
            <CategoriesActions />
          </div>
        </div>
      </div>
    );
  } else if (companyId) {
    return (
      <div className="sticky top-0 z-20 w-full h-auto border-b shadow-inner">
        <div className="flex items-center justify-between space-x-1">
          <SearchInput />
          <div className="flex space-x-0.5">
            <CompanyActions />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="sticky top-0 z-20 w-full h-auto border-b shadow-inner">
        <div className="flex items-center justify-between space-x-1">
          <SearchInput />
          <div className="flex space-x-0.5">
            <ActionsButtons />
          </div>
        </div>
      </div>
    );
  }
};

export default ToolBar;
