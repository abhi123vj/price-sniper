import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ProductList from "./components/productList";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto px-4 py-4 flex justify-center md:justify-end">
        <div className="relative w-full max-w-md flex flex-row items-center gap-4">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
          <Input
            type="text"
            placeholder="Add products..."
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button>Search</Button>
        </div>
      </div>

      <ProductList />
    </div>
  );
}
