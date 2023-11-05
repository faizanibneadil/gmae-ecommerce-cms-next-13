import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const NotFound: React.FC<{}> = () => {
  return (
    <Table className="table-auto">
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default NotFound;
