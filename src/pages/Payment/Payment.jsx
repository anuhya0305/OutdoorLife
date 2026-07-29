import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../services/OrderService";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";

const Payment = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const pendingOrder = JSON.parse(localStorage.getItem("pendingOrder"));

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const [upiId, setUpiId] = useState("");

  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  });

  const [bank, setBank] = useState("");

  const handlePayment = async () => {

    if (!pendingOrder) {
      alert("No pending order found.");
      navigate("/cart");
      return;
    }

    if (paymentMethod === "UPI" && upiId.trim() === "") {
      alert("Enter UPI ID.");
      return;
    }

    if (
      paymentMethod === "Credit Card" ||
      paymentMethod === "Debit Card"
    ) {

      if (
        cardData.cardNumber.length !== 16 ||
        cardData.cardHolder === "" ||
        cardData.expiry === "" ||
        cardData.cvv.length !== 3
      ) {
        alert("Enter valid card details.");
        return;
      }
    }

    if (paymentMethod === "Net Banking" && bank === "") {
      alert("Select Bank.");
      return;
    }

    pendingOrder.paymentMethod = paymentMethod;

    pendingOrder.paymentStatus =
      paymentMethod === "Cash on Delivery"
        ? "Pending"
        : "Paid";

    pendingOrder.orderStatus = "Processing";

    try {

      await placeOrder(pendingOrder);

      localStorage.setItem(
        "lastOrder",
        JSON.stringify(pendingOrder)
      );

      dispatch(clearCart());

      localStorage.removeItem("pendingOrder");

      navigate("/order-success");

    } catch (error) {

      console.error(error);

      alert("Payment Failed");

    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-5">

      <h1 className="text-3xl font-bold mb-8">
        Payment
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-8">

        <div className="space-y-5">

          <label className="flex items-center gap-3">
            <input
              type="radio"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              value="Credit Card"
              checked={paymentMethod === "Credit Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit Card
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              value="Debit Card"
              checked={paymentMethod === "Debit Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Debit Card
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              value="Net Banking"
              checked={paymentMethod === "Net Banking"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Net Banking
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              value="Cash on Delivery"
              checked={paymentMethod === "Cash on Delivery"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

        </div>
        {paymentMethod === "UPI" && (
          <input
            type="text"
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="border p-3 rounded-lg w-full mt-5"
          />
        )}

        {(paymentMethod === "Credit Card" ||
          paymentMethod === "Debit Card") && (
            <div className="space-y-4 mt-5">

              <input
                type="text"
                placeholder="Card Number"
                maxLength={16}
                value={cardData.cardNumber}
                onChange={(e) =>
                  setCardData({
                    ...cardData,
                    cardNumber: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="border p-3 rounded-lg w-full"
              />

              <input
                type="text"
                placeholder="Card Holder Name"
                value={cardData.cardHolder}
                onChange={(e) =>
                  setCardData({
                    ...cardData,
                    cardHolder: e.target.value,
                  })
                }
                className="border p-3 rounded-lg w-full"
              />

              <div className="grid grid-cols-2 gap-4">

                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  onChange={(e) =>
                    setCardData({
                      ...cardData,
                      expiry: e.target.value,
                    })
                  }
                  className="border p-3 rounded-lg"
                />

                <input
                  type="password"
                  placeholder="CVV"
                  maxLength={3}
                  value={cardData.cvv}
                  onChange={(e) =>
                    setCardData({
                      ...cardData,
                      cvv: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  className="border p-3 rounded-lg"
                />

              </div>

            </div>
          )}

        {paymentMethod === "Net Banking" && (

          <select
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="border p-3 rounded-lg w-full mt-5"
          >

            <option value="">Select Bank</option>

            <option>SBI</option>

            <option>HDFC</option>

            <option>ICICI</option>

            <option>Axis Bank</option>

            <option>Kotak</option>

          </select>

        )}
        <button
          onClick={handlePayment}
          className="mt-8 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800"
        >
          Continue
        </button>

      </div>

    </div>
  );
};

export default Payment;