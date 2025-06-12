/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 10 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import Moment from 'moment';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

// Internal Imports
import { assets } from '../assets/assets';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import useAppContext from '../context/useAppContext';

const Blog = () => {
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [formDetails, setFormDetails] = useState({
    name: '',
    comment: '',
  });
  const { id } = useParams();
  const { axios } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogResponse, commentsResponse] = await Promise.all([
          axios.get(`/api/blog/${id}`),
          axios.post(`/api/blog/comments`, { blogId: id }),
        ]);

        if (blogResponse.data?.success) {
          setData(blogResponse.data.blog);
        }

        if (commentsResponse.data?.success) {
          setComments(commentsResponse.data.comments);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to load blog');
      }
    };

    fetchData();
  }, [id, axios]);

  // Function to handle form submission
  const handleSubmitCommentForm = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(`/api/blog/add-comment`, {
        blog: id,
        name: formDetails.name,
        content: formDetails.comment,
      });

      if (!data?.success) {
        toast.error(data?.message || 'Failed to add comment');
      } else {
        if (data?.success) {
          // Clear form
          setFormDetails({ name: '', comment: '' });
          toast.success('Comment added for review');

          // Fetch updated comments
          const { data: commentsData } = await axios.post(
            `/api/blog/comments`,
            {
              blogId: id,
            },
          );
          if (commentsData?.success) {
            setComments(commentsData.comments);
          }
        } else {
          toast.error(data?.message || 'Failed to add comment');
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  // Social media icons
  const socials = [
    { icon: assets.facebook_icon, name: 'Facebook' },
    { icon: assets.twitter_icon, name: 'Twitter' },
    { icon: assets.googleplus_icon, name: 'Google Plus' },
  ];

  // Add share functionality
  const handleShare = async (platform) => {
    const url = window.location.href;
    const title = data?.title;

    const shareData = {
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      Twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      LinkedIn: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
      WhatsApp: `https://api.whatsapp.com/send?text=${title} ${url}`,
    };

    window.open(shareData[platform], '_blank', 'width=600,height=400');
  };

  return data ? (
    <div className="relative min-h-screen">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <img
          src={assets.gradientBackground}
          alt=""
          className="w-full h-full object-cover opacity-30 blur-3xl"
        />
      </div>

      <Navbar />

      {/* Enhanced Header Section */}
      <article className="px-4 md:px-8 max-w-7xl mx-auto">
        <header className="text-center mt-24 mb-16">
          <div className="space-y-6">
            <p
              className="inline-block py-1.5 px-4 rounded-full border-2 border-primary/20 
            bg-primary/5 text-primary font-medium text-sm"
            >
              Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
            </p>

            <h1
              className="text-3xl md:text-5xl font-bold text-gray-800 max-w-4xl mx-auto 
            leading-tight tracking-tight"
            >
              {data.title}
            </h1>

            <h2 className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto font-medium">
              {data.subTitle}
            </h2>

            <div className="flex items-center justify-center gap-2">
              <img src={assets.user_icon} alt="" className="w-5 h-5" />
              <span className="text-gray-600">Written by</span>
              <span className="text-primary font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Enhanced Content Section */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="relative rounded-2xl overflow-hidden mb-12 shadow-xl">
            <img
              src={data.image}
              alt={data.title}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div
            className="rich-text prose prose-lg max-w-none prose-headings:font-semibold 
          prose-a:text-primary prose-img:rounded-xl prose-strong:text-gray-800"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />

          {/* Enhanced Comments Section */}
          <section className="mt-20 border-t pt-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">
              Comments ({comments?.length || 0})
            </h3>

            {/* Enhanced Comment List */}
            <div className="space-y-6 mb-12">
              {comments?.length > 0 ? (
                comments.map((item, index) => (
                  <div
                    key={index}
                    className="bg-blue-50/50 border border-blue-50 rounded-xl p-6 shadow-sm 
                    hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-primary/10 p-2.5 rounded-full">
                        <img
                          src={assets.user_icon}
                          alt=""
                          className="w-5 h-5"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {Moment(item.createdAt).fromNow()}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 pl-12 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 bg-white rounded-xl border border-gray-100">
                  No comments yet. Be the first to comment!
                </div>
              )}
            </div>

            {/* Enhanced Comment Form */}
            <form
              onSubmit={handleSubmitCommentForm}
              className="mt-12 bg-blue-50/50 rounded-xl p-6 border border-blue-100 shadow-sm"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Add your comment
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  value={formDetails.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 placeholder:
                  bg-white/70 focus:border-primary/30 
                  focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                />
                <textarea
                  name="comment"
                  placeholder="Your comment"
                  required
                  value={formDetails.comment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 placeholder:
                  bg-white/70 focus:border-primary/30 
                  focus:ring-2 focus:ring-primary/10 outline-none transition-all min-h-[160px]"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 
                  hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </section>

          {/* Enhanced Share Section */}
          <section className="mt-16 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Share this article
            </h3>
            <div className="flex items-center justify-center gap-1">
              {socials.map((social, index) => (
                <button
                  key={index}
                  onClick={() => handleShare(social.name)}
                  title={`Share on ${social.name}`}
                  className="p-3 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-12 h-12"
                  />
                </button>
              ))}
            </div>
          </section>
        </div>
      </article>

      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

// Export
export default Blog;
