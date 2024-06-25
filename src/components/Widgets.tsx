import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { RootState } from "../features/store";

const Widgets = () => {
  const { totalProducts, totalValue, outOfStock, categories } = useSelector(
    (state: RootState) => state.inventory
  );

  return (
    <>
      <Grid container spacing={2} className="text-center">
        <Grid item xs={3}>
          <Card sx={{ backgroundColor: "#f5f5f5", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Total Products</Typography>
              <Typography variant="h4">{totalProducts}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ backgroundColor: "#f5f5f5", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Total Store Value</Typography>
              <Typography variant="h4">${totalValue.toFixed(2) || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ backgroundColor: "#f5f5f5", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Out of Stock</Typography>
              <Typography variant="h4">{outOfStock}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ backgroundColor: "#f5f5f5", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Categories</Typography>
              <Typography variant="h4">{categories}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </>
  );
};

export default Widgets;
