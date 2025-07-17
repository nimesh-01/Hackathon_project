import React, { useState, useEffect } from 'react';

const Useinfiniteproducts = () => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 6;

  const fetchproducts = () => {
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];

    const start = products.length;
    const nextBatch = allProducts.slice(start, start + LIMIT);

    if (nextBatch.length === 0) {
      setHasMore(false);
    } else {
      setHasMore(true);
      setProducts(prev => [...prev, ...nextBatch]);
    }
  };

  useEffect(() => {
    fetchproducts(); // initial fetch
  }, []);

  return { products, hasMore, fetchproducts };
};

export default Useinfiniteproducts;
