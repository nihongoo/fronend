import React, { useState, useCallback } from 'react';
import useFetchData from '../../customHook/useFetchData.js';
import apiURL from '../../Routes/API/index.js';
import Color from './Color.js';
import Size from './Size.js';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function CreateLG() {
    const [color, setColor] = useState(false);
    const [size, setSize] = useState(false);
    const [colorSelected, setColorSelected] = useState([]);
    const [sizeSelected, setSizeSelected] = useState([]);

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
            id: item.idTargetCustomer,
            name: item.name,
        }))
    );

    const handleColor = () => {
        setColor(false);
    };

    const handleSize = () => {
        setSize(false);
    };

    const handleAddColor = useCallback((data) => {
        setColorSelected(data);
    }, []);

    const handleAddSize = useCallback((data) => {
        setSizeSelected(data);       
    }, []);

    return (
        <div>
            <div className="border bg-light rounded-3">
                <div className="d-flex justify-content-center m-2">
                    <h2>Thông tin sản phẩm</h2>
                </div>
                <div className="m-4">
                    <Autocomplete
                        disablePortal
                        options={products}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Nhập tên sản phẩm"
                                variant="outlined"
                                fullWidth
                                className="form-control"
                            />
                        )}
                    />
                    <div className="d-flex justify-content-evenly">
                        <div className="flex-fill mt-4">
                            <Autocomplete
                                disablePortal
                                options={categories}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Nhập loại sản phẩm"
                                        variant="outlined"
                                        fullWidth
                                        className="form-control"
                                    />
                                )}
                            />
                        </div>
                        <div className="flex-fill ms-1 mt-4">
                            <Autocomplete
                                disablePortal
                                options={brands}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Nhập thương hiệu"
                                        variant="outlined"
                                        fullWidth
                                        className="form-control"
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
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Nhập đối tượng sử dụng"
                                        variant="outlined"
                                        fullWidth
                                        className="form-control"
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
                        ></textarea>
                    </div>
                </div>
            </div>
            <div>
                <div className='border mt-4 bg-light rounded-3'>
                    {color && (
                        <Color colorSelect={colorSelected} onAddColor={handleAddColor} onClose={handleColor} />
                    )}
                    {size && (
                        <Size SizeSelect={sizeSelected} onClose={handleSize} onAddSize={handleAddSize} />
                    )}
                    <div className="d-flex justify-content-center m-2">
                        <h2>Màu sắc & kích cỡ</h2>
                    </div>
                    <div className='m-4'>
                        <div className='d-flex align-items-center'>
                            <p className='m-0' style={{ width: '85px' }}>
                                Màu sắc :
                            </p>
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
                            <p className='m-0' style={{ width: '85px' }}>
                                Kích thước :
                            </p>
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
        </div>
    );
}

export default CreateLG;