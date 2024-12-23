import { useState } from "react";

const Update = () => {
  const [product, setProduct] = useState<{ name: string; price: number }>({
    name: "Pomidor",
    price: 50,
  });

  const changePrice = () => {
    setProduct((prev: { name: string; price: number }) => ({
      ...prev,
      price: 100,
    }));
  };

  return (
    <div>
      <p>
        Aktualnie {product.name} kosztuje {product.price}
      </p>
      <button onClick={changePrice}>Zmien cene</button>
    </div>
  );
};

export default Update;
