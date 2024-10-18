import "./App.css";
import { useEffect, useState } from "react";

function Content() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handlePreAvt = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setImage(file);
        }
    };

    const handleUpload = async () => {
        if (!image) return;

        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'Khanh_Hoang'); // Đảm bảo preset này đã được tạo và đúng

        try {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/dtlxhfejw/image/upload`, // Đảm bảo rằng tên không gian là chính xác
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!res.ok) {
                const errorText = await res.text(); // Lấy chi tiết lỗi
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const data = await res.json();
            console.log(res)
            setImage(data.secure_url);
        } catch (error) {
            console.error('Đã có lỗi:', error);
            console.log(error)
        }
    };

    return (
        <div>
            <div>
                <input
                    className="form-control"
                    type="file"
                    onChange={handlePreAvt}
                />
                {preview && (
                    <img src={preview} width="80%" alt="Preview" />
                )}
            </div>
            <button 
                className="btn btn-dark mt-2"
                onClick={handleUpload}
            >Upload to Cloudinary</button>
        </div>
    );
}

export default Content;