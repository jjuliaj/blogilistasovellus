import { useState } from 'react'

const Blog = ({ blog, buttonHandler }) => {
    const [detailsVisible, setDetailsVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author}
                <button onClick={() => setDetailsVisible(!detailsVisible)}>
                    {detailsVisible ? 'hide' : 'view'}
                </button>
            </div>
            {detailsVisible && (
                <div>
                    <p>{blog.url}</p>
                    <p>likes {blog.likes} <button>like</button></p>
                    <p>{blog.user ? blog.user.name : 'Unknown author'}</p>
                    <button onClick={() => buttonHandler(blog.id)}>delete</button>
                </div>
            )}
        </div>
    )
}

export default Blog
