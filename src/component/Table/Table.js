import Delete from '../CRUD/Delete';
import apiURL from '../../Routes/API';
import React from 'react';
import PropTypes from 'prop-types';

const DataTable = ({ columns, data, onChangeData }) => {
    console.log(data);

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
                                    <button>Edit</button>
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