import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

// Main Admin Product List Component
export default function Admin_product_list() {
  const [search, setSearch] = useState('');

  const dummyProducts = [
    { id: 1, name: 'T-shirt', price: '$20', stock: 30 },
    { id: 2, name: 'Hoodie', price: '$40', stock: 15 },
    { id: 3, name: 'Cap', price: '$10', stock: 50 },
  ];

  const filteredProducts = dummyProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Header: Search and Add Product */}
      <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
        <Input
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-2/3"
        />
        <AddProduct />
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="text-left p-2 border">ID</th>
              <th className="text-left p-2 border">Name</th>
              <th className="text-left p-2 border">Price</th>
              <th className="text-left p-2 border">Stock</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-2 border">{product.id}</td>
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border">{product.price}</td>
                <td className="p-2 border">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProducts.length === 0 && (
          <p className="text-center text-muted-foreground mt-4">No products found.</p>
        )}
      </div>
    </div>
  );
}

// ✅ Fixed AddProduct Component
function AddProduct() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        {/* Add product form goes here */}
        <p className="text-sm text-muted-foreground">Form to add product coming soon...</p>
      </DialogContent>
    </Dialog>
  );
}
