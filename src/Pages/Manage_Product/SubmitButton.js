import apiURL from "../../Routes/API";
import { toast } from "react-toastify";


function SubmitButton({ obj }) {
    const handleCreateProduct = async () => {
        try {
            const res = await fetch(apiURL.product.create, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
            const msg = await res.json()
            if (res.ok) {
                toast.success(`Thêm mới sản phẩm thành công`)
            }
            else {
                Object.entries(msg.errors).forEach(([field,message])=>{
                    console.log(`${message[0]}`);
                })
                toast.error('Thêm thất bại')              
            }

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div
            className="position-fixed"
            style={{ bottom: '20px', right: '35px', zIndex: 10 }}
        >
            <button
                className="btn btn-success"
                onClick={handleCreateProduct}
            >
                Create
            </button>
        </div>
    );
}

export default SubmitButton;