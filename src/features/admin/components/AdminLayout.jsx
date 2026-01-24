import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import styles from "../styles/Admin.module.css";

export default function AdminLayout() {
  return (
    <div className={styles.shell}>
      <AdminSidebar />
      <div className={styles.main}>
        <AdminTopbar />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}