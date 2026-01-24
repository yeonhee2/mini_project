export const ACTIVITY_TYPES = [
  { value: "YOUTUBE", label: "YouTube" },
  { value: "MUSIC_BROADCAST", label: "음악방송" },
  { value: "RADIO", label: "라디오" },
  { value: "VARIETY", label: "예능/콘텐츠" },
  { value: "FANSIGN", label: "팬사인회" },
  { value: "ETC", label: "기타" },
];

export const labelOfType = (t) =>
  ACTIVITY_TYPES.find((x) => x.value === t)?.label || t;

// ✅ 더미 (나중에 API 데이터로 교체)
export const DUMMY_GROUPS = [
  { id: 1, name: "DAY6" },
  { id: 2, name: "TWICE" },
  { id: 3, name: "Stray Kids" },
];

export const DUMMY_ALBUMS = [
  { id: 101, groupId: 1, name: "The Book of Us", releaseDate: "2019-07-15" },
  { id: 102, groupId: 1, name: "Fourever", releaseDate: "2024-03-18" },
  { id: 201, groupId: 2, name: "Formula of Love", releaseDate: "2021-11-12" },
  { id: 301, groupId: 3, name: "ODDINARY", releaseDate: "2022-03-18" },
];

export const DUMMY_ACTIVITIES = [
  {
    id: 1,
    albumId: 101,
    date: "2019-07-16",
    type: "YOUTUBE",
    title: "Teaser Video",
    url: "https://www.youtube.com/watch?v=xxxx",
    visible: true,
  },
  {
    id: 2,
    albumId: 101,
    date: "2019-07-18",
    type: "MUSIC_BROADCAST",
    title: "M COUNTDOWN",
    url: "https://www.youtube.com/watch?v=yyyy",
    visible: true,
  },
  {
    id: 3,
    albumId: 201,
    date: "2021-11-14",
    type: "VARIETY",
    title: "Studio Choom",
    url: "https://www.youtube.com/watch?v=zzzz",
    visible: false,
  },
];
