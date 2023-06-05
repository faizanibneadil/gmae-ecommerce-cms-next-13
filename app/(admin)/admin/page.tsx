import { Card, Grid, Text, Title } from "@tremor/react";

export default function Page() {
  return (
    <div className="p-4">
      <Title>Dashboard</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

      {/* Main section */}
      <Card className="mt-6">
        <div className="h-96" />
      </Card>

      {/* KPI section */}
      <Grid numColsMd={2} className="gap-6 mt-6">
        <Card>
          {/* Placeholder to set height */}
          <div className="h-28" />
        </Card>
        <Card>
          {/* Placeholder to set height */}
          <div className="h-28" />
        </Card>
      </Grid>
    </div>
  );
}
