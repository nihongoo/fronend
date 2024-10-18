import React, { useEffect, useState } from "react";

const lesson = [
    {
        id: 1,
        content: 'cmt 1'
    },
    {
        id: 2,
        content: 'cmt 2'
    },
    {
        id: 3,
        content: 'cmt 3'
    }
]

function Subrice() {
    const [lessonId, setLessonId] = useState(1)
    useEffect(() => {
        const handleCmt = ({ detail }) => {
            console.log(detail)
        }

        window.addEventListener(`lesson-${lessonId}`, handleCmt)
        return () => {
            window.removeEventListener(`lesson-${lessonId}`,handleCmt)
        }
    }, [lessonId])
    return (
        <div>
            <ul>
                {lesson.map(lesson => (
                    <li
                        key={lesson.id}
                        style={{
                            color: lessonId === lesson.id ?
                                'red' :
                                '#333'
                        }}
                        onClick={() => setLessonId(lesson.id)}
                    >
                        {lesson.content}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Subrice