import { useEffect, useState } from "react";
import apiURL from "../../Routes/API";
import useFetchData from "../../customHook/useFetchData";
import { toast } from "react-toastify";

function Size({ onClose, onAddSize, SizeSelect }) {
    const [selectedSizes, setSelectedSizes] = useState(SizeSelect);
    const [name, setName] = useState('')
    const handleSizeSelect = (size) => {
        if (selectedSizes.some(selected => selected.id === size.id)) {
            setSelectedSizes(selectedSizes.filter(selected => selected.id !== size.id));
        } else {
            setSelectedSizes([...selectedSizes, size]);
        }
    };

    const { data: sizes } = useFetchData(apiURL.size.all, (rawData) =>
        rawData.map((item) => ({
            id: item.idSize,
            name: item.name,
        }))
    );

    useEffect(() => {
        onAddSize(selectedSizes);
    }, [selectedSizes, onAddSize]);

    const handleClose = () => {
        onClose();
    };

    const handleAddSize = async () =>{
        try {
            const res = await fetch(apiURL.size.create, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name})
            })

            if (res.ok) {
                toast.success(`Thêm kích thước mới thành công`)
                setName('')
                onClose()
            }
            else {
                throw new Error('Thêm thất bại')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="position-absolute" style={{ zIndex: '5' }}>
            <div
                className="overlay position-fixed bg-dark"
                style={{
                    width: '100vw',
                    height: '100vh',
                    top: '0',
                    left: '0',
                    opacity: '0.5'
                }}
                onClick={handleClose}
            ></div>
            <div
                className="position-fixed border rounded-2 p-4"
                style={{
                    top: '18vh',
                    left: '37vw',
                    background: '#fff'
                }}
            >
                <div>
                    <h2 className="d-flex justify-content-center">Chọn kích thước</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {sizes.map((size) => (
                            <div
                                key={size.id}
                                onClick={() => handleSizeSelect(size)}
                                style={{
                                    color: selectedSizes.some(selected => selected.id === size.id) ? '#fff' : '#000',
                                    padding: '10px',
                                    margin: '5px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    border: selectedSizes.some(selected => selected.id === size.id) ? `2px solid #fff` : '2px solid',
                                    backgroundColor: selectedSizes.some(selected => selected.id === size.id) ? '#000' : '#fff'
                                }}
                            >
                                {size.name}
                            </div>
                        ))}
                    </div>
                    <div>
                        <label>Thêm kích thước</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="d-flex justify-content-end mt-2">
                        <button
                            onClick={handleClose}
                            className="btn btn-outline-danger me-2"
                        >Hủy</button>
                        <button
                        onClick={handleAddSize}
                            className="btn btn-outline-success"
                        >Thêm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Size;