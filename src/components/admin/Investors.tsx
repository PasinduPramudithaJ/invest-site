import React, { useEffect, useState } from "react";
import AdminTopNav from "../layout/AdminTopNav";

import AdminSideBar from "../layout/AdminSideBar";
import { deleteInvester, getAllInvesters } from "../../services/InvesterService";
import { InvestorFormData } from "../../interfaces/InvestorFormData";

const Investers: React.FC = () => {
  const [investor, setInvestor] = useState<InvestorFormData[]>([]);

  useEffect(() => {
    const fetchFunds = async () => {
      const data = await getAllInvesters();
      setInvestor(data);
    };

    fetchFunds();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const confirmResponse = window.confirm(
        "Are you sure you want to delete this record?"
      );
      if (confirmResponse) {
        await deleteInvester(id);
        setInvestor((prev) => prev.filter((res) => res.investmentId !== id));
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
                  Available investor data
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
                        <th>Investor Name</th>
                        <th>Investor Job</th>
                        <th>Investor Interest</th>
                        <th>Other Details</th>
                        <th>Budget Limit</th>
                        <th>Address</th>
                        <th>Tele Number</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {investor.map((inv, index) => (
                        <tr key={index}>
                          <td>
                            {inv.imageFile && (
                                <img src={`data:${inv.contentType};base64,${inv.imageFile}`} alt="Event" className="tableimg" style={{height:"50px", width: "50px", borderRadius:"50%"}}/>
                              )}
                          </td>
                          <td>{inv.investorName}</td>
                          <td>{inv.investorJob}</td>
                          <td>{inv.investorInterest}</td>
                          <td>{inv.otherDetails}</td>
                          <td>{inv.budgetLimit}</td>
                          <td>{inv.address}</td>
                          <td>{inv.telNumber}</td>
                          <td className="text-center">
                            <a
                              className="bg-dark rounded text-white p-2 link"
                              onClick={() => handleDelete(inv.investmentId)}
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
export default Investers;
