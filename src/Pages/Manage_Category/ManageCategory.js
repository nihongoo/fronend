import DataTable from '../../component/Table/Table.js'
import SearchInput from '../../component/Search/index.js'
import apiURL from '../../Routes/API/index.js'
import { useState, useEffect } from 'react';

function ManageCategory() {

  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(apiURL.category.all);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }     
        const data = await response.json();
        setCategory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (data) => {
    console.log('s data'+data);
    
    setCategory(data)
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Status', accessor: 'status' }
  ];
  return (
    <div className='m-4 border rounded-3'>
      <div className='p-3'>
        <div className='d-flex justify-content-between'>
          <SearchInput ApiURL={apiURL.category.search} onSearch={handleSearch} />
          <div>
            aaaa
          </div>
        </div>
        <DataTable columns={columns} data={category} />
        <div>
          page index
        </div>
      </div>
    </div>
  );
}

export default ManageCategory;