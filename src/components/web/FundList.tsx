import React, { useState, useEffect } from 'react';
import { getAllFunds } from '../../services/Funding';
import { Fund } from '../../interfaces/Fund';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import useAuthCheck from "../../AuthChecking";


const FundList: React.FC = () => {
  useAuthCheck();
  const [funds, setFunds] = useState<Fund[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await getAllFunds();
        setFunds(response);
      } catch (error) {
        setError("Error fetching enterprises." + error);
      } finally {
        setLoading(false);
      }
    };

    fetchFunds();
  }, []);

  const handleShowMore = (fund: Fund) => {
    setSelectedFund(fund);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedFund(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <Header />
    <div>
      <div className="container">
      <div className="row my-5">
        {funds.map((fund, index) => (
          <div key={index} className="col-md-3 mb-5 mt-5">
            <div className="card">
              <img
                src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-crowd-funding_516790-2294.jpg?semt=ais_hybrid"
                className="card-img-top"
                alt="Project"
              />
              <div className="card-body">
                <h5 className="card-title">{fund.projectName}</h5>
                <p className="card-text">{fund.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleShowMore(fund)}
                >
                  Show More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* Modal Toggle - Show Details */}
    {showDetails && selectedFund && (
      <div className="position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75 row">
        <div className="card w-50 p-3">
          <div className="card-header d-flex justify-content-between">
            <h5 className="mb-0">Project Details</h5>
            <button className="btn-close" onClick={handleCloseDetails}></button>
          </div>
          <div className="card-body">
            <h5 className="card-title">{selectedFund.projectName}</h5>
            <p><strong>Description:</strong> {selectedFund.description}</p>
            <p><strong>Target Amount:</strong> {selectedFund.targetAmount}</p>
            <p><strong>Account Name:</strong> {selectedFund.actName}</p>
            <p><strong>Branch:</strong> {selectedFund.branch}</p>
            <p><strong>Bank:</strong> {selectedFund.bank}</p>
            <p><strong>Account Number:</strong> {selectedFund.actNumber}</p>
            <div className="d-flex justify-content-end">
              <a className='btn btn-outline-dark btn-sm' href={`/transfer/${selectedFund.projectId}`}>Make fund transfter</a>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
    <Footer />
    </>
      );
};

export default FundList;
