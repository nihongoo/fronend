import React, { useState } from "react";

function GetImg() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7265/Product/Get-All-Product`, {
                method: 'GET',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const data = await response.json();
            setProducts(data); // Giả sử dữ liệu là một mảng sản phẩm
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };
    const defaultImg = `https://res.cloudinary.com/dtlxhfejw/image/upload/v1728380665/notfound_lgqmju.png`

    return (
        <div className="container mt-4">
            <button className="btn btn-dark mb-3" onClick={fetchData}>Fetch Products</button>
            {error && <p className="text-danger">{error}</p>} {/* Hiển thị thông báo lỗi nếu có */}

            <div className="row">
                {products.map(product => (
                    <div className="col-md-4 mb-3" key={product.idProduct}>
                        <div className="card position-relative" style={{minHeight:720}}>
                            <img 
                                src={product.image || defaultImg} 
                                alt={product.name} 
                                className="card-img-top"
                                style={{ height: 'auto', objectFit: 'cover' }} 
                            />
                            <div className="card-body position-absolute bottom-0">
                                <h5 className="card-title text-light">{product.name}</h5>
                                <p className="card-text text-light">{product.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GetImg;