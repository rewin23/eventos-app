import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBack, chevronForward, ellipse } from 'ionicons/icons';
import { Event  as EventModel} from '../../models/event.model';

export interface CalendarDay {
  date: Date;
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasEvents: boolean;
  events: EventModel[];
}

@Component({
  selector: 'app-event-calendar',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss']
})
export class EventCalendarComponent implements OnInit {
  @Input() events: EventModel[] = [];
  @Input() showEventList: boolean = true;
  @Input() allowEventCreation: boolean = true;
  
  @Output() eventSelected = new EventEmitter<EventModel>();
  @Output() daySelected = new EventEmitter<Date>();
  @Output() createEvent = new EventEmitter<Date>();

  currentDate = new Date();
  calendarDays: CalendarDay[] = [];
  selectedDate: Date | null = null;
  monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  constructor() {
    addIcons({ chevronBack, chevronForward, ellipse });
  }

  ngOnInit() {
    this.generateCalendar();
  }

  ngOnChanges() {
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    // Primer día del mes
    const firstDay = new Date(year, month, 1);
    // Último día del mes
    const lastDay = new Date(year, month + 1, 0);
    
    // Día de la semana del primer día (0 = domingo)
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    // Día de la semana del último día
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));
    
    this.calendarDays = [];
    const currentDateOnly = new Date();
    currentDateOnly.setHours(0, 0, 0, 0);
    
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dayEvents = this.getEventsForDate(new Date(date));
      
      this.calendarDays.push({
        date: new Date(date),
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        isCurrentMonth: date.getMonth() === month,
        isToday: date.getTime() === currentDateOnly.getTime(),
        hasEvents: dayEvents.length > 0,
        events: dayEvents
      });
    }
  }

  getEventsForDate(date: Date): EventModel[] {
    return this.events.filter(event => {
      const eventDate = new Date(event.startAt);
      return eventDate.toDateString() === date.toDateString();
    });
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  onDayClick(day: CalendarDay) {
    this.selectedDate = day.date;
    this.daySelected.emit(day.date);
  }

  onEventClick(event: EventModel, stopPropagation: Event) {
    stopPropagation.stopPropagation();
    this.eventSelected.emit(event);
  }

  onCreateEventClick(date: Date, stopPropagation: Event) {
    if (this.allowEventCreation) {
      stopPropagation.stopPropagation();
      this.createEvent.emit(date);
    }
  }

  getCurrentMonthYear(): string {
    return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }

  getSelectedDateEvents(): EventModel[] {
    if (!this.selectedDate) return [];
    return this.getEventsForDate(this.selectedDate);
  }

  getEventColor(event: EventModel): string {
    return event.color || '#3880ff';
  }

  formatTime(time: string): string {
    if (!time) return '';
    return time.substring(0, 5); // HH:MM format
  }
}