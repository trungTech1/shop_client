import React, { useState } from 'react';
import './productDetail.scss';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  description: string;
  origin: string;
  ingredients: string;
  usage: string;
  storage: string;
  imgUrl: string;
  available: boolean;
}

const ProductDetail: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const product: Product = {
    id: 1,
    name: 'Thùng 24 lon bia Heineken 330ml',
    price: 437000,
    oldPrice: 445000,
    description: 'Bia Heineken lon 330ml có quy trình sản xuất, từ lựa chọn nguyên liệu, chế biến, đóng gói đều được làm trên dây chuyền công nghệ hiện đại, khép kín, đảm bảo việc ra đời sản phẩm có chất lượng tốt, an toàn cao. Bia được đóng gói đẹp mắt, thích hợp để biếu tặng, hay sử dụng cho tiệc ngoài trời, du lịch, dã ngoại.',
    origin: 'Vietnam',
    ingredients: 'Ghi trên bao bì sản phẩm',
    usage: 'Dùng trực tiếp',
    storage: 'Để nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp',
    imgUrl: 'link_to_image',
    available: true,
  };

  return (
    <div className="product-detail">
      <div className="product-info">
        <div className="product-images">
          <img src={product.imgUrl} alt={product.name} />
          <div className="thumbnail-images">
            {/* Thumbnails here */}
          </div>
        </div>
        <div className="product-details">
          <h1>{product.name}</h1>
          <div className="price">
            <span>{product.price.toLocaleString()} ₫</span>
            <span className="old-price">{product.oldPrice.toLocaleString()} ₫</span>
          </div>
          <div className="availability">
            Tình trạng: {product.available ? 'Còn hàng' : 'Hết hàng'}
          </div>
          <div className="product-options">
            <select>
              <option value="24">THÙNG 24</option>
              <option value="6">GÓI 6</option>
              <option value="1">LON</option>
            </select>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>
          <button className="add-to-cart-button">THÊM VÀO GIỎ</button>
        </div>
      </div>
      <div className="product-description">
        <h2>Mô tả</h2>
        <p>{product.description}</p>
        <h3>Thông tin</h3>
        <table>
          <tbody>
            <tr>
              <td>Xuất xứ</td>
              <td>{product.origin}</td>
            </tr>
            <tr>
              <td>Thành Phần</td>
              <td>{product.ingredients}</td>
            </tr>
            <tr>
              <td>Hướng Dẫn Sử Dụng</td>
              <td>{product.usage}</td>
            </tr>
            <tr>
              <td>Bảo Quản</td>
              <td>{product.storage}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetail;
