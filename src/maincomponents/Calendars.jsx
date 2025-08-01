import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // 월간 보기
import timeGridPlugin from "@fullcalendar/timegrid"; // 주간, 일간 뷰 지원
import interactionPlugin from "@fullcalendar/interaction"; // 클릭 이벤트
import momentTimezonePlugin from "@fullcalendar/moment-timezone" // 시간대 플러그인
import './Calendars.css'
import data from "../utill/date";
import albums from "../utill/albumdata.js";
import concerts from "../utill/concertdata";
import { useEffect, useRef } from "react";

function Calendars({artist, album, concert}) {

  const calendarRef = useRef(null);
  
    useEffect(() => {
      const headerEl = calendarRef.current?.querySelector('.fc-header-toolbar');
      if(headerEl) {
        headerEl.style.backgroundColor = '#00B6F0';
        headerEl.style.color = '#1A1A1A';
      }
  
      const buttons = calendarRef.current?.querySelectorAll('.fc-button');
      if(buttons) {
        buttons.forEach((btn) => {
          btn.style.backgroundColor = '#00B6F0';
          btn.style.borderColor = '#00B6F0';
          btn.style.color = '#1A1A1A';
        })
      }
    }, [ ])

  const event = [...data(artist),...albums(album),...concerts(concert)]
  return(
    <div ref={calendarRef} style={{marginBottom: '40px'}} className="Calendars">
      <FullCalendar
        plugins={[ dayGridPlugin,timeGridPlugin,momentTimezonePlugin,interactionPlugin ]}
        headerToolbar={{
          left: "prev,next today", // 이전달 다음달 현재달
          center: "title", // 현재 날짜 제목
          right: "dayGridMonth,timeGridWeek", // 월별, 주별 뷰
        }}
        initialView="dayGridMonth" // 기본 화면 설정
        editable={true} // 수정 가능 여부
        selectable = {true} // 선택 가능 여부
        selectMirror = {true} // timegrid 뷰에서 자리 표시자 여부
        dayMaxEvents = {true} // 한 셀에 최대 이벤트 표시 여부
        height={600}
        events={event}
        />
    </div>
  )
}

export default Calendars