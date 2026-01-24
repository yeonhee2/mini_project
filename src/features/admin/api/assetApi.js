import requestHandler from "@/api/requestHandler";


/**
 * 목록
 * GET /api/admin/images?targetType=GROUP&targetId=1&imageType=LOGO
 */
export const fetchAssets = ({ targetType, targetId, imageType }) =>
  requestHandler({
    method: "GET",
    url: "/api/admin/images",
    params: { targetType, targetId, imageType },
  });

/**
 * 대표 1개
 * GET /api/admin/images/primary?targetType=GROUP&targetId=1&imageType=LOGO
 */
export const fetchPrimaryAsset = ({ targetType, targetId, imageType }) =>
  requestHandler({
    method: "GET",
    url: "/api/admin/images/primary",
    params: { targetType, targetId, imageType },
  });

/**
 * 업로드
 * POST /api/admin/images (multipart)
 */
export const uploadAsset = ({ file, targetType, targetId, imageType, isPrimary = false }) => {
  const form = new FormData();
  form.append("file", file);
  form.append("targetType", targetType);
  form.append("targetId", String(targetId));
  form.append("imageType", imageType);
  form.append("isPrimary", String(isPrimary));

  return requestHandler({
    method: "POST",
    url: "/api/admin/images",
    data: form, // FormData 그대로
    contentType: "multipart",
  });
};

/**
 * 대표 교체(새 파일로 교체)
 * POST /api/admin/images/replace-primary (multipart)
 */
export const replacePrimaryAsset = ({ file, targetType, targetId, imageType }) => {
  const form = new FormData();
  form.append("file", file);
  form.append("targetType", targetType);
  form.append("targetId", String(targetId));
  form.append("imageType", imageType);

  return requestHandler({
    method: "POST",
    url: "/api/admin/images/replace-primary",
    data: form,
    contentType: "multipart",
  });
};

/**
 * 기존 이미지 중 하나를 대표로
 * PUT /api/admin/images/{imageId}/set-primary
 */
export const setPrimaryAsset = (imageId) =>
  requestHandler({
    method: "PUT",
    url: `/api/admin/images/${imageId}/set-primary`,
  });

/**
 * 삭제
 * DELETE /api/admin/images/{imageId}?deleteBlob=true|false
 */
export const deleteAsset = (imageId, deleteBlob = false) =>
  requestHandler({
    method: "DELETE",
    url: `/api/admin/images/${imageId}`,
    params: { deleteBlob },
  });
