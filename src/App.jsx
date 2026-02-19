import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './assets/all.scss'
import axios from 'axios';

const apiPath = "https://ec-course-api.hexschool.io/v2/api/";


function Modal({ product, onClose }) {
  if (!product) return null;
  return (

    <div className="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 fw-semibold text-center" id="staticBackdropLabel">{product.title}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">

            <img src={product.imageUrl} className="card-img-top" alt={product.title} />
            <div className='d-flex justify-content-between align-items-center '>
              {product.imagesUrl.map(img =>

                <div className='col-2'>
                  <img src={img} alt="" className=' img-fluid' />
                </div>

              )}
            </div>
            <div className="card-body">
              <h5 className="card-title my-2 fw-semibold">專輯名稱：{product.title}</h5>
              <p className="card-text">{product.content}</p>
              <p className="card-text">原價：<span className='text-decoration-line-through'>{product.origin_price}</span></p>
              <p className="card-text fs-5">售價：<span className='text-danger fw-semibold'>{product.price}</span></p>
            </div>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>關閉</button>

          </div>
        </div>
      </div>
    </div>
  );
}

function App() {

  const [SelectProduct, setSelectProduct] = useState(null);

  // const [count, setCount] = useState(0);
  const [Products, setProducts] = useState();

  const BPtoken = document.cookie
    .replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");


  const getData = async () => {
    axios.get(`${apiPath}hahablackpink/admin/products`, {
      headers: {
        Authorization: BPtoken
      }
    })
      .then((res) => {
        console.log("取得資料:", res);
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.error("取得資料時發生錯誤:", error);
      });
  };

  useEffect(() => {
    getData();
  }
    , []);



  return (
    <>
      <div className='bg-color'>


        <h2 className='text-center pt-5 fw-bold text-light'>產品列表
        </h2>
        <div className='row'>
          {Products && Products.map(product =>
            < div key={product.id} className="card text-center mx-auto my-3" style={{ width: "18rem" }}>
              <img src={product.imageUrl} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <button className="btn btn-primary" onClick={() => setSelectProduct(product)}>詳細內容</button>
              </div>
            </div>
          )}
        </div>
        {SelectProduct && <Modal product={SelectProduct} onClose={() => setSelectProduct(null)} />}
      </div >

    </>
  )
}

export default App
