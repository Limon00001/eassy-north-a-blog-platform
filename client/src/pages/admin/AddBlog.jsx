/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 10 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import Quill from 'quill';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

// Internal Imports
import { assets, blogCategories } from '../../assets/assets';
import useAppContext from '../../context/useAppContext';

// Constants
const initialFormState = {
  title: '',
  subTitle: '',
  content: '',
  image: null,
  imagePreview: assets.upload_area,
  category: '',
  isPublished: false,
};

const AddBlog = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { axios } = useAppContext();

  // Handle file cleanup when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup object URL when component unmounts
      if (formData.imagePreview !== assets.upload_area) {
        URL.revokeObjectURL(formData.imagePreview);
      }
    };
  }, [formData.imagePreview]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === 'image' && files?.[0]) {
      // Revoke previous URL if it exists
      if (formData.imagePreview !== assets.upload_area) {
        URL.revokeObjectURL(formData.imagePreview);
      }

      const objectUrl = URL.createObjectURL(files[0]);
      setFormData((prev) => ({
        ...prev,
        image: files[0],
        imagePreview: objectUrl,
      }));
    } else {
      // Handle checkbox separately
      const newValue = type === 'checkbox' ? checked : value;
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const blogData = {
        title: formData.title.trim(),
        subTitle: formData.subTitle.trim(),
        description: quillRef.current.root.innerHTML,
        category: formData.category,
        isPublished: Boolean(formData.isPublished),
      };

      // Create form data
      const form = new FormData();
      form.append('blog', JSON.stringify(blogData));
      form.append('image', formData.image);

      const { data } = await axios.post('/api/blog/add', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data?.success) {
        setFormData({
          ...initialFormState,
          category: formData.category,
        });
        quillRef.current.root.innerHTML = '';
        toast.success('Blog added successfully');
      } else {
        toast.error(data?.message || 'Failed to add blog');
      }
    } catch (error) {
      console.error('Error adding blog:', error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateContent = async () => {};

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 md:m-10 shadow rounded">
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={formData.imagePreview}
            alt="Upload"
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            type="file"
            id="image"
            name="image"
            hidden
            required
            accept="image/*"
            onChange={handleInputChange}
          />
        </label>

        <p className="mt-4">Blog title</p>
        <input
          type="text"
          name="title"
          placeholder="Type here"
          required
          value={formData.title}
          onChange={handleInputChange}
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        <p className="mt-4">Sub title</p>
        <input
          type="text"
          name="subTitle"
          placeholder="Type here"
          required
          value={formData.subTitle}
          onChange={handleInputChange}
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 md:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          <button
            onClick={handleGenerateContent}
            type="button"
            disabled={loading}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate with AI'}
          </button>
        </div>

        <p className="mt-4">Blog Category</p>
        <select
          name="category"
          id="category"
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option value="">Select a category</option>
          {blogCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            name="isPublished"
            id="isPublished"
            className="scale-125 cursor-pointer"
            checked={formData.isPublished}
            onChange={handleInputChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? 'Posting...' : 'Post Blog'}
        </button>
      </div>
    </form>
  );
};

// Export
export default AddBlog;
