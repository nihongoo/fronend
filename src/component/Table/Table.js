import Delete from '../CRUD/Delete';
import Edit from '../CRUD/Edit'
import apiURL from '../../Routes/API';
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const DataTable = ({ columns, data, onChangeData }) => {
    const [editId, setEditId] = useState(null)
    const handleEdit = useCallback((id) => {
        setEditId((prevId) => (prevId === id ? null : id));
    }, []);
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>STT</th>
                        {columns.map((column) => (
                            <th key={column.accessor} scope="col">{column.Header}</th>
                        ))}
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.idCategory}>
                            <th scope="row">{index + 1}</th>
                            {columns.map((column) => (
                                <td key={column.accessor}>{item[column.accessor]}</td>
                            ))}
                            <th>
                                <div className='d-flex'>
                                    <button
                                        className='btn me-1 btn-outline-warning'
                                        onClick={()=>handleEdit(item.idCategory)}
                                    >
                                        Edit
                                    </button>
                                    {editId === item.idCategory &&
                                        <Edit
                                            apiURL={apiURL.category.edit}
                                            onClose={()=>setEditId(null)}
                                            obj={item}
                                            onChangeData={onChangeData}
                                        />
                                    }
                                    <Delete
                                        apiURL={apiURL.category.delete}
                                        id={item.idCategory}
                                        onChangeData={onChangeData}
                                    ></Delete>
                                </div>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

DataTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
};

export default DataTable;