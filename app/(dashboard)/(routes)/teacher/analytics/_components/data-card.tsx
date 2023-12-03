import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/formate";

interface DataCardInfo {
  value: number;
  label: string;
  shouldFormat?: boolean;
}
export const DataCard = ({ value, label, shouldFormat }: DataCardInfo) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-md">{label}</CardTitle>
      </CardHeader>{" "}
      <CardContent>
        <div className="text-xl font-bold">{shouldFormat ? formatPrice(value) : value}</div>
      </CardContent>
    </Card>
  );
};
