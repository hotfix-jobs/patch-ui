"use client";

import { Card, CardContent, CardTitle } from "@patchui/react";

export function CardVariantsDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      <Card variant="surface">
        <CardContent>
          <CardTitle render={<h4 />}>Surface</CardTitle>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <CardTitle render={<h4 />}>Outlined</CardTitle>
        </CardContent>
      </Card>
      <Card variant="elevated">
        <CardContent>
          <CardTitle render={<h4 />}>Elevated</CardTitle>
        </CardContent>
      </Card>
    </div>
  );
}
