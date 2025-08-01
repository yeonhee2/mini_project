import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import momentTimezonePlugin from "@fullcalendar/moment-timezone"
import './Schedule.css'
import { useEffect, useRef } from "react";
import annivers from "../componentsutill/anniversary";
import show from "../componentsutill/performancedate";
import albumlist from "../componentsutill/albumlist";
import gpskd from "../componentsutill/groupschedule";

function Schedule({performance, group, album, schedule}) {
  const calendarRef = useRef(null);
  const event = [...annivers(group),...show(performance), ...albumlist(album), ...gpskd(schedule)]
 
  useEffect(() => {
    const headerEl = calendarRef.current?.querySelector('.fc-header-toolbar');
    if(headerEl) {
      headerEl.style.backgroundColor = group.color;
      headerEl.style.color = group.fontcolor;
    }

    const buttons = calendarRef.current?.querySelectorAll('.fc-button');
    if(buttons) {
      buttons.forEach((btn) => {
        btn.style.backgroundColor = group.color;
        btn.style.borderColor = group.color;
        btn.style.color = group.fontcolor;
      })
    }
  }, [group])

  if(group.length === 0) {
    return <div> 정보 불러오는 중</div>
  }

  return (
    <div ref={calendarRef} style={{marginBottom: '40px'}} className="Schedule">
      <FullCalendar 
        plugins={[ dayGridPlugin, timeGridPlugin,momentTimezonePlugin,interactionPlugin] }
        headerToolbar= {{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        initialView="dayGridMonth"
        editable= {true}
        selectable = {true}
        selectMirror = {true}
        dayMaxEvents = {true}
        height={600}
        events={event}
        
      
      />

    </div>
  )
}

export default Schedule