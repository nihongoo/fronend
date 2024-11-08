import React, { useState, useCallback } from 'react';
import useFetchData from '../../customHook/useFetchData.js';
import apiURL from '../../Routes/API/index.js';
import Color from './Color.js';
import Size from './Size.js';
import SubmitButton from './SubmitButton.js'
import ProductDetail from './ProductDetail.js';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function CreateLG() {
    const [color, setColor] = useState(false);
    const [size, setSize] = useState(false);
    const [colorSelected, setColorSelected] = useState([]);
    const [sizeSelected, setSizeSelected] = useState([]);
    const [error, setError] = useState(false)
    const [newProduct, setNewProduct] = useState({
        product: {
            name: '',
            description: '',
            productCode: '111',
            image: 'a',
            thoiGianBaoHanh: '',
            createTime: new Date().toISOString(),
            status: 0,
            idBrand: '',
            idCategory: '',
            idMeterial: '',
            idTagetCustomer: ''
        },
        productDetails: []
    });

    const { data: products } = useFetchData(apiURL.product.all, (rawData) =>
        rawData.map((item) => ({
            id: item.idProduct,
            name: item.name,
        }))
    );

    const { data: categories } = useFetchData(apiURL.category.all, (rawData) =>
        rawData.map((item) => ({
            id: item.idCategory,
            name: item.name,
        }))
    );

    const { data: brands } = useFetchData(apiURL.brand.all, (rawData) =>
        rawData.map((item) => ({
            id: item.idBrand,
            name: item.name,
        }))
    );

    const { data: target } = useFetchData(apiURL.target.all, (rawData) =>
        rawData.map((item) => ({
            id: item.idTagetCustomer,
            name: item.name,
        }))
    );

    const { data: meterials } = useFetchData(apiURL.meterial.all, (rawData) =>
        rawData.map((item) => ({
            id: item.idMeterial,
            name: item.name,
        }))
    );

    const handleAddColor = useCallback((data) => {
        setColorSelected(data);
        const newDetails = data.flatMap(color =>
            sizeSelected.map(size => ({
                id: `${color.id}-${size.id}`,
                quantity: 1,
                giaNhap: 0,
                giaBan: 0,
                idColor: color.id,
                idSize: size.id,
                productDetailCode:'222'
            }))
        );

        setNewProduct(prev => ({
            ...prev,
            productDetails: newDetails
        }));
    }, [sizeSelected]);

    const handleAddSize = useCallback((data) => {
        setSizeSelected(data)
        const newDetails = colorSelected.flatMap(color =>
            data.map(size => ({
                id: `${color.id}-${size.id}`,
                quantity: 1,
                giaNhap: 0,
                giaBan: 0,
                idColor: color.id,
                idSize: size.id,
                productDetailCode:'222'
            }))
        );

        setNewProduct(prev => ({
            ...prev,
            productDetails: newDetails
        }));
    }, [colorSelected]);

    const handleDeleteDetail = (id) => {
        setNewProduct(prev => ({
            ...prev,
            productDetails: prev.productDetails.filter(detail => detail.id !== id)
        }));
    };

    const handleUpdateDetail = (updatedDetail) => {
        setNewProduct(prev => ({
            ...prev,
            productDetails: prev.productDetails.map(detail => 
                detail.id === updatedDetail.id ? updatedDetail : detail
            )
        }));
    };
    
    return (
        <div>
            {/* Thông tin sản phẩm */}
            <div className="border bg-light rounded-3">
                <div className="d-flex justify-content-center m-2">
                    <h2>Thông tin sản phẩm</h2>
                </div>
                <div className="m-4">
                    <Autocomplete
                        disablePortal
                        options={products}
                        onInputChange={(event, newInputValue) => {
                            setNewProduct(prev => ({
                                ...prev,
                                product: {
                                    ...prev.product,
                                    name: newInputValue
                                }
                            }));
                            setError(false)
                        }}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Nhập tên sản phẩm"
                                variant="outlined"
                                fullWidth
                                className="form-control"
                                required
                                error={error && !newProduct.product.name}
                                helperText={error && !newProduct.product.name ? 'Tên sản phẩm là bắt buộc' : ''}
                            />
                        )}
                        freeSolo
                    />
                    <div className="d-flex justify-content-evenly">
                        <div className="flex-fill mt-4">
                            <Autocomplete
                                disablePortal
                                options={categories}
                                onChange={(event, newValue) => {
                                    setNewProduct(prev => ({
                                        ...prev,
                                        product: {
                                            ...prev.product,
                                            idCategory: newValue ? newValue.id : ''
                                        }
                                    }));
                                    setError(false);
                                }}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Nhập loại sản phẩm"
                                        variant="outlined"
                                        fullWidth
                                        className="form-control"
                                        required
                                        error={error.category}
                                        helperText={error.category ? 'Loại sản phẩm là bắt buộc' : ''}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex-fill ms-1 mt-4">
                            <Autocomplete
                                disablePortal
                                options={brands}
                                onChange={(event, newValue) => {
                                    setNewProduct(prev => ({
                                        ...prev,
                                        product: {
                                            ...prev.product,
                                            idBrand: newValue ? newValue.id : ''
                                        }
                                    }));
                                    setError(false);
                                }}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Nhập thương hiệu"
                                        variant="outlined"
                                        fullWidth
                                        className="form-control"
                                        required
                                        error={error.brand}
                                        helperText={error.brand ? 'Thương hiệu là bắt buộc' : ''}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-evenly">
                        <div className="flex-fill mt-4">
                            <Autocomplete
                                disablePortal
                                options={target}
                                onChange={(event, newValue) => {
                                    setNewProduct(prev => ({
                                        ...prev,
                                        product: {
                                            ...prev.product,
                                            idTagetCustomer: newValue ? newValue.id : ''
                                        }
                                    }));
                                    setError(false);
                                }}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Nhập đối tượng sử dụng"
                                        variant="outlined"
                                        fullWidth
                                        className="form-control"
                                        required
                                        error={error.target}
                                        helperText={error.target ? 'Đối tượng sử dụng là bắt buộc' : ''}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex-fill ms-1 mt-4">
                            <Autocomplete
                                disablePortal
                                options={meterials}
                                onChange={(event, newValue) => {
                                    setNewProduct(prev => ({
                                        ...prev,
                                        product: {
                                            ...prev.product,
                                            idMeterial: newValue ? newValue.id : ''
                                        }
                                    }));
                                    setError(false);
                                }}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Nhập chất liệu"
                                        variant="outlined"
                                        fullWidth
                                        className="form-control"
                                        required
                                        error={error.meterial}
                                        helperText={error.meterial ? 'Chất liệu là bắt buộc' : ''}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <textarea
                            className="form-control"
                            placeholder='Nhập mô tả sản phẩm'
                            rows={4}
                            onChange={(event) => {
                                setNewProduct(prev => ({
                                    ...prev,
                                    product: {
                                        ...prev.product,
                                        description: event.target.value
                                    }
                                }));
                            }}
                        ></textarea>
                    </div>
                </div>
            </div>
            {/* Màu & kích thước */}
            <div>
                <div className='border mt-4 bg-light rounded-3'>
                    {color && (
                        <Color colorSelect={colorSelected} onAddColor={handleAddColor} onClose={() => { setColor(false); }} />
                    )}
                    {size && (
                        <Size SizeSelect={sizeSelected} onClose={() => { setSize(false); }} onAddSize={handleAddSize} />
                    )}
                    <div className="d-flex justify-content-center m-2">
                        <h2>Màu sắc & kích cỡ</h2>
                    </div>
                    <div className='m-4'>
                        <div className='d-flex align-items-center'>
                            <p className='m-0' style={{ width: '85px' }}>Màu sắc :</p>
                            {colorSelected.map((color) => (
                                <div
                                    key={color.id}
                                    style={{
                                        color: '#fff',
                                        border: `2px solid ${color.name}`,
                                        backgroundColor: color.name,
                                        cursor: 'auto'
                                    }}
                                    className='btn ms-2'
                                >
                                    {color.name}
                                </div>
                            ))}
                            <div className='ms-2'>
                                <button
                                    className='btn btn-outline-success'
                                    style={{ width: '85px' }}
                                    onClick={() => { setColor(true); }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className='mt-2 d-flex align-items-center'>
                            <p className='m-0' style={{ width: '85px' }}>Kích thước :</p>
                            {sizeSelected.map((size) => (
                                <div
                                    key={size.id}
                                    style={{
                                        color: '#fff',
                                        border: `2px solid #fff`,
                                        backgroundColor: '#000',
                                        cursor: 'auto'
                                    }}
                                    className='btn ms-2'
                                >
                                    {size.name}
                                </div>
                            ))}
                            <div className='ms-2'>
                                <button
                                    className='btn btn-outline-success'
                                    style={{ width: '85px' }}
                                    onClick={() => { setSize(true); }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ProductDetail */}
            <div>
                {colorSelected.map((c) => (
                    <ProductDetail
                        key={c.id}
                        color={c}
                        productDetails={newProduct.productDetails.filter(detail => detail.idColor === c.id)}
                        nameProduct={newProduct.product.name}
                        size={sizeSelected}
                        onDelete={handleDeleteDetail}
                        onUpdate={handleUpdateDetail}
                    />
                ))}
            </div>
            <div>
                {newProduct.productDetails.length !== 0 && 
                    <SubmitButton obj={newProduct}/>
                }
            </div>
        </div>
    );
}

export default CreateLG;