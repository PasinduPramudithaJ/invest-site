import React, { useEffect, useState } from "react";
import AdminTopNav from "../layout/AdminTopNav";
import AdminSideBar from "../layout/AdminSideBar";
import {
  getFullFundList,
  getFundCount,
  publishProject,
} from "../../services/Funding";
import { Fund } from "../../interfaces/Fund";
import { getUserCount } from "../../services/AuthService";
import { getEnterpriseCount } from "../../services/EnterpriceService";
import { getInvestorCount } from "../../services/InvesterService";
import useAuthCheck from "../../AuthChecking";

const AdminDashboard: React.FC = () => {
  useAuthCheck();
  const [funds, setFunds] = useState<Fund[]>([]);
  const [userCount, setUserCount] = useState<number>(0);
  const [enterpriseCount, setEnterpriseCount] = useState<number>(0);
  const [investorCount, setInvestorCount] = useState<number>(0);
  const [fundCount, setFundCount] = useState<number>(0);

  useEffect(() => {
    const fetchCounts = async () => {
      setUserCount(await getUserCount());
      setEnterpriseCount(await getEnterpriseCount());
      setInvestorCount(await getInvestorCount());
      setFundCount(await getFundCount());
    };
    fetchCounts();
  }, []);

  const handlePublish = async (projectId: string) => {
    try {
      await publishProject(projectId);
      alert("Project published successfully!");
      window.location.reload();
    } catch (error) {
      alert("Failed to publish project.");
    } finally {
    }
  };

  useEffect(() => {
    const fetchFunds = async () => {
      const data = await getFullFundList();
      setFunds(data);
    };

    fetchFunds();
  }, []);
  return (
    <div>
      <AdminTopNav />

      <div id="layoutSidenav">
        <AdminSideBar />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Dashboard</h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Admin</li>
              </ol>
              <div className="row">
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-primary text-white mb-4">
                    <h3 className="card-body">Users : {userCount}</h3>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      <a
                        className="small text-white stretched-link"
                        href="/users"
                      >
                        View Details
                      </a>
                      <a className="small text-white" href="">
                        <i className="fas fa-angle-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-warning text-white mb-4">
                    <h3 className="card-body">Enterprises: {enterpriseCount}</h3>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      <a
                        className="small text-white stretched-link"
                        href="/enterprises"
                      >
                        View Details
                      </a>
                      <a className="small text-white" href="">
                        <i className="fas fa-angle-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-success text-white mb-4">
                    <h3 className="card-body">Investors: {investorCount}</h3>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      <a
                        className="small text-white stretched-link"
                        href="/investers"
                      >
                        View Details
                      </a>
                      <a className="small text-white" href="">
                        <i className="fas fa-angle-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-danger text-white mb-4">
                    <h3 className="card-body">Funds: {fundCount}</h3>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      <a
                        className="small text-white stretched-link"
                        href="/dashboard"
                      >
                        View Details
                      </a>
                      <a className="small text-white" href="">
                        <i className="fas fa-angle-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-table me-1"></i>
                  Available fund requests
                </div>
                <div className="card-body">
                  <table
                    id="datatablesSimple"
                    style={{ width: "100%" }}
                    className="table table-striped"
                  >
                    <thead>
                      <tr>
                        <th>Project Name</th>
                        <th>Description</th>
                        <th>Project ID</th>
                        <th>Account Name</th>
                        <th>Account Number</th>
                        <th>Bank</th>
                        <th>Branch</th>
                        <th>Status</th>
                        <th>Publish</th>
                      </tr>
                    </thead>
                    <tbody>
                      {funds.map((fund, index) => (
                        <tr key={index}>
                          <td>{fund.projectName}</td>
                          <td>{fund.description}</td>
                          <td>{fund.projectId}</td>
                          <td>{fund.actName}</td>
                          <td>{fund.actNumber}</td>
                          <td>{fund.bank}</td>
                          <td>{fund.branch}</td>
                          <td>{fund.status}</td>
                          <td>
                            <a
                              className="bg-primary rounded text-white p-2 link"
                              onClick={() => handlePublish(fund.projectId)}
                            >
                              {fund.status === "published" ? (
                                <i className="fa-solid fa-eye"></i>
                              ) : (
                                <i className="fa-solid fa-eye-slash"></i>
                              )}
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
                <div className="text-muted text-center w-100">
                  © 2024 Seed Link
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
