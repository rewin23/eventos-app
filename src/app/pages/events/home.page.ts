
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { EventCalendarComponent } from '../../components/calendar/event-calendar.component';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
  imports: [CommonModule, IonicModule, RouterModule, EventCalendarComponent],
})
export class HomePage implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.events = this.eventService.list();
  }

  async onEventSelected(event: Event) {
    this.router.navigateByUrl('/events/' + event.id);
  }

  async onDaySelected(date: Date) {
   this.router.navigate(['/events'], { queryParams: { date: date.toISOString() } });
  }


  goCreateEvent(date?: Date) {
    const queryParams = date ? { date: date.toISOString() } : {};
    this.router.navigate(['/events/create'], { queryParams });
  }

}





