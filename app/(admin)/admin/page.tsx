"use client";
import { Button, DropdownMenu, ScrollArea, TextField } from "@radix-ui/themes";
import { Card, Grid, Text, Title } from "@tremor/react";
import PageHeader from "../_components/page-header";

export default function Page() {
  return (
    <div className="p-4">
      <PageHeader
        backRoute=""
        enableBackButton={false}
        pageDescription="Dashboard"
        pageHeading="Dashboard"
      />

      {/* Main section */}
      <Card className="mt-6">
        <div className="h-96" />
      </Card>

      {/* KPI section */}
      <Grid numItemsMd={2} className="gap-6 mt-6">
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
