import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Switch, Typography } from "@mui/material";
import ProductTable from "../components/ProductTable";
import Widgets from "./Widgets";
import { fetchInventoryData } from "../features/fetchInventoryData";
import { RootState } from "../features/store";

const Dashboard = () => {
  const [isAdminView, setIsAdminView] = useState(false);
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.inventory);

  useEffect(() => {
    dispatch(fetchInventoryData());
  }, [dispatch]);

  const handleViewToggle = () => {
    setIsAdminView(!isAdminView);
  };

  return (
    <Container className="mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h5" className="mb-4">
          Inventory Stats
        </Typography>
        <div className="flex items-center ">
          <Switch
            checked={isAdminView}
            onChange={handleViewToggle}
            inputProps={{ "aria-label": "admin-user-switch" }}
          />
          <Typography>{isAdminView ? "Admin View" : "User View"}</Typography>
        </div>
      </div>
      <Widgets />
      <div className="my-4">
        <ProductTable products={products} isAdminView={isAdminView} />
      </div>
    </Container>
  );
};

export default Dashboard;
