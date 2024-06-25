import { useDispatch } from "react-redux";
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton } from "@mui/material";
import { Delete, Edit, VisibilityOff } from "@mui/icons-material";
import { disableProduct, deleteProduct, updateProduct } from "../features/inventorySlice";
import ProductForm from "./ProductForm";

import { Product } from "../types/Product.type";

interface ProductTableProps {
  products: Product[];
  isAdminView: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, isAdminView }) => {
  const dispatch = useDispatch();

  const handleDelete = (index: number) => {
    dispatch(deleteProduct(index));
  };

  const handleDisable = (index: number) => {
    dispatch(disableProduct(index));
  };

  const handleUpdate = (index: number, updatedProduct: Product) => {
    dispatch(updateProduct({ index, updatedProduct }));
  };

  return (
    <Table sx={{ minWidth: 650, backgroundColor: "#f5f5f5", boxShadow: 3 }}>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Value</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product, idx) => (
          <TableRow key={idx} sx={{ opacity: product?.disabled ? 0.5 : 1 }}>
            <TableCell>{product?.name}</TableCell>
            <TableCell>{product?.category}</TableCell>
            <TableCell>{product?.price}</TableCell>
            <TableCell>{product?.quantity}</TableCell>
            <TableCell>{product?.value}</TableCell>
            <TableCell>
              {isAdminView ? (
                <>
                  <ProductForm product={product} index={idx} onSave={handleUpdate} />
                  <IconButton
                    onClick={() => handleDisable(idx)}
                    disabled={product?.disabled}
                    sx={{ color: "#6366F1" }}
                  >
                    <VisibilityOff />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(idx)}
                    disabled={product?.disabled}
                    sx={{ color: "#ED70B2" }}
                  >
                    <Delete />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton disabled sx={{ color: "#9e9e9e" }}>
                    <Edit />
                  </IconButton>
                  <IconButton disabled sx={{ color: "#9e9e9e" }}>
                    <VisibilityOff />
                  </IconButton>
                  <IconButton disabled sx={{ color: "#9e9e9e" }}>
                    <Delete />
                  </IconButton>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
