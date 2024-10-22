import DataTable from '../../component/Table/Table.js'
import SearchInput from '../../component/Search/index.js'
import apiURL from '../../Routes/API/index.js'
import { useState, useEffect } from 'react';
import Create from '../../component/CRUD/CreateSM.js'

function ManageCategory() {

  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [create, setCreate] = useState(false)
  const [dataChange, setDataChange] = useState(false)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(apiURL.category.all);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategory(data);
        setDataChange(false)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [dataChange]);
  const handleSearch = (data) => {
    console.log('s data' + data);

    setCategory(data)
  }
  const handleChangeData = () => {
    setDataChange(true)
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Status', accessor: 'status' }
  ];
  return (
      <div className='border bg-light rounded-3'>
        <div className='position-fixed'>
        </div>
        <div className='p-3'>
          <div className='d-flex mb-2 justify-content-between'>
            <SearchInput ApiURL={apiURL.category.search} onSearch={handleSearch} />
            <div>
              <button
                className='btn btn-outline-success'
                onClick={() => setCreate(true)}
              >
                + Thêm mới
              </button>
              {create && (
                <Create
                  apiURL={apiURL.category.create}
                  pageName={'loại sản phẩm'}
                  onClose={() => setCreate(false)}
                  onChangeData={handleChangeData}
                />
              )}
            </div>
          </div>
          <DataTable 
          columns={columns} 
          data={category} 
          onChangeData={handleChangeData}
          />
          <div>
            page index
          </div>
        </div>
      </div>
  );
}

export default ManageCategory;
