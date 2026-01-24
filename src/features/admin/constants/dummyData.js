export const DUMMY_GROUPS = [
  { id: 1, name: "DAY6" },
  { id: 2, name: "TWICE" },
  { id: 3, name: "Stray Kids" },
  { id: 4, name: "ITZY" },
];

export const DUMMY_MEMBERS = [
  { id: 1, groupId: 2, name: "Nayeon", birthday: "1995-09-22", status: "ACTIVE" },
  { id: 2, groupId: 2, name: "Jihyo", birthday: "1997-02-01", status: "ACTIVE" },
  { id: 3, groupId: 1, name: "Sungjin", birthday: "1993-01-16", status: "ACTIVE" },
];

export const DUMMY_ALBUMS = [
  { id: 101, groupId: 1, name: "Fourever", releaseDate: "2024-03-18", type: "ALBUM", status: "RELEASED" },
  { id: 201, groupId: 2, name: "Formula of Love", releaseDate: "2021-11-12", type: "ALBUM", status: "RELEASED" },
];

export const DUMMY_CONCERTS = [
  { id: 1, groupId: 2, title: "TWICE 5TH WORLD TOUR", date: "2025-06-01", venue: "KSPO DOME" },
  { id: 2, groupId: 1, title: "DAY6 CONCERT", date: "2025-05-20", venue: "Jamsil" },
];

export const DUMMY_GROUP_SCHEDULES = [
  { id: 1, groupId: 2, date: "2025-12-22", title: "컴백 쇼케이스", type: "S" },
  { id: 2, groupId: 1, date: "2025-12-26", title: "라디오 출연", type: "S" },
];

export const DUMMY_MEMBER_SCHEDULES = [
  { id: 1, memberId: 1, date: "2025-12-23", title: "개인 화보 촬영", type: "S" },
  { id: 2, memberId: 3, date: "2025-12-24", title: "개인 인터뷰", type: "S" },
];
