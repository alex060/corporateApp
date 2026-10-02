import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  async getCurrentPosition() {
    const data = await Geolocation.getCurrentPosition();
    return data.coords;
  }
}
