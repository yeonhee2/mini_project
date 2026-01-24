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
      birthday: "",
      status: "ACTIVE",
      profileFile: null,
      profileUrl: "",
    };
  }
  return {
    groupId: 2,
    name: "Nayeon",
    birthday: "1995-09-22",
    status: "ACTIVE",
    profileFile: null,
    profileUrl: "",
  };
};

export default function AdminMemberForm({ mode = "create" }) {
  const { id } = useParams();
  const isEdit = mode === "edit";

  const initial = useMemo(() => buildInitial({ isEdit }), [isEdit]);
  const [form, setForm] = useState(initial);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  useEffect(() => setForm(initial), [initial]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(isEdit ? "update member" : "create member", { id, form });
  };

  return (
    <AdminCrudFormPage
      title={isEdit ? "멤버 수정" : "멤버 등록"}
      desc={isEdit ? `ID: ${id}` : "새 멤버를 등록합니다."}
      backTo="/admin/members"
      submitText={isEdit ? "수정 저장" : "등록"}
      onSubmit={onSubmit}
      gridClassName={styles.formGrid}
    >
      <FormCard title="기본 정보">
        <Field label="그룹" required>
          <select
            className={styles.input}
            value={form.groupId}
            onChange={(e) => set("groupId", e.target.value ? Number(e.target.value) : "")}
            required
          >
            <option value="">선택</option>
            {DUMMY_GROUPS.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="멤버명" required>
          <input className={styles.input} value={form.name} onChange={(e) => set("name", e.target.value)} required />
        </Field>

        <Field label="생일" required>
          <input type="date" className={styles.input} value={form.birthday} onChange={(e) => set("birthday", e.target.value)} required />
        </Field>

        <Field label="상태" required>
          <select className={styles.input} value={form.status} onChange={(e) => set("status", e.target.value)} required>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </Field>
      </FormCard>

      <FormCard title="프로필 이미지">
        <ImageUploadField
          label="멤버 프로필"
          file={form.profileFile}
          valueUrl={form.profileUrl}
          onChange={(f) => set("profileFile", f)}
        />
      </FormCard>
    </AdminCrudFormPage>
  );
}
