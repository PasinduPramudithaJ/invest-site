import React, { useEffect, useState } from "react";
import AdminTopNav from "../layout/AdminTopNav";

import AdminSideBar from "../layout/AdminSideBar";
import { User } from "../../interfaces/User";
import { deleteUser, getAllUsers } from "../../services/AuthService";

const Users: React.FC = () => {
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    const fetchFunds = async () => {
      const data = await getAllUsers();
      setUser(data);
    };

    fetchFunds();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const confirmResponse = window.confirm(
        "Are you sure you want to delete this record?"
      );
      if (confirmResponse) {
        await deleteUser(id);
        setUser((prev) => prev.filter((res) => res.userId !== id));
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
                  Available user data
                </div>
                <div className="card-body">
                  <table
                    id="datatablesSimple"
                    style={{ width: "100%" }}
                    className="table table-striped"
                  >
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User Email</th>
                        <th>User Role</th>
                        <th>Password</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.map((usr, index) => (
                        <tr key={index}>
                          <td>{usr.firstName}</td>
                          <td>{usr.lastName}</td>
                          <td>{usr.userEmail}</td>
                          <td>{usr.userRole}</td>
                          <td>{usr.password}</td>
                          <td className="text-center">
                            <a
                              className="bg-dark rounded text-white p-2 link"
                              onClick={() => handleDelete(usr.userId)}
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
export default Users;
