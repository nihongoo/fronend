import { memo, useEffect, useState } from "react"
import { toast } from "react-toastify"

const Edit = memo(({apiURL, onClose, obj, onChangeData})=> {
    console.log(obj);
       
    const [uName,setName] = useState(obj.name)
    useEffect(()=>{
        setName(obj.name)
    },[obj])
    const {serialNumber, ...rest} = obj
    const updateObj = {
        ...rest,
        name: uName,
        status: 0
      }

      console.log(updateObj);
      

    const handleEdit = async () =>{
        try {
            const response = await fetch(apiURL,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateObj),
            })
            if(response.ok){
                toast.success('Sửa thành công')
                onChangeData()
                onClose()
            }
            else{
                console.log(response);
                
                throw new Error("Lỗi");
            }
        } catch (error) {
            console.log(error);
            
        }

    }
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
                        <h2 className="d-flex justify-content-center">Sửa</h2>
                    </div>
                    <div>
                        <label>Tên loại</label>
                        <input
                            type="text"
                            value={uName}
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
                            className="btn btn-outline-warning"
                            onClick={handleEdit}
                        >Sửa</button>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default Edit;