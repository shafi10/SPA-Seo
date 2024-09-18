import React from "react";

export default function Sidebar({ selectedSidebar, setSelectedSidebar }) {
  const menuItems = [
    { id: 1, title: "Home page" },
    { id: 2, title: "Product page" },
    { id: 3, title: "Bulk Product page" },
    { id: 4, title: "Collection page" },
    { id: 5, title: "Bulk Collection page" },
    { id: 6, title: "JSON-LD" },
  ];

  return (
    <div className="app__sidebar_container">
      {menuItems?.map((data) => (
        <div
          key={data?.id}
          className={`sidebar__menu_item ${
            data?.id === selectedSidebar ? "sidebar__selected_item" : ""
          }`}
          onClick={() => setSelectedSidebar(data?.id)}
        >
          {data?.title}
        </div>
      ))}
    </div>
  );
}
