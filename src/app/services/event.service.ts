import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { v4 as uuidv4 } from 'uuid';
import { NotificationService } from '../core/notifications/notifications.service';

@Injectable({ providedIn: 'root' })
export class EventService {

  constructor(notificationService: NotificationService) {
    this.notificationService = notificationService;
  }

  private storageKey = 'events_v1';
  private notificationService: NotificationService;

  private readAll(): Event[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : [];
  }

  private writeAll(list: Event[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }

  list(): Event[] {
    return this.readAll().sort((a,b)=> new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
  }

  get(id: string): Event | undefined {
    return this.readAll().find(e => e.id === id);
  }

  getByDate(date: string): Event[] {
    const targetDate = new Date(date);
    console.log('Filtering events for date:', targetDate);
    const events = this.readAll().filter(e => {
      const eventDate = new Date(e.startAt);
      return eventDate.getFullYear() === targetDate.getFullYear() &&
             eventDate.getMonth() === targetDate.getMonth() &&
             eventDate.getDate() === targetDate.getDate();
    }).sort((a,b)=> new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

    console.log('Events on this date:', events);
    return events;
  } 

  create(data: Partial<Event>): Event {
    const ev: Event = {
      id: uuidv4(),
      title: data.title || 'Sin título',
      description: data.description,
      startAt: data.startAt!,
      endAt: data.endAt,
      reminders: data.reminders || [60], // 1 hora por defecto
    };
    const list = this.readAll();
    list.push(ev);
    this.writeAll(list);
    this.notificationService.scheduleEventReminders(ev);
    return ev;

  }

  update(id: string, patch: Partial<Event>): Event | undefined {
    const list = this.readAll();
    const idx = list.findIndex(e => e.id === id);
    if (idx < 0) return undefined;
    list[idx] = { ...list[idx], ...patch };
    this.writeAll(list);
    return list[idx];
  }

  delete(id: string) {
    const list = this.readAll().filter(e => e.id !== id);
    this.writeAll(list);
  }
}
