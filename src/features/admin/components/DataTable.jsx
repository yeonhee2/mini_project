import styles from "../styles/Admin.module.css";

export default function DataTable({
  columns,
  rows,
  rowKey = (row) => row.id ?? row.pk ?? JSON.stringify(row),
  rowActions,
  emptyText = "데이터가 없습니다.",
}) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} className={styles.th}>
                {c.header}
              </th>
            ))}
            {rowActions ? <th className={[styles.th, styles.thActions].join(" ")}>관리</th> : null}
          </tr>
        </thead>

        <tbody>
          {(!rows || rows.length === 0) ? (
            <tr>
              <td
                className={styles.tdEmpty}
                colSpan={columns.length + (rowActions ? 1 : 0)}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((r) => (
              <tr key={rowKey(r)} className={styles.tr}>
                {columns.map((c) => (
                  <td key={c.key} className={styles.td}>
                    {c.render ? c.render(r) : r[c.key]}
                  </td>
                ))}
                {rowActions ? (
                  <td className={[styles.td, styles.tdActions].join(" ")}>
                    <div className={styles.rowActionBox}>{rowActions(r)}</div>
                  </td>
                ) : null}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
