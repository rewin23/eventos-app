import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../models/event.model';

@Pipe({ name: 'groupByDate', standalone: true })
export class GroupByDatePipe implements PipeTransform {
  transform(events: Event[]): any[] {
    const grouped: { date: string; events: Event[] }[] = [];
    const map = new Map<string, Event[]>();

    events.forEach(e => {
      const date = new Date(e.startAt).toDateString();
      if (!map.has(date)) map.set(date, []);
      map.get(date)?.push(e);
    });

    map.forEach((events, date) => {
      grouped.push({ date, events });
    });

    // Ordenar por fecha ascendente
    return grouped.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
}
