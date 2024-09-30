import React, { useContext } from "react";
import { Stack } from "@mui/material";
import { ThemeContext } from '../MainApp'; // Import ThemeContext
import { categories } from "../utils/constants";

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const { darkMode } = useContext(ThemeContext); // Access darkMode from context

  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
        flexDirection: { md: "column" },
      }}
    >
      {categories.map((category) => (
        <button
          className="category-btn"
          onClick={() => setSelectedCategory(category.name)}
          style={{
            background: darkMode ? "rgba(132, 223, 193, 0.13)" : "white", // White background in light mode
            color: darkMode ? "white" : "black", // Black text in light mode
          }}
          key={category.name}
        >
          <span style={{ marginRight: "15px" }}>
            {category.icon}
          </span>
          <span style={{ opacity: 1 }}>
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
};

export default Categories;
