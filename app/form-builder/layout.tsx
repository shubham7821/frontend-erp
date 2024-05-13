import Link from "next/link";
import styles from "./FormBuilderLayout.module.css"; // Assuming you create a CSS module
import { AuthProvider } from "@app/context/AuthProvider";

export default function FormBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <AuthProvider>
        <aside className={styles.sidebar}>
          <nav>
            <Link href="/form-builder" className={styles.link}>
              Form Builder List
            </Link>
          </nav>
          <nav>
            <Link href={`/form-builder/add-edit`} className={styles.link}>
              Create New Form
            </Link>
          </nav>
          <nav>
            <Link href={`/bpmn`} className={styles.link}>
              Create BPMN task
            </Link>
          </nav>
          <nav>
            <Link href={`/user/profile`} className={styles.link}>
              User Profile & Task
            </Link>
          </nav>
          <nav>
            <Link href={`/registration-list`} className={styles.link}>
              Registration list
            </Link>
          </nav>
        </aside>
      </AuthProvider>

      <main className={styles.content}>{children}</main>
    </div>
  );
}
