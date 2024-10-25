import PropTypes from 'prop-types';
import moment from 'moment';

function TableLG({ columns, data }) {

    return (
        <div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column.accessor} scope="col">{column.Header}</th>
                            ))}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => {
                            return (
                                <tr key={item.id}>
                                    {columns.map((column) => (
                                        <td key={column.accessor}>
                                            {column.accessor === 'createTime'
                                                ? moment(item[column.accessor]).format('DD-MM-YYYY')
                                                : column.accessor === 'image'
                                                    ? <img src={item[column.accessor]} alt="Product" style={{ width: '50px', height: '50px' }} />
                                                    : item[column.accessor]
                                            }
                                        </td>
                                    ))}
                                    <td>
                                        <div className='d-flex'>
                                            <button
                                                className='btn me-1 btn-outline-warning'
                                            >
                                                Detail
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

TableLG.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
};

export default TableLG;