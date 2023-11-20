import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <Card className="border-none">
      <CardContent className="p-2">
        <div className="flex items-center justify-center">Items Not Found</div>
      </CardContent>
    </Card>
  );
}
