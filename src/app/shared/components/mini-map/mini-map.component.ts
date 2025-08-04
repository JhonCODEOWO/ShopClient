import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import maplibregl, { LngLat, LngLatLike, Map, Marker } from 'maplibre-gl';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'shared-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniMapComponent implements AfterViewInit {
  mapElement = viewChild<ElementRef>('map');
  map = signal<Map | null>(null);
  lng = input(0);
  lat = input(0);
  zoom = input(1);
  height = input(10);
  clickedMap = output<LngLat>();
  markers = signal<Marker[]>([]);

  ngAfterViewInit(): void {
    const map = new maplibregl.Map({
      container: this.mapElement()?.nativeElement, // container id
      style: environment.MAP_URL, // style URL
      center: [this.lng(), this.lat()], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
    });

    this.addEventListeners(map);

    this.map.set(map);
  }

  addEventListeners(map: Map){
    map.on('click', (target) => {
      const mark = this.marker(target.lngLat);
      mark.addTo(map);
      //Delete marker from map
      if(this.markers().length > 0) {
        this.markers()[this.markers().length - 1].remove();
      }
      this.markers.update((data)=>[...data, mark]);
      this.clickedMap.emit(target.lngLat);
    })
  }

  marker(lngLat: LngLatLike): Marker{
    return new Marker({color: this.randomColor()}).setLngLat(lngLat);
  }

  randomColor(): string {
    return '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
  }

  handleBtnHomeClick(){
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(position);
      const {longitude, latitude} = position.coords;
      this.map()?.setCenter([longitude, latitude]);
      this.map()?.setZoom(15);
    });
  }
}
