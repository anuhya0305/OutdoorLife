import { toast } from "react-toastify";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        alternatePhone: "",
        houseNo: "",
        building: "",
        street: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        instructions: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const finalTotal = subtotal - discount;

    const applyCoupon = () => {
        const code = coupon.trim().toUpperCase();

        if (code === "SAVE10") {
            setDiscount(subtotal * 0.1);
            toast.success("10% discount applied!");
        } else if (code === "WELCOME20") {
            setDiscount(subtotal * 0.2);
            toast.success("20% discount applied!");
        } else {
            setDiscount(0);
            toast.error("Invalid coupon code!");
        }
    };
    const handlePlaceOrder = async () => {
        if (cartItems.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        const order = {
            orderId: `ORD-${Date.now()}`,
            customer: formData,
            items: cartItems,
            totalAmount: finalTotal,
            discount,
            coupon,
            orderDate: new Date().toISOString(),
        };

        try {
            localStorage.setItem("pendingOrder", JSON.stringify(order));

            if (!/^\d{10}$/.test(formData.phone)) {
                toast.warning("Phone number must be exactly 10 digits.");
                return;
            }

            if (!/^\d{6}$/.test(formData.pincode)) {
                toast.warning("Pincode must be exactly 6 digits.");
                return;
            }

            if (
                !formData.fullName ||
                !formData.houseNo ||
                !formData.street ||
                !formData.city ||
                !formData.state
            ) {
                toast.warning("Please fill all mandatory fields.");
                return;
            }
            navigate("/payment");
        } catch (error) {
            console.error(error);
            toast.error("Failed to place order.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-10 px-5">
            <h1 className="text-3xl font-bold mb-8">
                Checkout
            </h1>

            <div className="bg-white shadow-lg rounded-lg p-8">

                <div className="grid md:grid-cols-2 gap-6">

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            if (value.length <= 10) {
                                setFormData({
                                    ...formData,
                                    phone: value,
                                });
                            }
                        }}
                        placeholder="Phone Number *"
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="tel"
                        name="alternatePhone"
                        value={formData.alternatePhone}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            if (value.length <= 10) {
                                setFormData({
                                    ...formData,
                                    alternatePhone: value,
                                });
                            }
                        }}
                        placeholder="Alternate Phone (Optional)"
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            if (value.length <= 6) {
                                setFormData({
                                    ...formData,
                                    pincode: value,
                                });
                            }
                        }}
                        placeholder="Pincode *"
                        className="w-full border p-3 rounded"
                    />

                </div>

                <input
                    type="text"
                    name="houseNo"
                    placeholder="House / Flat No. *"
                    value={formData.houseNo}
                    onChange={handleChange}
                    className="border p-3 rounded-lg mt-6 w-full"
                />

                <input
                    type="text"
                    name="building"
                    placeholder="Building Name (Optional)"
                    value={formData.building}
                    onChange={handleChange}
                    className="border p-3 rounded-lg mt-4 w-full"
                />

                <input
                    type="text"
                    name="street"
                    placeholder="Street / Area *"
                    value={formData.street}
                    onChange={handleChange}
                    className="border p-3 rounded-lg mt-4 w-full"
                />

                <input
                    type="text"
                    name="landmark"
                    placeholder="Landmark (Optional)"
                    value={formData.landmark}
                    onChange={handleChange}
                    className="border p-3 rounded-lg mt-4 w-full"
                />

                <input
                    type="text"
                    name="state"
                    placeholder="State *"
                    value={formData.state}
                    onChange={handleChange}
                    className="border p-3 rounded-lg mt-4 w-full"
                />

                <textarea
                    name="instructions"
                    placeholder="Delivery Instructions (Optional)"
                    value={formData.instructions}
                    onChange={handleChange}
                    className="border p-3 rounded-lg mt-4 w-full h-28"
                />
                <div className="mt-6 border-t pt-6">

                    <h2 className="text-2xl font-semibold mb-4">
                        Order Summary
                    </h2>

                    <p className="mb-2">
                        Subtotal: ₹{subtotal.toFixed(2)}
                    </p>

                    <p className="mb-2 text-green-600">
                        Discount: ₹{discount.toFixed(2)}
                    </p>

                    <p className="text-2xl font-bold mb-5">
                        Total: ₹{finalTotal.toFixed(2)}
                    </p>

                    <div className="flex gap-3">

                        <input
                            type="text"
                            placeholder="Enter Coupon Code"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            className="flex-1 border p-3 rounded-lg"
                        />

                        <button
                            onClick={applyCoupon}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg"
                        >
                            Apply
                        </button>

                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                        Try: <b>SAVE10</b> or <b>WELCOME20</b>
                    </p>

                </div>

                <button
                    onClick={handlePlaceOrder}
                    className="mt-8 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800"
                >
                    Place Order
                </button>

            </div>
        </div>
    );
};

export default Checkout;