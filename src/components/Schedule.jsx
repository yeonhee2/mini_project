import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list"
import koLocale from "@fullcalendar/core/locales/ko"
import './Schedule.css'
import { useEffect, useRef } from "react";
import annivers from "../componentsutill/anniversary";
import show from "../componentsutill/performancedate";
import albumlist from "../componentsutill/albumlist";
import gpskd from "../componentsutill/groupschedule";
import memskd from "../componentsutill/memschedule";

function Schedule({performance, group, album, schedule, memschedule}) {
  const calendarRef = useRef(null);
  const monthRef = useRef(null);
  const listRef = useRef(null);
  const event = [...annivers(group),...show(performance), ...albumlist(album), ...gpskd(schedule), ...memskd(memschedule)]
 
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
  const syncCalendars = (arg) => {
    const listApi = listRef.current?.getApi();
    const currentStart = new Date(arg.view.currentStart);
    const syncDate = new Date(currentStart);
    syncDate.setDate(15);
    syncDate.setHours(12);

    listApi?.gotoDate(syncDate);
    
  };

  return (
    <div ref={calendarRef} style={{marginBottom: '40px'}} className="Schedule">
      <div className="month" style={{flex: 1, width:"320px"}}>
        <FullCalendar
          plugins={[ dayGridPlugin,interactionPlugin]}
          headerToolbar={{
            left: "prev today", 
            center: "title", 
            right: "next", 
          }}
          ref={monthRef}
          initialView="dayGridMonth" 
          editable={true} 
          selectable = {true} 
          selectMirror = {true} 
          dayMaxEvents = {true} 
          datesSet={syncCalendars}
          height={450}
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
      <div style={{flex:0.5,width:"310px"}}>
        <FullCalendar
          plugins={[listPlugin ]}
          ref={listRef}
          initialView="listMonth" 
          height= {450}
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

export default Schedule