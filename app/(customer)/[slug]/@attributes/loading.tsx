import { List, ListItem } from "@tremor/react";

const Loading = () => {
  return (
    <div className="space-y-2">
      <div className="h-6 max-w-xs bg-gray-400 rounded-md animate-pulse" />

      <List>
        {[...Array(5)].map((i) => (
          <ListItem key={i * 3} className="space-x-2">
            <span className="w-full h-4 bg-gray-400 rounded-md animate-pulse" />
            <span className="w-full h-4 bg-gray-400 rounded-md animate-pulse" />
            <span></span>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Loading;
