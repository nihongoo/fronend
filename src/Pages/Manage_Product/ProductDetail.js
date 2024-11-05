import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';

function ProductDetail({ product, color, onDelte }) {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        if (product && product.length > 0) {
            setRows(product);
        }
    }, [product]);

    if (!rows || rows.length === 0) {
        return null;
    }

    const columns = [
        { field: 'name', headerName: 'Sản phẩm', width: 130, editable: false },
        { field: 'size', headerName: 'Kích cỡ', width: 130, editable: false },
        {
            field: 'quantity',
            headerName: 'Số lượng',
            type: 'number',
            width: 130,
            editable: true,
        },
        {
            field: 'giaNhap',
            headerName: 'Giá nhập',
            type: 'number',
            width: 130,
            editable: true,
        },
        {
            field: 'giaBan',
            headerName: 'Giá bán',
            type: 'number',
            width: 130,
            editable: true,
        },
        {
            field: 'delete',
            headerName: 'Xóa',
            width: 100,
            renderCell: (params) => (
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => onDelte(params.row.id)}
                >
                    Xóa
                </Button>
            ),
        },
    ];

    const handleProcessRowUpdate = (newRow) => {
        const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
        setRows(updatedRows);
        return newRow;
    };

    const paginationModel = { page: 0, pageSize: 5 };

    console.log(rows);
    
    return (
        <div className="border mt-4 bg-light rounded-3">
            <div className='d-flex align-items-center ms-4 mt-2'>
                <p className='m-2'>Danh sách sản phẩm màu</p>
                <span
                    style={{
                        backgroundColor: color.name,
                        width: '1.875rem',
                        height: '1rem'
                    }}
                />
            </div>
            <div className='m-4 mt-0'>
                <Paper sx={{ minWidth: '705px', width: 'auto', maxWidth: '1558px' }}>
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        processRowUpdate={handleProcessRowUpdate}
                    />
                </Paper>
            </div>
        </div>
    );
}

export default ProductDetail;