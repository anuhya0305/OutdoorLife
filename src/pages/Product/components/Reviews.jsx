import { useEffect, useState } from "react";
import {
    getReviewsByProduct,
    addReview,
} from "../../../services/ProductService";

const Reviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);

    const [form, setForm] = useState({
        name: "",
        rating: 5,
        comment: "",
    });

    useEffect(() => {
        loadReviews();
    }, [productId]);

    const loadReviews = async () => {
        const data = await getReviewsByProduct(productId);
        setReviews(data);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const review = {
            productId,
            name: form.name,
            rating: Number(form.rating),
            comment: form.comment,
            date: new Date().toLocaleDateString(),
        };

        await addReview(review);

        setForm({
            name: "",
            rating: 5,
            comment: "",
        });

        loadReviews();
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">

            <h2 className="text-3xl font-bold mb-6">
                Customer Reviews
            </h2>

            {reviews.length === 0 ? (
                <p className="text-gray-500 mb-8">
                    No reviews yet.
                </p>
            ) : (
                reviews.map((review) => (
                    <div
                        key={review.id}
                        className="border-b py-4"
                    >
                        <h3 className="font-semibold">
                            {review.name}
                        </h3>

                        <p className="text-yellow-500">
                            {"⭐".repeat(review.rating)}
                        </p>

                        <p className="mt-2">
                            {review.comment}
                        </p>

                        <p className="text-sm text-gray-500 mt-2">
                            {review.date}
                        </p>
                    </div>
                ))
            )}

            <h3 className="text-2xl font-semibold mt-10 mb-4">
                Write a Review
            </h3>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    required
                />

                <select
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                >
                    <option value={5}>★★★★★</option>
                    <option value={4}>★★★★☆</option>
                    <option value={3}>★★★☆☆</option>
                    <option value={2}>★★☆☆☆</option>
                    <option value={1}>★☆☆☆☆</option>
                </select>

                <textarea
                    name="comment"
                    placeholder="Write your review..."
                    value={form.comment}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border rounded-lg p-3"
                    required
                />

                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                >
                    Submit Review
                </button>
            </form>

        </div>
    );
};

export default Reviews;