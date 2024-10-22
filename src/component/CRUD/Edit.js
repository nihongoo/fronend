function Edit() {
    return (
        <div className="position-absolute" style={{ zIndex: '5' }}>
            <div
                className="overlay position-fixed bg-dark"
                onClick={onClose}
                style={{
                    width: '100vw',
                    height: '100vh',
                    top: '0',
                    left: '0',
                    opacity: '0.5'
                }}
            ></div>
            <div
                className="position-fixed border rounded-2 p-4"
                style={{
                    top: '40vh',
                    left: '40vw',
                    background: '#fff'
                }}
            >
                <div>
                    <div>
                        <h2 className="d-flex justify-content-center">Thêm mới {pageName}</h2>
                    </div>
                    <div>
                        <label>Tên loại</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="d-flex justify-content-end mt-2">
                        <button
                            onClick={onClose}
                            className="btn btn-outline-danger me-2"
                        >Hủy</button>
                        <button
                            className="btn btn-outline-success"
                            onClick={handleAdd}
                        >Thêm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;