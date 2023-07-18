import { List, ListItem } from "@tremor/react";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto space-y-2">
      <div className="h-4 max-w-sm bg-gray-400 rounded-md animate-pulse" />

      <List>
        {[...Array(10)].map((i) => (
          <ListItem key={i} className="space-x-2">
            <span className="w-full h-10 bg-gray-400 rounded-md animate-pulse" />
            <span className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-400 rounded-md animate-pulse" />
              <div className="w-10 h-10 bg-gray-400 rounded-md animate-pulse" />
            </span>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
