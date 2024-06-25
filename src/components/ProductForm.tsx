import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Product } from "../types/Product.type";

interface ProductFormProps {
  product: Product;
  index: number;
  onSave: (index: number, updatedProduct: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, index, onSave }) => {
  const [open, setOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    onSave(index, editedProduct);
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ color: "#0F4F31" }}>
        <Edit />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}> {editedProduct?.name}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                label="Category"
                name="category"
                value={editedProduct?.category}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Price"
                name="price"
                value={editedProduct?.price}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Quantity"
                name="quantity"
                value={editedProduct?.quantity}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Value"
                name="value"
                value={editedProduct?.value}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductForm;
