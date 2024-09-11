import React from "react";

export default function Sidebar({ selectedSidebar, setSelectedSidebar }) {
  const menuItems = [
    { id: 1, title: "PageSpeed Insights" },
    { id: 2, title: "Home page" },
    { id: 3, title: "Product page" },
    { id: 4, title: "Bulk Product page" },
    { id: 5, title: "Collection page" },
    { id: 6, title: "Bulk Collection page" },
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
