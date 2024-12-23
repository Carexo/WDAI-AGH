import Product from "./Product.tsx";

const NewCart = () => {
  const products = ["Apple", "Banana", "Orange", "Grapes", "Kiwi"];

  return (
    <div>
      {products.map((product) => (
        <Product name={product} />
      ))}
    </div>
  );
};

export default NewCart;
