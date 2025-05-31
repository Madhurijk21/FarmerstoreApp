import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Select", // Default Select
    unit: "Select",     // Default Select
  });

  const oncChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Optional: Validate that category and unit are not 'Select'
    if (data.category === "Select") {
      toast.error("Please select a valid category");
      return;
    }
    if (data.unit === "Select") {
      toast.error("Please select a valid unit");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("unit", data.unit);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/product/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Select",
          unit: "Select",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding product");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={oncChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={oncChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              onChange={oncChangeHandler}
              name="category"
              value={data.category}
              required
            >
              <option value="Select" disabled>
                Select
              </option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains & Cereals">Grains & Cereals</option>
              <option value="Pulses & Legumes">Pulses & Legumes</option>
              <option value="Spices & Condiments">Spices & Condiments</option>
              <option value="Dairy & Related">Dairy & Related</option>
              <option value="Flowers">Flowers</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={oncChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$0"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="add-unit flex-col">
            <p>Unit</p>
            <select
              onChange={oncChangeHandler}
              name="unit"
              value={data.unit}
              required
            >
              <option value="Select" disabled>
                Select
              </option>
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="lb">lb</option>
              <option value="oz">oz</option>
              <option value="pack">pack</option>
              <option value="dozen">dozen</option>
              <option value="bunch">bunch</option>
              <option value="piece">piece</option>
              <option value="ltr">ltr</option>
            </select>
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
