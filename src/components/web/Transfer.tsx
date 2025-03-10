import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import "../styles/payment.css";

const Transfer: React.FC = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardType, setCardType] = useState<string | null>(null);
    const [cardHolder, setCardHolder] = useState("");
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();

    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};

        if (!cardHolder.trim()) newErrors.cardHolder = "Cardholder name is required.";
        if (!email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Enter a valid email.";
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) newErrors.amount = "Enter a valid amount.";
        if (cardNumber.length !== 12){ 
          alert("Card number must be 12 digits.");
          return false;
        }
        if (!expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) newErrors.expiry = "Expiry must be MM/YY.";
        if (cvv.length !== 3) newErrors.cvv = "CVV must be 3 digits.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return; // Stop submission if validation fails

        try {
            const response = await axios.post("http://localhost:8080/api/email/send", {
                recipient: email,
                name: cardHolder,
                amount: parseFloat(amount),
                projectId: projectId
            });

            alert(response.data);
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Failed to send email. Please try again.");
        }
    };

    const detectCardType = (number: string) => {
        const visaRegex = /^4/;
        const masterRegex = /^5[1-5]/;
        if (visaRegex.test(number)) {
            setCardType("visa");
        } else if (masterRegex.test(number)) {
            setCardType("mastercard");
        } else {
            setCardType(null);
        }
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 12); // Restrict to 12 digits
        setCardNumber(value);
        detectCardType(value);
    };

    const handleClose = () => {
        navigate("/fundList");
    };

    return (
        <>
            <Header />
            <div className="container-fluid vh-100 d-flex"
                style={{
                    backgroundImage: "url('https://t3.ftcdn.net/jpg/04/34/58/54/360_F_434585463_zpdtTpTEbqQFfsp6RVEW6IIxEM9dHf86.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}>
                <div className="w-50 d-flex align-items-center justify-content-center"></div>
                <div className="w-50 d-flex align-items-center justify-content-center">
                    <div className="card shadow-lg p-4 w-75">
                        <h4 className="text-center mb-4">Payment Interface</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Fund Transfer Id</label>
                                <input type="text" className="form-control" value={projectId || ""} disabled />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Card Holder Name</label>
                                <input type="text" className="form-control" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} placeholder="Enter cardholder name" required />
                                {errors.cardHolder && <small className="text-danger">{errors.cardHolder}</small>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
                                {errors.email && <small className="text-danger">{errors.email}</small>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Amount</label>
                                <input type="text" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount to transfer" required />
                                {errors.amount && <small className="text-danger">{errors.amount}</small>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Card Number</label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        {cardType === "visa" && <i className="fab fa-cc-visa text-primary"></i>}
                                        {cardType === "mastercard" && <i className="fab fa-cc-mastercard text-danger"></i>}
                                        {!cardType && <i className="fas fa-credit-card"></i>}
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={cardNumber}
                                        onChange={handleCardNumberChange}
                                        maxLength={12}
                                        placeholder="Enter 12-digit card number"
                                        required
                                    />
                                </div>
                                {errors.cardNumber && <small className="text-danger">{errors.cardNumber}</small>}
                            </div>

                            <div className="mb-3 row">
                                <div className="col">
                                    <label className="form-label">Expiry Date</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={expiry}
                                        onChange={(e) => setExpiry(e.target.value)}
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        required
                                    />
                                    {errors.expiry && <small className="text-danger">{errors.expiry}</small>}
                                </div>
                                <div className="col">
                                    <label className="form-label">CVV</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                        maxLength={3}
                                        placeholder="***"
                                        required
                                    />
                                    {errors.cvv && <small className="text-danger">{errors.cvv}</small>}
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                <i className="fas fa-lock"></i> Pay Now
                            </button>
                            <button type="button" className="btn btn-danger mt-2 w-100" onClick={handleClose}>
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Transfer;
