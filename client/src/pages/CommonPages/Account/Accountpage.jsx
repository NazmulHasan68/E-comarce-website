import React from "react";
import { LogOut, Settings, ShoppingBag, User } from "lucide-react";

export default function AccountPage() {
  const user = {
    name: "Nazmul Hasan",
    email: "nazmul@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  const menuItems = [
    {
      label: "My Orders",
      icon: <ShoppingBag className="w-5 h-5" />,
      action: () => alert("Navigate to Orders"),
    },
    {
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      action: () => alert("Navigate to Settings"),
    },
    {
      label: "Logout",
      icon: <LogOut className="w-5 h-5 text-red-600" />,
      action: () => alert("Logging out..."),
    },
  ];

  return (
    <div className="bg-[var(--primary-bg-color)] text-[var(--primary-text-color)] mt-16">
        
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            {/* Profile Section */}
            <div className="bg-[var(--secondary-bg-color)] rounded-lg shadow p-6 flex flex-col items-center text-center">
                <img
                src={user.avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-2 border-sky-500"
                />
                <h2 className="mt-4 text-xl font-semibold text-[var(--primary-text-color)]">
                {user.name}
                </h2>
                <p className="text-sm text-[var(--primary-text-color)]">{user.email}</p>
            </div>

            {/* Account Menu */}
            <div className="mt-6 bg-[var(--secondary-bg-color)] rounded-lg shadow p-4 divide-y text-[var(--primary-text-color)]">
                {menuItems.map((item, index) => (
                <button
                    key={index}
                    onClick={item.action}
                    className="w-full flex items-center justify-between py-4 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 transition rounded"
                >
                    <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-[var(--primary-text-color)] text-base">
                        {item.label}
                    </span>
                    </div>
                    <span className="text-sm text-[var(--primary-text-color)]">{">"}</span>
                </button>
                ))}
            </div>
        </div>
    </div>
  );
}
