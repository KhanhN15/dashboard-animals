import React from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";
import ProductsStatistics from "./ProductsStatistics";
import { useSelector } from "react-redux";
import { CSVLink, CSVDownload } from "react-csv";
import axios from "axios";
import { URL_SERVER } from "../../ulities/imageUpload";

const Main = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const handleDownload = async () => {
    const res = await axios.get(`${URL_SERVER}/api/orders/all`);
    if (res.data?.data?.file) {
      const linkSource = res.data.data.file;
      const downloadLink = document.createElement("a");
      const fileName = res.data.data.name;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  };

  return (
    <>
      <section className="content-main">
        {/* <CSVLink
          data={orders}
          className="btn btn-success"
          style={{
            float: "right",
          }}
        >
          Xuất File CSV
        </CSVLink> */}
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>

        <TopTotal orders={orders} products={products} />
        <div className="row">
          {/* STATICS */}
          <SaleStatistics />
          <ProductsStatistics />
        </div>
        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder orders={orders} loading={loading} error={error} />
        </div>
      </section>
    </>
  );
};

export default Main;
