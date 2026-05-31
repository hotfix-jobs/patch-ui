"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@patchui/react";

export function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Plan</TableHead>
          <TableHead>Seats</TableHead>
          <TableHead align="right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Starter</TableCell>
          <TableCell>Up to 3</TableCell>
          <TableCell align="right">$0</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Team</TableCell>
          <TableCell>Up to 20</TableCell>
          <TableCell align="right">$49</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Enterprise</TableCell>
          <TableCell>Unlimited</TableCell>
          <TableCell align="right">Custom</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell />
          <TableCell align="right">3 plans</TableCell>
        </TableRow>
      </TableFooter>
      <TableCaption>Pricing across available plans.</TableCaption>
    </Table>
  );
}
