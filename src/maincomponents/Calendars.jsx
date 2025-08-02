import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // 월간 보기
import interactionPlugin from "@fullcalendar/interaction"; // 클릭 이벤트
import listPlugin from "@fullcalendar/list"
import koLocale from "@fullcalendar/core/locales/ko"
import './Calendars.css'
import data from "../utill/date";
import albums from "../utill/albumdata.js";
import concerts from "../utill/concertdata";
import { useEffect, useRef } from "react";

function Calendars({artist, album, concert}) {
  const calendarRef = useRef(null);
  const monthRef = useRef(null);
  const listRef = useRef(null);

  const event = [...data(artist),...albums(album),...concerts(concert)]

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

  const syncCalendars = (arg) => {
    const listApi = listRef.current?.getApi();
    const currentStart = new Date(arg.view.currentStart);
    const syncDate = new Date(currentStart);
    syncDate.setDate(15);
    syncDate.setHours(12);

    listApi?.gotoDate(syncDate);
    
  };

  return(
    <div ref={calendarRef} style={{marginBottom: '40px'}} className="Calendars">
      <div className="month" style={{flex: 1}}>
        <FullCalendar
          plugins={[ dayGridPlugin,interactionPlugin]}
          headerToolbar={{
            left: "prev today", // 이전달 현재달
            center: "title", // 현재 날짜 제목
            right: "next", // 다음달
          }}
          ref={monthRef}
          initialView="dayGridMonth" // 기본 화면 설정
          editable={true} // 수정 가능 여부
          selectable = {true} // 선택 가능 여부
          selectMirror = {true} // timegrid 뷰에서 자리 표시자 여부
          dayMaxEvents = {true} // 한 셀에 최대 이벤트 표시 여부
          datesSet={syncCalendars}
          height={550}
          events={event}
          eventContent={(arg)=> {
            if(arg.view.type === "dayGridMonth") {
              const dot = document.createElement("div");
              dot.style.width = "8px";
              dot.style.height = "8px";
              dot.style.borderRadius = "50%";
              dot.style.margin = "0 auto";
              dot.style.backgroundColor = arg.event.backgroundColor || arg.event.color;

              return {domNodes : [dot]};
            }
            return true;
          }}

          />
      </div>
      <div style={{flex:0.5}}>
        <FullCalendar
          plugins={[listPlugin ]}
          ref={listRef}
          initialView="listMonth" 
          height= {550}
          locale={koLocale}
          events={event}
          noEventsContent={false}
          headerToolbar={false}
          listDayFormat={{weekday:'short'}}
          listDaySideFormat={{month:'2-digit', day: '2-digit'}}
          />
      </div>
    </div>

    
  )
}

export default Calendars