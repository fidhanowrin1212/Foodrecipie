import React, { useState, useEffect } from "react";

export const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const recipes = [
        { id: 1, name: "Fragrant Lamb Tagine", time: "75 min", image: "f.jpg", cuisine: "Moroccan" },
        { id: 2, name: "Truffle Mushroom Risotto", time: "40 min", image: "c.jpg", cuisine: "Italian" },
        { id: 3, name: "Miso Glazed Eggplant", time: "35 min", image: "m.jpg", cuisine: "Japanese" },
        { id: 4, name: "Coconut Lemongrass Soup", time: "30 min", image: "co.jpg", cuisine: "Thai" },
        { id: 5, name: "Chimichurri Steak", time: "25 min", image: "ch.jpg", cuisine: "Argentinian" },
        { id: 6, name: "Butternut Squash Ravioli", time: "60 min", image: "bu.jpg", cuisine: "Italian" },
        { id: 7, name: "Shakshuka", time: "35 min", image: "s.jpg", cuisine: "Middle Eastern" },
        { id: 8, name: "Gochujang Tofu Bowl", time: "30 min", image: "g.jpg", cuisine: "Korean" },
        { id: 9, name: "Black Bean Sweet Potato Tacos", time: "45 min", image: "bl.jpg", cuisine: "Mexican" },
      ];
      setData(recipes);
    };
    fetchData();
  }, []);

  const filterData = data.filter((item) =>
    item.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filterData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filterData.length / recordsPerPage);

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="home-container" style={{ backgroundImage: "url('bg.jpg')", backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <section className="hero">
        <h1>Culinary Adventures Await</h1>
        <p>Discover mouthwatering recipes, master cooking techniques, and explore global flavors—all in one delicious destination!</p>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="search-bar"
        />
      </section>

      <div className="recipes-section" style={{ marginTop: "auto", padding: "20px", background: "rgba(255, 255, 255, 0.0)" }}>
        <h2>Popular Recipes</h2>
        <div className="recipe-grid" style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
          {records.length > 0 ? (
            records.map((recipe) => (
              <div className="recipe-card" key={recipe.id} style={{ width: "250px", textAlign: "center", border: "1px solid #ccc", padding: "10px", borderRadius: "10px", background: "white" }}>
                <img src={recipe.image} alt={recipe.name} className="recipe-img" style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }} />
                <h3>{recipe.name}</h3>
                <p>{recipe.cuisine} Cuisine</p>
                <span>{recipe.time}</span>
              </div>
            ))
          ) : (
            <p>No recipes found. Try another search!</p>
          )}
        </div>
        {npage > 1 && (
          <div className="pagination" style={{ textAlign: "center", marginTop: "20px" }}>
            <button onClick={prevPage} disabled={currentPage === 1}>&laquo; Previous</button>
            <button onClick={nextPage} disabled={currentPage === npage}>Next &raquo;</button>
          </div>
        )}
      </div>
    </div>
  );
};
