import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import empty from "@/assets/like.png";
import { HeartOff } from "lucide-react";
import { removeLike } from '@/redux/features/LikeSlice';
import { Link } from 'react-router-dom';


export default function Likepage() {
  const likedItems = useSelector((state) => state.like.likedItems || []);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeLike(id));
  };

  return (
    <div className="bg-[var(--primary-bg-color)] px-12 py-10  mt-16">

      <div className='max-w-6xl mx-auto'>
        {likedItems.length === 0 ? (
          <div className="text-gray-600 py-16 mt-20 text-center">
            <img src={empty} className="w-40 mx-auto object-cover" />
            <p className="mt-4">Like your favourite product</p>
            <p> Buy it later</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {likedItems.map((item) => (
              <Link
                to={`/product_details/${item.id}`}
                key={item.id}
                className="border bg-[var(--secondary-bg-color)] rounded-xl overflow-hidden shadow hover:shadow-md transition"
              >
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-full md:h-48 h-52 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-emerald-600 font-bold">
                      ${item.finalPrice || item.price}
                    </span>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-600"
                      title="Remove from Likes"
                    >
                      <HeartOff size={20} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
