import { ReactNode } from "react";
import {
  Title,
  Text,
} from "@tremor/react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Title>Categories</Title>
      <Text>Create category and view all categories</Text>
      {children}
    </div>
  );
}
