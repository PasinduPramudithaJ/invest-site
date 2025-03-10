import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllEnterprises, getEnterpriseByUserId } from "../../services/EnterpriceService";
import { EnterpriseFormData } from "../../interfaces/EnterpriseFormData";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../styles/Entrepriselist.css"
import useAuthCheck from "../../AuthChecking";



const EnterpriseList: React.FC = () => {
  useAuthCheck();
  const [enterprises, setEnterprises] = useState<EnterpriseFormData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEnterprises = async () => {
      const data = await getAllEnterprises();
      setEnterprises(data);
      console.log(data);
      console.log(getEnterpriseByUserId());
    };
    fetchEnterprises();
  }, []);

  const filteredEnterprises = enterprises.filter((enterprise) =>
    enterprise.enterpriseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enterprise.enterpriseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enterprise.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Header/>
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center">Entreprenuers</h2>
        <div className="input-group" style={{ maxWidth: "400px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, type, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {filteredEnterprises.length > 0 ? (
          filteredEnterprises.map((enterprise) => (
            <div key={enterprise.enterpriseId} className="col-md-4">
              <div className="card mb-3 shadow">
                {enterprise.imageFile && (
                  <img
                    src={`data:${enterprise.contentType};base64,${enterprise.imageFile}`}
                    className="card-img-top"
                    alt={enterprise.imageName}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{enterprise.enterpriseName}</h5>
                  <p className="card-text">
                    <strong>Type:</strong> {enterprise.enterpriseType}
                  </p>
                  <p className="card-text">
                    <strong>Address:</strong> {enterprise.address}, {enterprise.city}
                  </p>
                  <div className="d-flex gap-3">
  <a href={enterprise.webUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
    Visit Website
  </a>
  <a href={`/entpProfile/${enterprise.enterpriseId}`} className="btn btn-outline-dark" rel="noopener noreferrer">
    View Profile
  </a>
</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No enterprises found.</p>
        )}
      </div>
    </div>
     <Footer />
     </>
  );
};

export default EnterpriseList;