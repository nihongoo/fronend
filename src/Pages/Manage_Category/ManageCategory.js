import DataTable from '../../component/Table/Table.js'
import { useState, useEffect } from 'react';

function ManageCategory() {

    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await fetch('https://localhost:7265/Category/Get-All-Category');
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
    
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;
      const columns = [
        { Header: 'Name', accessor: 'name' },
        { Header: 'Status', accessor: 'status' }
      ];
    
      return (
        <div className='m-4 border rounded-3'>
          <h1>Danh sách danh mục</h1>
          <DataTable columns={columns} data={category} />
        </div>
      );
}

export default ManageCategory;