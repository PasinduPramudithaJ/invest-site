import React, { useEffect, useState } from "react";
import AdminTopNav from "../layout/AdminTopNav";
import { EnterpriseFormData } from "../../interfaces/EnterpriseFormData";
import {
  deleteNotification,
  getAllEnterprises,
} from "../../services/EnterpriceService";
import AdminSideBar from "../layout/AdminSideBar";

const Enterprises: React.FC = () => {
  const [enterprise, setEnterprise] = useState<EnterpriseFormData[]>([]);

  useEffect(() => {
    const fetchFunds = async () => {
      const data = await getAllEnterprises();
      setEnterprise(data);
    };

    fetchFunds();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const confirmResponse = window.confirm(
        "Are you sure you want to delete this record?"
      );
      if (confirmResponse) {
        await deleteNotification(id);
        setEnterprise((prev) => prev.filter((res) => res.enterpriseId !== id));
      }
    } catch (error) {
      console.error("Failed to delete reservation:", error);
    }
  };
  return (
    <div>
      <AdminTopNav />

      <div id="layoutSidenav">
        <AdminSideBar />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4 mt-4">
              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-table me-1"></i>
                  Available enterprise data
                </div>
                <div className="card-body">
                  <table
                    id="datatablesSimple"
                    style={{ width: "100%" }}
                    className="table table-striped"
                  >
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Enterprise Name</th>
                        <th>Email</th>
                        <th>Enterprise ID</th>
                        <th>Register Number</th>
                        <th>Enterprise Type</th>
                        <th>Starting Date</th>
                        <th>City</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enterprise.map((entp, index) => (
                        <tr key={index}>
                          <td>
                            {entp.imageFile && (
                                <img src={`data:${entp.contentType};base64,${entp.imageFile}`} alt="Event" className="tableimg" style={{height:"50px", width: "50px", borderRadius:"50%"}}/>
                              )}
                          </td>
                          <td>{entp.enterpriseName}</td>
                          <td>{entp.enterpriseEmail}</td>
                          <td>{entp.enterpriseId}</td>
                          <td>{entp.registerNumber}</td>
                          <td>{entp.enterpriseType}</td>
                          <td>{entp.startingDate}</td>
                          <td>{entp.city}</td>
                          <td className="text-center">
                            <a
                              className="bg-dark rounded text-white p-2 link"
                              onClick={() => handleDelete(entp.enterpriseId)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">
                  Copyright &copy; Your Website 2023
                </div>
                <div>
                  <a href="#">Privacy Policy</a>
                  &middot;
                  <a href="#">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default Enterprises;
