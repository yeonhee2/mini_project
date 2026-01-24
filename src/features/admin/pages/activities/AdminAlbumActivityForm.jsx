import { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import AdminCrudFormPage from "@/features/admin/components/crud/AdminCrudFormPage";
import FormCard from "@/features/admin/components/FormCard";
import Field from "@/features/admin/components/Field";

import styles from "@/features/admin/styles/Admin.module.css";
import { ACTIVITY_TYPES, DUMMY_ALBUMS } from "@/features/admin/constants/activityConstants";

const buildInitial = ({ isEdit, preselectedAlbumId }) => {
  if (!isEdit) {
    return {
      albumId: preselectedAlbumId || "",
      type: "YOUTUBE",
      date: "",
      title: "",
      url: "",
      visible: true,
    };
  }
  return {
    albumId: 101,
    type: "MUSIC_BROADCAST",
    date: "2019-07-18",
    title: "M COUNTDOWN",
    url: "https://www.youtube.com/watch?v=yyyy",
    visible: true,
  };
};

export default function AdminAlbumActivityForm({ mode = "create" }) {
  const { id } = useParams();
  const location = useLocation();
  const isEdit = mode === "edit";

  const preselectedAlbumId = location.state?.albumId;

  const initial = useMemo(
    () => buildInitial({ isEdit, preselectedAlbumId }),
    [isEdit, preselectedAlbumId]
  );

  const [form, setForm] = useState(initial);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  useEffect(() => setForm(initial), [initial]);

  const albumName = useMemo(() => {
    const found = DUMMY_ALBUMS.find((a) => a.id === Number(form.albumId));
    return found?.name || "";
  }, [form.albumId]);

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <AdminCrudFormPage
      title={isEdit ? "앨범 활동 수정" : "앨범 활동 등록"}
      desc={isEdit ? `ID: ${id}` : albumName ? `선택 앨범: ${albumName}` : "앨범별 활동을 등록합니다."}
      backTo="/admin/activities"
      cancelTo="/admin/activities"
      submitText={isEdit ? "수정 저장" : "등록"}
      onSubmit={onSubmit}
      gridClassName={styles.formGridOne}
    >
      <FormCard title="활동 정보">
        <Field
          label="앨범"
          required
          hint={preselectedAlbumId && !isEdit ? "목록에서 선택한 앨범으로 고정됩니다." : ""}
        >
          <select
            className={styles.input}
            value={form.albumId}
            onChange={(e) => set("albumId", e.target.value ? Number(e.target.value) : "")}
            disabled={!!preselectedAlbumId && !isEdit}
            required
          >
            <option value="">선택</option>
            {DUMMY_ALBUMS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="타입" required>
          <select className={styles.input} value={form.type} onChange={(e) => set("type", e.target.value)}>
            {ACTIVITY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="날짜" required>
          <input
            type="date"
            className={styles.input}
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            required
          />
        </Field>

        <Field label="제목" required hint="예) 엠카운트다운 | 타이틀곡">
          <input className={styles.input} value={form.title} onChange={(e) => set("title", e.target.value)} required />
        </Field>

        <Field label="URL" required hint="https://...">
          <input
            className={styles.input}
            value={form.url}
            onChange={(e) => set("url", e.target.value)}
            placeholder="https://..."
            required
          />
        </Field>

        <label className={styles.checkRow}>
          <input type="checkbox" checked={!!form.visible} onChange={(e) => set("visible", e.target.checked)} />
          <span>노출(ON/OFF)</span>
        </label>
      </FormCard>
    </AdminCrudFormPage>
  );
}



