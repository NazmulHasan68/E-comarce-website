import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash, Search } from "lucide-react";
import { toast } from "sonner";

import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/ApiController/categoryApi";

import {
  useAddBandMutation,
  useDeleteBandMutation,
  useGetBandsQuery,
} from "@/redux/ApiController/bandApi";

export default function Admin_category() {
  // === CATEGORY STATES ===
  const { data: categories = [], isLoading: isCategoryLoading } = useGetCategoriesQuery();
  const [addCategory, { isLoading: isAddingCategory }] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [categorySearch, setCategorySearch] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);

  // === BAND STATES ===
  const { data: bands = [], isLoading: isBandLoading } = useGetBandsQuery();
  const [addBand, { isLoading: isAddingBand }] = useAddBandMutation();
  const [deleteBand] = useDeleteBandMutation();

  const [bandSearch, setBandSearch] = useState("");
  const [bandName, setBandName] = useState("");
  const [bandLogo, setBandLogo] = useState(null);
  const [bandCountry, setBandCountry] = useState("");
  const [openBandDialog, setOpenBandDialog] = useState(false);

  // === HANDLERS ===
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("category", categoryName);
      if (categoryIcon) formData.append("icon", categoryIcon);
      await addCategory(formData).unwrap();
      toast.success("Category added");
      setCategoryName("");
      setCategoryIcon(null);
      setOpenCategoryDialog(false);
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  const handleAddBand = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("bandname", bandName);
      formData.append("country", bandCountry);
      if (bandLogo) formData.append("logo", bandLogo);
      await addBand(formData).unwrap();
      toast.success("Band added");
      setBandName("");
      setBandLogo(null);
      setBandCountry("");
      setOpenBandDialog(false);
    } catch (error) {
      toast.error("Failed to add band");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (confirm("Delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
        toast.success("Category deleted");
      } catch {
        toast.error("Failed to delete category");
      }
    }
  };

  const handleDeleteBand = async (id) => {
    if (confirm("Delete this band?")) {
      try {
        await deleteBand(id).unwrap();
        toast.success("Band deleted");
      } catch {
        toast.error("Failed to delete band");
      }
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.category.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredBands = bands.filter((b) =>
    b.bandname.toLowerCase().includes(bandSearch.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col gap-4 md:gap-6 p-1 md:p-6">

      <h1 className="text-xl font-bold text-blue-600"> Add Category and Band name</h1>
      {/* === CATEGORY SECTION === */}
      <section className="flex-1 border rounded-xl p-6 bg-slate-50 shadow-sm h-64 overflow-auto">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search category..."
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <Dialog open={openCategoryDialog} onOpenChange={setOpenCategoryDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 text-white">Add Category</Button>
            </DialogTrigger>
            <DialogContent className="bg-white p-6 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-lg mb-4">Add New Category</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Category Name"
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCategoryIcon(e.target.files[0])}
                />
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                  disabled={isAddingCategory}
                >
                  {isAddingCategory ? "Saving..." : "Save"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 ">
          {filteredCategories.map((cat) => (
            <div key={cat._id} className="relative group border rounded p-4 text-center shadow bg-white">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${cat.icon}`}
                alt=""
                className="w-ful h-12 object-cover mx-auto mb-2"
              />
              <h2 className="text-sm font-semibold">{cat.category}</h2>
              <button
                onClick={() => handleDeleteCategory(cat._id)}
                className="absolute top-2 right-2 p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* === BAND SECTION === */}
      <section className="flex-1 border rounded-xl p-6 bg-slate-50 shadow-sm h-64 overflow-auto">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search band..."
              value={bandSearch}
              onChange={(e) => setBandSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <Dialog open={openBandDialog} onOpenChange={setOpenBandDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 text-white">Add Band</Button>
            </DialogTrigger>
            <DialogContent className="bg-white p-6 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-lg mb-4">Add New Band</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddBand} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Band Name"
                  required
                  value={bandName}
                  onChange={(e) => setBandName(e.target.value)}
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBandLogo(e.target.files[0])}
                />
                <Input
                  type="text"
                  placeholder="Country"
                  value={bandCountry}
                  onChange={(e) => setBandCountry(e.target.value)}
                />
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                  disabled={isAddingBand}
                >
                  {isAddingBand ? "Saving..." : "Save"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {filteredBands.map((band) => (
            <div key={band._id} className="relative group border rounded p-4 text-center shadow bg-white">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${band.logo}`}
                alt="band"
                className="w-10 h-10 object-cover mx-auto mb-2"
              />
              <h2 className="text-sm font-semibold">{band.bandname}</h2>
              <p className="text-xs text-gray-500">{band.country}</p>
              <button
                onClick={() => handleDeleteBand(band._id)}
                className="absolute top-2 right-2 p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
