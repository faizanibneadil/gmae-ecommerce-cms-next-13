"use client";

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintableInvoice from "./printable-invoice";
import { Button } from "@/components/ui/button";

interface Props {
  transaction: {
    id: string;
    area: {
      name: string | null;
    } | null;
    accessId: number;
    isReturned: boolean;
    booker: {
      name: string | null;
    } | null;
    saleMane: {
      name: string | null;
    } | null;
    company: {
      name: string | null;
    } | null;
    shop: {
      name: string | null;
    } | null;
    items: {
      products: {
        id: string;
        title: string | null;
        regularPrice: number | null;
        salePrice: number | null;
      }[];
      issueQuantity: number | null;
      returnQuantity: number | null;
    }[];
    distributor: {
      name: string | null;
    } | null;
    _count: {
      items: number;
    };
  } | null;
}

const Print: React.FC<Props> = ({ transaction }) => {
  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div>
      <PrintableInvoice transaction={transaction} ref={printRef} />
      <Button onClick={handlePrint}>Print Invoice</Button>
    </div>
  );
};

export default Print;
