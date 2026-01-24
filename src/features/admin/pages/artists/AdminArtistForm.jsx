import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import AdminCrudFormPage from "@/features/admin/components/crud/AdminCrudFormPage";
import FormCard from "@/features/admin/components/FormCard";
import Field from "@/features/admin/components/Field";
import ImageUploadField from "@/features/admin/components/ImageUploadField";

import styles from "@/features/admin/styles/Admin.module.css";

const buildInitial = ({ isEdit }) => {
  if (!isEdit) {
    return {
      groupName: "",
      debutDate: "",
      fanclubName: "",
      status: "ACTIVE",
      logoFile: null,
      groupImageFile: null,
      logoUrl: "",
      groupImageUrl: "",
    };
  }
  return {
    groupName: "DAY6",
    debutDate: "2015-09-07",
    fanclubName: "My Day",
    status: "ACTIVE",
    logoFile: null,
    groupImageFile: null,
    logoUrl: "",
    groupImageUrl: "",
  };
};

export default function AdminArtistForm({ mode = "create" }) {
  const { id } = useParams();
  const isEdit = mode === "edit";

  const initial = useMemo(() => buildInitial({ isEdit }), [isEdit]);
  const [form, setForm] = useState(initial);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    setForm(initial);
  }, [initial]);

  const statusOptions = useMemo(() => ["ACTIVE", "INACTIVE"], []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(isEdit ? "update artist" : "create artist", { id, form });
  };

  return (
    <AdminCrudFormPage
      title={isEdit ? "아티스트 수정" : "아티스트 등록"}
      desc={isEdit ? `ID: ${id}` : "새 아티스트를 등록합니다."}
      backTo="/admin/artists"
      cancelTo="/admin/artists"
      submitText={isEdit ? "수정 저장" : "등록"}
      onSubmit={onSubmit}
      gridClassName={styles.formGrid} // 너는 2카드라서 grid 유지
    >
      <FormCard title="기본 정보">
        <Field label="그룹명" required>
          <input
            className={styles.input}
            value={form.groupName}
            onChange={(e) => set("groupName", e.target.value)}
            required
          />
        </Field>

        <Field label="데뷔일" required>
          <input
            type="date"
            className={styles.input}
            value={form.debutDate}
            onChange={(e) => set("debutDate", e.target.value)}
            required
          />
        </Field>

        <Field label="팬클럽명">
          <input
            className={styles.input}
            value={form.fanclubName}
            onChange={(e) => set("fanclubName", e.target.value)}
          />
        </Field>

        <Field label="상태" required>
          <select
            className={styles.input}
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
            required
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </FormCard>

      <FormCard title="이미지">
        <ImageUploadField
          label="그룹 로고"
          file={form.logoFile}
          valueUrl={form.logoUrl}
          onChange={(f) => set("logoFile", f)}
        />
        <ImageUploadField
          label="그룹 이미지"
          file={form.groupImageFile}
          valueUrl={form.groupImageUrl}
          onChange={(f) => set("groupImageFile", f)}
        />
      </FormCard>
    </AdminCrudFormPage>
  );
}


