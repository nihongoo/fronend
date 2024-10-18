// DataTable.js
import React from 'react';
import PropTypes from 'prop-types';

const DataTable = ({ columns, data }) => {
    return (
        <div className='p-3'>
            <table className="table">
                <thead>
                    <tr>
                        <th>STT</th>
                        {columns.map((column) => (
                            <th key={column.accessor} scope="col">{column.Header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.idCategory}>
                            <th scope="row">{index + 1}</th>
                            {columns.map((column) => (
                                <td key={column.accessor}>{item[column.accessor]}</td>
                            ))}
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