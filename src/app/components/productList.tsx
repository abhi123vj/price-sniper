import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"

import Image from "next/image";

const products = [
  {
    id: 1,
    image: "https://www.vedantcomputers.com/image/cache/catalog/assets/product/nzxt/power-supply/pa-8g2bb-uk/pa-8g2bb-uk-1-1000x1000.jpg",
    name: "Adata XPG SX6000 Pro 256GB M.2 SSD",
    modelId: "ASX6000PNP-256GT-C",
    price: "₹1,805.00",
    vendor: "Vendor X",
  },
  {
    id: 2,
    image: "https://www.vedantcomputers.com/image/cache/catalog/assets/product/nzxt/power-supply/pa-8g2bb-uk/pa-8g2bb-uk-1-1000x1000.jpg",
    name: "Product B",
    modelId: "PB-002",
    price: "$249",
    vendor: "Vendor Y",
  },
  {
    id: 3,
    image: "https://www.vedantcomputers.com/image/cache/catalog/assets/product/nzxt/power-supply/pa-8g2bb-uk/pa-8g2bb-uk-1-1000x1000.jpg",
    name: "Product C",
    modelId: "PC-003",
    price: "$299",
    vendor: "Vendor Z",
  },
];

export default function ProductList() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mt-6 mb-4">Product List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="shadow-md p-3 ">
            <CardContent className="p-0 flex flex-col items-center ">
              <Image
                width={1000}
                height={1000}
                src={product.image}
                alt={product.name}
                className="w-full object-cover rounded-md bg-slate-200"
              />
              
              <div className="p-2 w-full justify-center text-center">
                <h3 className="text-sm font-medium mt-2 text-center font-semibold">{product.name}</h3>
                <p className="text-xs text-gray-500 ">Model: {product.modelId}</p>
                <p className="text-sm text-blue-600 font-semibold">{product.price}</p>
                <p className="text-xs text-gray-400">Vendor: {product.vendor}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
