import Boottrap from './boottrap/Boottrap'
import AdComponent from './ad/Ad'
import CountdownTimer from '@/components/time/CountdownTimer'
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export default function Homepage() {
  return (
    <div className="home_page_body">
        <Boottrap />
        <AdComponent onClose={() => {}} />
        
        <div className="time_container">
          <div className="timer">
            <h1>Siêu khuyến mãi</h1>
            <CountdownTimer hours={10} minutes={0} seconds={0} />
          </div>
        </div>
        <div className="listProduct">
          {/* {products?.map((product: Product) => (
            <div className="product" key={product.id}>
              <div className="product-Discount">-{product.discount}%</div>
              <img
                style={{ width: 250 }}
                src={product.image}
                alt="{product.image}"
              />
              <p className="product-Name">{product.name}</p>
              <div className="product-price-view">
                <p className="product-price">
                  <span className="product-OldPrice">
                    {product.price_before_discount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>{" "}
                  <span className="product-NewPrice">
                    {product.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </p>
                <div className="product-view-sold">
                  <p className="product-View">
                    <RemoveRedEyeIcon /> {product.viewed}
                  </p>
                  <p className="product-sold">
                    <span>Đã bán: </span>
                    {product.sold}
                  </p>
                </div>
              </div>
              <button
                className="product-btn"
                // onClick={() => handleAddToCart(product.id)}
              >
                <AddShoppingCartIcon /> Thêm vào giỏ
              </button>
            </div>
          ))} */}
        </div>
      </div>
    //   {/* <Pagination
    //     id="pagination"
    //     count={Math.ceil(totalItemsCount / number_of_per_page)}
    //     page={page}
    //     onChange={handlePageChange}
    //     showFirstButton
    //     showLastButton
    //     variant="outlined"
    //   /> */}
      )
}
