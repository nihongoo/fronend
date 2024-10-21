import { useState } from "react";

function SearchInput({ApiURL, onSearch}) {
    const [query,setQuery] = useState('')
    const handleSearch = async () => {
        if (!query) return;
    
        try {         
            const response = await fetch(`${ApiURL}?query=${encodeURIComponent(query)}`);
            console.log(response);    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }         
            const data = await response.json();           
            onSearch(data);
            
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className="d-flex">
            <input 
            style={{ width: '100%', maxWidth: 600 }} 
            className="form-control" 
            placeholder="Nhập từ khóa để tìm kiếm ..."
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            />
            <button className="btn" onClick={handleSearch}>
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
    );
}

export default SearchInput;