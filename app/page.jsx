'use client'

import { useEffect, useState } from 'react'
import { SquarePlus, X, User, SendHorizontal } from 'lucide-react'
import $api from '../http'

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState(null)

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files)
        if (files.length + images.length > 5) {
            alert('You can upload up to 5 images.')
            return
        }
        setImages([...images, ...files])
    }

    const submitPost = async () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        // images.forEach((image) => formData.append('files', image))

        try {
            const response = await $api.post('/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            console.log('Post created:', response.data)
            setIsModalOpen(false)
            setTitle('')
            setDescription('')
            setImages([])
        } catch (error) {
            console.error(
                'Error creating post:',
                error.response?.data || error.message
            )
        }
    }

    useEffect(() => {
        const loadData = () => {
            setLoading(true)
            $api.get('/posts')
                .then((r) => {
                    setPosts(r.data)
                    console.log(r.data)
                })
                .catch((err) => console.error(err.response.data))
                .finally(() => setLoading(false))
        }

        loadData()
    }, [])

    return (
        <div className="auth-page min-h-[100vh]">
            <main className="max-w-[1000px] bg-black/30 backdrop-blur-2xl min-h-[300px] mx-auto mt-[130px] rounded-md text-[#f0f0f5] px-5 py-5">
                <div className="flex justify-end items-center">
                    <button
                        className="flex items-center gap-5 px-5 bg-blue-900 h-[50px] rounded-md cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <SquarePlus /> Write New Post
                    </button>
                </div>
                <div className="space-y-6 mt-6">
                    {posts
                        ? posts.map((post, index) => (
                              <div
                                  key={index}
                                  className="flex flex-col space-y-4 border border-l-0 border-r-0 py-3 border-b-0"
                              >
                                  <div className="flex items-center">
                                      <div
                                          className="bg-white/30 size-[50px] rounded-full flex justify-center items-center cursor-pointer"
                                          onClick={() => setMenuOpen(!menuOpen)}
                                      >
                                          <User size={30} />
                                      </div>

                                      <div className="ml-3">
                                          <h3 className="text-2xl font-bold">
                                              {post?.author?.name}
                                          </h3>
                                          <p className="text-sm opacity-45">
                                              {post?.author?.specialisation}
                                          </p>
                                      </div>
                                  </div>
                                  <h2 className="font-bold text-2xl">
                                      {post?.title}
                                  </h2>
                                  <div>{post.description}</div>
                                  <button className="flex self-center gap-5 bg-white/50 px-8 py-3 rounded-3xl cursor-pointer">
                                      Send Message <SendHorizontal />
                                  </button>
                              </div>
                          ))
                        : null}
                </div>
            </main>

            {isModalOpen && <CretePostModal />}
        </div>
    )

    function CretePostModal() {
        return (
            <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center">
                <div className="bg-[#1a1a2e] p-5 rounded-lg w-[500px] text-white relative">
                    <button
                        className="absolute top-3 right-3 cursor-pointer"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <X />
                    </button>
                    <h2 className="text-2xl mb-4">Create New Post</h2>
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full p-2 mb-3 bg-gray-700 rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        className="w-full p-2 mb-3 bg-gray-700 rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="w-full mb-3"
                        onChange={handleImageUpload}
                    />
                    <p>{images.length} / 5 images uploaded</p>
                    <button
                        className="w-full bg-blue-600 p-2 rounded mt-3 cursor-pointer"
                        onClick={submitPost}
                    >
                        Submit Post
                    </button>
                </div>
            </div>
        )
    }
}
