// ./fetch/getProducts.js
const categories = ["smartphones", "laptops", "tablets", "mobile-accessories"];

export default async function getProducts() {
  const responeses = await Promise.all(
    categories.map((cate) =>
      fetch(`https://dummyjson.com/products/category/${cate}`),
    ),
  );
  const allData = await Promise.all(
    responeses.map((res) => {
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      return res.json();
    }),
  );
  return allData.flatMap((p) => p.products);
}
