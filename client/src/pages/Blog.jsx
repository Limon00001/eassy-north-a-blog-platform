/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 10 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import Moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Internal Imports
import { assets, blog_data, comments_data } from '../assets/assets';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';

const Blog = () => {
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [formDetails, setFormDetails] = useState({
    name: '',
    comment: '',
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const data = blog_data.find((blog) => blog._id === id);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchComments = async () => {
      try {
        setComments(comments_data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogData();
    fetchComments();
  }, [id, comments]);

  const handleSubmitCommentForm = async (event) => {
    event.preventDefault();
    let { value } = event.target;
    let { name } = event.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  return data ? (
    <div className="relative">
      {/* Background */}
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />

      {/* Navbar */}
      <Navbar />

      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
        </p>
        <h1 className="text-2xl md:text-4xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 text-primary font-medium">
          Monayem Hossain
        </p>
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt={data.title} className="rounded-3xl mb-5" />
        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="" className="w-6" />
                  <p className="font-medium">{item.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8">{item.content}</p>
                <div className="absolute bottom-3 right-4 flex items-center gap-2 text-xs">
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add your comment</p>
          <form
            onSubmit={handleSubmitCommentForm}
            className="flex flex-col gap-4 items-start max-w-lg"
          >
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              requied
              className="w-full p-2 border border-gray-300 rounded outline-none"
              value={formDetails.name}
              onChange={handleSubmitCommentForm}
            />
            <textarea
              name="comment"
              id="comment"
              placeholder="Comment"
              requied
              className="w-full p-2 border border-gray-300 rounded outline-none h-48"
              value={formDetails.comment}
              onChange={handleSubmitCommentForm}
            />
            <button
              type="submit"
              className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4">Share this blog on social media</p>
          <div className="flex">
            <img src={assets.facebook_icon} width={50} alt="Facebook" />
            <img src={assets.twitter_icon} width={50} alt="Twitter" />
            <img src={assets.googleplus_icon} width={50} alt="Google Plus" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

// Export
export default Blog;
