import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import MainPage from "./mainpage/MainPage"
import Spinners from "./components/ui/Spinner"

const Day6 = lazy(() => import("./groups/day6/Day6"))
const Twice = lazy(() => import("./groups/twice/Twice"))
const Straykids = lazy(() => import("./groups/straykids/Straykids"))
const Itzy = lazy(() => import("./groups/itzy/Itzy"))
const Nmixx = lazy(() => import("./groups/nmixx/Nmixx"))
const NiziU = lazy(() => import("./groups/niziu/Niziu"))
const AlbumPage = lazy(() => import("./features/album/pages/AlbumPage"))
const NotFound = lazy(() => import("./NotFound"))

const Routers = ({artist, concert, artistPlayList, album, groupevent, memevent }) => {
  return (
    <Suspense fallback={<Spinners size={60} label='데이터 정보 불러오는 중...' showLabel position='center' />}>
      <Routes>
        <Route path='/' element={<MainPage artist={artist} album={album} concert={concert}/>} />
        <Route path='/day6/20150907' 
          element={<Day6  group={artist[0]} performance={concert[0]} suggest={artistPlayList[0]} album={album[0]} schedule={groupevent[0]}  memschedule={memevent[0]} />} 
        />
        <Route path='/twice/20151020' 
          element={<Twice group={artist[1]} performance={concert[1]} suggest={artistPlayList[1]} album={album[1]} schedule={groupevent[1]} memschedule={memevent[1]} />} 
        />
        <Route path='/straykids/20180325' 
          element={<Straykids  group={artist[2]} performance={concert[2]} suggest={artistPlayList[2]} album={album[2]} schedule={groupevent[2]} memschedule={memevent[2]} />} 
        />
        <Route path='/itzy/20190212' 
          element={<Itzy  group={artist[3]} performance={concert[3]} suggest={artistPlayList[3]} album={album[3]} schedule={groupevent[3]}  memschedule={memevent[3]} />} 
        />
        <Route path='/nmixx/20220222' 
          element={<Nmixx group={artist[4]} performance={concert[4]} suggest={artistPlayList[4]} album={album[4]} schedule={groupevent[4]} memschedule={memevent[4]} />} 
        />
        <Route path='/niziu/20201202' 
          element={<NiziU  group={artist[5]} performance={concert[5]} suggest={artistPlayList[5]} album={album[5]} schedule={groupevent[5]} memschedule={memevent[5]} />} 
        />
        <Route path='/album/:group' element={<AlbumPage />} 
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default Routers