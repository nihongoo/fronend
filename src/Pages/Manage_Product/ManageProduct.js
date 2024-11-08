import TableLG from './TableLG.js';
import SearchInput from '../../component/Search/index.js';
import apiURL from '../../Routes/API/index.js';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function ManageProduct() {
    const [product, setproduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataChange, setDataChange] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(apiURL.product.all);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);

                const formatData = data.map((item) => ({
                    id: item.idProduct,
                    name: item.name,
                    productCode: item.productCode,
                    createTime: item.createTime,
                    image: item.image,
                    status: item.status,
                }))
                setproduct(formatData);
                setDataChange(false);
                localStorage.setItem('product',JSON.stringify(formatData))
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [dataChange]);

    const handleSearch = (data) => {
        setproduct(data);
    };

    const handleChangeData = () => {
        setDataChange(true);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = product.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(product.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const columns = [
        { Header: 'STT', accessor: 'serialNumber' },
        { Header: 'Tên sản phẩm', accessor: 'name' },
        { Header: 'Mã sản phẩm', accessor: 'productCode' },
        {
            Header: 'Ngày thêm',
            accessor: 'createTime',
            Cell: ({ value }) => moment(value).format('DD-MM-YYYY')
        },
        {
            Header: 'Ảnh',
            accessor: 'image',
            Cell: ({ value }) => <img src={value} alt="Product" style={{ width: '50px', height: '50px' }} />,
        }, { Header: 'Status', accessor: 'status' }
    ];

    return (
        <div className='border bg-light rounded-3'>
            <div className='d-flex justify-content-center m-2'>
                <h2>Thông tin sản phẩm</h2>
            </div>
            <div className='p-3'>
                <div className='d-flex mb-2 justify-content-between'>
                    <SearchInput ApiURL={apiURL.product.search} onSearch={handleSearch} />
                    <div>
                        <Link
                            to='/manageproduct/add'
                            className='btn btn-outline-success'
                        >
                            + Thêm mới
                        </Link>
                    </div>
                </div>
                <TableLG
                    columns={columns}
                    data={currentItems.map((item, index) => ({
                        ...item,
                        serialNumber: index + 1 + (currentPage - 1) * itemsPerPage
                    }))}
                    onChangeData={handleChangeData}
                    apiURLDel={apiURL.product.delete}
                    apiURLEdit={apiURL.product.edit}
                />
                <div className="d-flex justify-content-between mt-3">
                    <div>
                        <label>Số lượng mục trên trang:</label>
                        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                    <div>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'} mx-1`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageProduct;