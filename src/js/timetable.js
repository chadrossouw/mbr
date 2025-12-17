const timetableHandler = () => {    
    const timetable = document.querySelector("#timetable");
    if(!timetable) return;
    const timetableItems = timetable.querySelectorAll(".timetable_item[data-times]");
    const dateTitle = document.querySelector("#check_date h3");
   /*  timetableItems = Array.from(timetableItems);
    timeta */
    timetableItems.forEach((item) => {
        item.times = JSON.parse(item.dataset.times);
        item.statusNode = item.querySelector(".timetable_status");
        item.notesNode = item.querySelector(".timetable_notes");
        item.getDateOpenData = function(day,date){
            date = date.toISOString().split('T')[0];
            if(this.times.exceptions){
                let dateInExceptions = this.times.exceptions.filter(exception=>exception.additional_closed_end_date>=date&&exception.additional_closed_start_date<=date);
                if(dateInExceptions.length>0){
                    return {open:false,description:dateInExceptions[0].reason};
                }
            }
            if(this.times.additional){
                let dateInAdditional = this.times.additional.filter(
                    (additional)=>{
                        return additional.additional_open_end_date>=date&&additional.additional_open_start_date<=date;
                    }
                );
                if(dateInAdditional.length>0){
                    let description = dateInAdditional[0].reason;
                    let times = this.times[`${day}_open_time`]&&this.times[`${day}_close_time`]?`${this.times[`${day}_open_time`]} - ${this.times[`${day}_close_time`]}`:'' ;
                    if(times){
                        description=`${times} ${description}`;
                    }
                    return {open:true,description:description};
                }
            }
            let note = '';
            if(this.times.link && this.times[`${day}_open`]){
                return {open:true,description:`<a href="${this.times.link.url}">${this.times.link.title}</a>`};
            }
            else if(this.times[`${day}_open`]){
                if(this.times[`${day}_note`]){
                  note = ` (${this.times[`${day}_note`]})`;
                }
                let times = this.times[`${day}_open_time`]&&this.times[`${day}_close_time`]?`${this.times[`${day}_open_time`]} - ${this.times[`${day}_close_time`]}`:'' ;
                return {open:true,description:`${times}${note}`};
            }
            else{
                if(this.times[`${day}_note`]){
                  note = ` (${this.times[`${day}_note`]})`;
                }
                return {open:false,description:`Closed${note}`};
            }
        }
    });
    const calendar = document.querySelector("#calendar");
    
    calendar.addEventListener('duetChange', (e) => {
        const date = e.detail.valueAsDate;
        date.setHours(12,0,0,0);
        const day = date.getDay();
        const dayOfWeek = getDayOfWeek(day);
        const today = new Date();
        today.setHours(12,0,0,0);
        
        let dateStr = date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        if(date.toISOString() == today.toISOString()){
            dateStr = 'Today: '+dateStr;
        }
        dateStr = dateStr.replace(',', '');
        dateTitle.innerHTML = dateStr; 
        timetableItems.forEach((item) => {
            const openData = item.getDateOpenData(dayOfWeek,date);
            if(openData.open){
                item.statusNode.innerHTML = "Open";
                item.statusNode.classList.remove("red");
                item.notesNode.innerHTML = openData.description;
            }
            else{
                item.statusNode.innerHTML = "Closed";
                item.statusNode.classList.add("red");
                item.notesNode.innerHTML = openData.description;
            }
        });
    });
    

    function getDayOfWeek(day) {
        switch (day) {
            case 0:
                return "sunday";
            case 1:
                return "monday";
            case 2:
                return "tuesday";
            case 3:
                return "wednesday";
            case 4:
                return "thursday";
            case 5:
                return "friday";
            case 6:
                return "saturday";
        }
    }
}

export default timetableHandler;