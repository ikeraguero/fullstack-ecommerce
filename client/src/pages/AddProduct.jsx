import Nav from "../components/Nav/Nav";
import axios from "axios";

function AddProduct() {
  function send(formData) {
    const productName = formData.get("productName");
    const productPrice = parseFloat(formData.get("productPrice"));
    const productStockQuantity = Number(formData.get("productStockQuantity"));

    const productData = {
      name: productName,
      price: productPrice,
      stock_quantity: productStockQuantity,
    };

    console.log(productData);

    axios
      .post("http://localhost:8080/api/products", productData)
      .then((res) => console.log("Product added", res.data))
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <Nav />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target);
          const formData = new FormData(e.target);
          send(formData);
        }}
      >
        <input name="productName" />
        <input name="productPrice" />
        <input name="productStockQuantity" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProduct;
