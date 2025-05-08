import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProductById } from "../../features/products/productsThunks";
import { selectProducts } from "../../features/products/productsSelectors";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>(); // expect string _id
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  const product = products.find((p) => p._id === id);

  useEffect(() => {
    if (id && !product) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id, product]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="productDetailsContainer">
      <div className="productDetailsCard">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <img src={product.image} alt={product.name}  />
        <h3>💰 Price: ${product.price}</h3>
      </div>
    </div>
  );
};

export default ProductDetails;

