import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {
  @Input() playlist: any[];
  @Output() videoSelected: EventEmitter<any> = new EventEmitter<any>();

  selectVideo(video: any) {
    this.playlist.forEach(item => {
      item.active = false; // Reset active property of all videos
    });
    video.active = true; // Set active property of the selected video
    this.videoSelected.emit(video);
  }

}
