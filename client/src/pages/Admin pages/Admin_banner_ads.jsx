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
  useGetherosQuery,
  useAddheroMutation,
  useDeleteheroMutation
} from "@/redux/ApiController/heroApi";

export default function Admin_banner_ads() {
  // === CATEGORY STATES ===
  const { data: heros = [], isLoading: isheroLoading } = useGetherosQuery();
  const [addhero, { isLoading: isAddingCategory }] = useAddheroMutation();
  const [deletehero] = useDeleteheroMutation();

  const [heroSearch, setheroSearch] = useState("");
  const [heroTitle, setheroTitle] = useState("");
  const [herosubTitle, setherosubTitle] = useState("");
  const [heroLink, setheroLink] = useState("");
  const [isAds, setisAds] = useState(false)
  const [heroBanner, setheroBanner] = useState(null);
  const [openheroDialog, setOpenheroDialog] = useState(false);


  const handleAddhero = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", heroTitle);
      formData.append("subtitle", herosubTitle);
      formData.append("link", heroLink);
      formData.append("isAds", isAds);
      if (heroBanner) formData.append("banner", heroBanner);

      await addhero(formData).unwrap();
      toast.success("Add banner and details");
      setheroTitle("");
      setherosubTitle("")
      setheroLink("");
      setheroBanner(null)
      setisAds(false)
    } catch (error) {
      toast.error("Failed to add banner & details");
    }
  };


const handleDeleteHero = async (id) => {
    if (confirm("Banner this category?")) {
      try {
        await deletehero(id).unwrap();
        toast.success("banner deleted");
      } catch {
        toast.error("Failed to delete banner section");
      }
    }
  };

  const filteredhero = heros.filter((c) =>
    c.title.toLowerCase().includes(heroSearch.toLowerCase())
  );


  return (
    <div className="h-screen flex flex-col gap-4 md:gap-6 p-1 md:p-6">

      <h1 className="text-xl font-bold text-blue-600"> Add Banner and Ads</h1>
      {/* === CATEGORY SECTION === */}
      <section className="flex-1 border rounded-xl p-6 bg-slate-50 shadow-sm h-64 overflow-auto">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search title..."
              value={heroSearch}
              onChange={(e) => setheroSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <Dialog open={openheroDialog} onOpenChange={setOpenheroDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">Add Banner</Button>
            </DialogTrigger>
            <DialogContent className="bg-white p-6 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-lg mb-4">Add New Banner</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddhero} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Banner Titile"
                  required
                  value={heroTitle}
                  onChange={(e) => setheroTitle(e.target.value)}
                  className="text-gray-500"
                />
                <Input
                  type="text"
                  placeholder="Banner Subtitle"
                  required
                  value={herosubTitle}
                  onChange={(e) => setherosubTitle(e.target.value)}
                  className="text-gray-500"
                />
                 <Input
                  type="text"
                  placeholder="Banner Link"
                  required
                  value={heroLink}
                  onChange={(e) => setheroLink(e.target.value)}
                  className="text-gray-500"
                />
                <select
                  value={isAds}
                  onChange={(e) => setisAds(e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="">Select Ads</option>
                  <option value={true}>Ads Yes</option>
                  <option value={false}>Ads No</option>
                </select>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setheroBanner(e.target.files[0])}
                  className="text-gray-500"
                />
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                  disabled={isheroLoading}
                >
                  {isheroLoading ? "Saving..." : "Save"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
          {filteredhero.map((banner) => (
            <div key={banner._id} className=" group border rounded p-4 text-center shadow bg-white relative">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${banner.banner}`}
                alt=""
                className="w-full h-20 object-cover mx-auto mb-2"
              />
              <h2 className="text-sm font-semibold line-clamp-1">{banner.title}</h2>
              <h2 className="text-sm text-gray-600 line-clamp-2">{banner.subtitle}</h2>
              <h2 className="text-sm text-gray-300 line-clamp-1">{banner.link}</h2>
              <div className={`absolute left-1/3  top-1 ml-4 px-3 shadow-xl py-1 rounded-xl ${isAds ? "bg-emerald-600 text-white" : "bg-rose-600 opacity-70 text-white"}`}>
                {isAds ? "Ads" : "Banner"}
              </div>
              <button
                onClick={() => handleDeleteHero(banner._id)}
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
