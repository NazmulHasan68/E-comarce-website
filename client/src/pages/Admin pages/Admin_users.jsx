import { Input } from '@/components/ui/input';
import { useGetAlluserQuery } from '@/redux/ApiController/authApi'
import { Search } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Admin_users() {
  const {data} = useGetAlluserQuery()

  const [nameSearch, setnameSearch] = useState("");
  const [phoneSearch, setphoneSearch] = useState("");

  const filteruser = data?.Users.filter((c) =>
    c.name.toLowerCase().includes(nameSearch.toLowerCase())
  );
  return (
    <div>
       <section className="flex-1 md:mx-4 mx-0 border rounded-xl p-4 md:p-4  shadow-sm overflow-auto">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2 md:gap-4">
          <div className="relative w-full bg-slate-50 border-2 border-blue-500 rounded-full border-none outline-none">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search name..."
              value={nameSearch}
              onChange={(e) => setnameSearch(e.target.value)}
              className="pl-10  border-none outline-none focus:shadow-md "
            />
          </div>

   
        </div>
         <table className="w-full text-left text-sm bg-slate-50  text-gray-700 overflow-auto">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="p-2 border">name</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">date</th>
              <th className="p-2 border">View</th>
            </tr>
          </thead>
          <tbody>
            {filteruser?.length > 0 ? (
              filteruser?.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="p-1 border">{user.name}</td>
                  <td className="p-2 border font-semibold">{user.phone}</td>
                  <td className="p-2 border">{user.createdAt}</td>
                  <td className="p-2 border">
                    <Link
                      to={`${user._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  User not found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </section>
    </div>
  )
}
