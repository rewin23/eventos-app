import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event.model';
import { EventCardComponent } from '../../../components/event-card/event-card.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.css'],
  imports: [CommonModule, IonicModule, RouterModule, EventCardComponent],
})
export class EventListPage implements OnInit {
  events: Event[] = [];
  date?: string = '';

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit() {
    this.date = this.route.snapshot.paramMap.get('date') || undefined;
    this.route.queryParams.subscribe(params => {
      if (params['date']) {
        this.date = params['date'];
        console.log('Date param:', this.date);
        this.events = this.eventService.getByDate(this.date || new Date().toISOString());
      } else {
        this.date = undefined;
        this.events = this.eventService.list();
      }
    }
    );
  }
  
  goHome() {
    this.router.navigateByUrl('/home');
  }

  goCreateEvent(date?: Date) {
    const queryParams = date ? { date: date.toISOString() } : {};
    this.router.navigate(['/events/create'], { queryParams });
  }

}