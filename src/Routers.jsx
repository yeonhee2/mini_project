import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MainPage from "./mainpage/MainPage";
import Spinners from "./components/ui/Spinner";

import ArtistRoutePage from "@/features/artist/pages/ArtistRoutePage";
const AlbumPage = lazy(() => import("./features/album/pages/AlbumPage"));
const NotFound = lazy(() => import("./NotFound"));

const AdminLogin = lazy(() => import("./features/admin/pages/AdminLogin"));
const AdminRoute = lazy(() => import("./features/admin/components/AdminRoute"));
const AdminLayout = lazy(() => import("./features/admin/components/AdminLayout"));

const AdminDashboard = lazy(() => import("./features/admin/pages/AdminDashboard"));
const AdminChangePassword = lazy(() => import("./features/admin/pages/AdminChangePassword"));


const AdminArtistList = lazy(() => import("./features/admin/pages/artists/AdminArtistList"));
const AdminArtistForm = lazy(() => import("./features/admin/pages/artists/AdminArtistForm"));

const AdminMemberList = lazy(() => import("./features/admin/pages/members/AdminMemberList"));
const AdminMemberForm = lazy(() => import("./features/admin/pages/members/AdminMemberForm"));

const AdminAlbumList = lazy(() => import("./features/admin/pages/albums/AdminAlbumList"));
const AdminAlbumForm = lazy(() => import("./features/admin/pages/albums/AdminAlbumForm"));

const AdminActivityList = lazy(() =>
  import("./features/admin/pages/activities/AdminAlbumActivityList")
);
const AdminActivityForm = lazy(() => import("./features/admin/pages/activities/AdminAlbumActivityForm"));

const AdminConcertList = lazy(() => import("./features/admin/pages/concerts/AdminConcertList"));
const AdminConcertForm = lazy(() => import("./features/admin/pages/concerts/AdminConcertForm"));

const AdminGroupScheduleList = lazy(() => import("./features/admin/pages/schedules/AdminGroupScheduleList"));
const AdminGroupScheduleForm = lazy(() => import("./features/admin/pages/schedules/AdminGroupScheduleForm"));
const AdminMemberScheduleList = lazy(() => import("./features/admin/pages/schedules/AdminMemberScheduleList"));
const AdminMemberScheduleForm = lazy(() => import("./features/admin/pages/schedules/AdminMemberScheduleForm"));

const AdminAssetListPage = lazy(() =>
  import("./features/admin/pages/assets/AdminAssetListPage")
);
const AdminAssetUploadPage = lazy(() =>
  import("./features/admin/pages/assets/AdminAssetUploadPage")
);
const AdminAssetReplacePrimaryPage = lazy(() =>
  import("./features/admin/pages/assets/AdminAssetReplacePrimaryPage")
);

const Routers = ({ artist, concert, artistPlayList, album, groupevent, memevent }) => {
  return (
    <Suspense fallback={<Spinners size={60} label="데이터 정보 불러오는 중..." showLabel position="center" />}>
      <Routes>
        {/* 기존 라우트들 */}
        <Route path="/" element={<MainPage artist={artist} album={album} concert={concert} />} />

        <Route
        path="/:groupSlug/:debutYmd"
        element={
          <ArtistRoutePage
            artist={artist}
            concert={concert}
            artistPlayList={artistPlayList}
            album={album}
            groupevent={groupevent}
            memevent={memevent}
          />
        }
      />
        <Route path="/album/:group" element={<AlbumPage />} />

        {/* 관리자 로그인(레이아웃 X) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 관리자 영역 전체를 1번만 가드 + 레이아웃 적용 */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* /admin */}
          <Route index element={<AdminDashboard />} />

          {/* /admin/change-password */}
          <Route path="change-password" element={<AdminChangePassword />} />

          {/* 아티스트 */}
          <Route path="artists" element={<AdminArtistList />} />
          <Route path="artists/new" element={<AdminArtistForm mode="create" />} />
          <Route path="artists/:id/edit" element={<AdminArtistForm mode="edit" />} />

          {/* 멤버 */}
          <Route path="members" element={<AdminMemberList />} />
          <Route path="members/new" element={<AdminMemberForm mode="create" />} />
          <Route path="members/:id/edit" element={<AdminMemberForm mode="edit" />} />

          {/* 앨범 */}
          <Route path="albums" element={<AdminAlbumList />} />
          <Route path="albums/new" element={<AdminAlbumForm mode="create" />} />
          <Route path="albums/:id/edit" element={<AdminAlbumForm mode="edit" />} />

          {/* 앨범 활동 */}
          <Route path="activities" element={<AdminActivityList />} />
          <Route path="activities/new" element={<AdminActivityForm mode="create" />} />
          <Route path="activities/:id/edit" element={<AdminActivityForm mode="edit" />} />

          {/* 콘서트 */}
          <Route path="concerts" element={<AdminConcertList />} />
          <Route path="concerts/new" element={<AdminConcertForm mode="create" />} />
          <Route path="concerts/:id/edit" element={<AdminConcertForm mode="edit" />} />

          {/* 스케줄 */}
          <Route path="schedules/group" element={<AdminGroupScheduleList />} />
          <Route path="schedules/group/new" element={<AdminGroupScheduleForm mode="create" />} />
          <Route path="schedules/group/:id/edit" element={<AdminGroupScheduleForm mode="edit" />} />

          <Route path="schedules/member" element={<AdminMemberScheduleList />} />
          <Route path="schedules/member/new" element={<AdminMemberScheduleForm mode="create" />} />
          <Route path="schedules/member/:id/edit" element={<AdminMemberScheduleForm mode="edit" />} />

          {/* 이미지/로고 */}
          <Route path="assets" element={<AdminAssetListPage />} />
          <Route path="assets/upload" element={<AdminAssetUploadPage />} />
          <Route path="assets/replace-primary" element={<AdminAssetReplacePrimaryPage />} />

          {/* /admin 아래 잘못된 경로 처리 */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;