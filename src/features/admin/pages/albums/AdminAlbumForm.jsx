import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import AdminCrudFormPage from "@/features/admin/components/crud/AdminCrudFormPage";
import FormCard from "@/features/admin/components/FormCard";
import Field from "@/features/admin/components/Field";
import ImageUploadField from "@/features/admin/components/ImageUploadField";
import styles from "@/features/admin/styles/Admin.module.css";

import { DUMMY_GROUPS } from "@/features/admin/constants/dummyData";

const buildInitial = ({ isEdit }) => {
  if (!isEdit) {
    return {
      groupId: "",
      name: "",
      releaseDate: "",
      type: "ALBUM",
      status: "RELEASED",
      coverFile: null,
      coverUrl: "",
    };
  }
  return {
    groupId: 2,
    name: "Formula of Love",
    releaseDate: "2021-11-12",
    type: "ALBUM",
    status: "RELEASED",
    coverFile: null,
    coverUrl: "",
  };
};

export default function AdminAlbumForm({ mode = "create" }) {
  const { id } = useParams();
  const isEdit = mode === "edit";

  const initial = useMemo(() => buildInitial({ isEdit }), [isEdit]);
  const [form, setForm] = useState(initial);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  useEffect(() => setForm(initial), [initial]);

  const onSubmit = (e) => {
    e.preventDefault();
  
  };

  return (
    <AdminCrudFormPage
      title={isEdit ? "앨범 수정" : "앨범 등록"}
      desc={isEdit ? `ID: ${id}` : "새 앨범을 등록합니다."}
      backTo="/admin/albums"
      submitText={isEdit ? "수정 저장" : "등록"}
      onSubmit={onSubmit}
      gridClassName={styles.formGrid}
    >
      <FormCard title="기본 정보">
        <Field label="그룹" required>
          <select className={styles.input} value={form.groupId} onChange={(e) => set("groupId", e.target.value ? Number(e.target.value) : "")} required>
            <option value="">선택</option>
            {DUMMY_GROUPS.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </Field>

        <Field label="앨범명" required>
          <input className={styles.input} value={form.name} onChange={(e) => set("name", e.target.value)} required />
        </Field>

        <Field label="발매일" required>
          <input type="date" className={styles.input} value={form.releaseDate} onChange={(e) => set("releaseDate", e.target.value)} required />
        </Field>

        <Field label="형식" required>
          <select className={styles.input} value={form.type} onChange={(e) => set("type", e.target.value)} required>
            <option value="ALBUM">ALBUM</option>
            <option value="SINGLE">SINGLE</option>
            <option value="EP">EP</option>
          </select>
        </Field>

        <Field label="상태" required>
          <select className={styles.input} value={form.status} onChange={(e) => set("status", e.target.value)} required>
            <option value="RELEASED">RELEASED</option>
            <option value="UPCOMING">UPCOMING</option>
          </select>
        </Field>
      </FormCard>

      <FormCard title="커버 이미지">
        <ImageUploadField
          label="앨범 커버"
          file={form.coverFile}
          valueUrl={form.coverUrl}
          onChange={(f) => set("coverFile", f)}
        />
      </FormCard>
    </AdminCrudFormPage>
  );
}
