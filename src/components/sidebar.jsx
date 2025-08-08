import React from "react";

function Sidebar() {
  return (
    <aside className="sidebar d-flex flex-column justify-content-between bg-light min-vh-100 p-3 border-end">
      <div>
        <div className="d-flex align-items-center mb-4">
          <a className="navbar-brand me-2" href="#">
            My Todo App
          </a>
        </div>
        <ul
          className="nav nav-pills flex-column mb-auto flex-grow-1"
          style={{ marginTop: "62px" }} // 2 cm ≈ 76px
        >
          <li className="nav-item mb-2">
            <a className="nav-link d-flex align-items-center" href="#">
              <i className="bi bi-speedometer2 me-2"></i>
              Dashboard
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link d-flex align-items-center" href="#">
              <i className="bi bi-people me-2"></i>
              Users
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link d-flex align-items-center" href="#">
              <i className="bi bi-list-task me-2"></i>
              Tasks
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link d-flex align-items-center" href="#">
              <i className="bi bi-gear me-2"></i>
              Settings
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-auto pt-4">
        <div className="mb-2">
          <strong>Username</strong>
        </div>
        <a className="btn btn-outline-danger btn-sm w-100" href="#">
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;