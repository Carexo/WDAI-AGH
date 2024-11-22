const API_URL = "https://dummyjson.com";
const productsElement = document.querySelector(".products");
const filterInput = document.getElementById("filter");
const sortSelect = document.getElementById("sort");

let fetchedData;
let filteredProducts = [];

const fetchData = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);

    if (!response.ok) {
      alert("request field");
      return;
    }

    return await response.json();
  } catch (error) {
    alert(error.message);
  }
};

const displayProducts = () => {
  productsElement.innerHTML = "";
  if (filteredProducts.length === 0) {
    productsElement.innerHTML = "no products";
  }
  filteredProducts.forEach((product) => {
    const htmlProduct = ` 
        <div class="product">
            <h2>${product.title}</h2>
            <img src="${product?.images[0]}" alt="${product.title}"/>
            <p>${product.description}</p>
        </div>
    `;
    productsElement.insertAdjacentHTML("beforeend", htmlProduct);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  fetchedData = await fetchData();
  filteredProducts = [...(fetchedData.products || [])];
  console.log(filteredProducts, fetchedData);
  displayProducts();
});

filterInput.addEventListener("input", (event) => {
  const inputText = event.target.value;
  filteredProducts = fetchedData.products.filter((product) =>
    product.title.toLowerCase().includes(inputText.toLowerCase()),
  );

  displayProducts();
});

const sortByTitleAsc = (a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
};

const sortByTitleDesc = (a, b) => {
  if (a.title < b.title) {
    return 1;
  }
  if (a.title > b.title) {
    return -1;
  }
  return 0;
};

sortSelect.addEventListener("change", (event) => {
  switch (event.target.value) {
    case "asc":
      filteredProducts.sort(sortByTitleAsc);
      break;
    case "desc":
      filteredProducts.sort(sortByTitleDesc);
      break;
    default:
      filteredProducts = [...fetchedData.products];
      break;
  }

  displayProducts();
});
