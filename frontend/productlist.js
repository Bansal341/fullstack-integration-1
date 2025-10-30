import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="product-container">
      {products.map((p) => (
        <div className="product-card" key={p.id}>
          <h3>{p.name}</h3>
          <p>Price: ${p.price}</p>
          <button>Buy Now</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
