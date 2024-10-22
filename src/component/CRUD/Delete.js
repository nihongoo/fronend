import { toast } from "react-toastify";
function Delete({apiURL, id, onChangeData}) {

    const handleDelete = async () => {
        try {
            console.log(apiURL);
            
            console.log(id);
            
            const response = await fetch(`${apiURL}?ID=${id}`,{
                method:'DELETE'
            })

            if (response.ok) {
                onChangeData(true)
                toast.success('Xóa thành công!')
            }
            else {
                toast.error('Lỗi')
                throw new Error("Lỗi");
            }
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div>
            <button
                className="btn btn-outline-danger"
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    );
}

export default Delete;