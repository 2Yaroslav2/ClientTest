import {Component} from '@angular/core';
import {Track} from "ngx-audio-player";



@Component({
  selector: 'app-audio',
  styleUrls: ['audio.component.css'],
  templateUrl: 'audio.component.html',
})
export class AudioComponent {
  msaapDisplayTitle = false;
  msaapDisplayPlayList = false;
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = false;

// Material Style Advance Audio Player Playlist
  msaapPlaylist: Track[] = [
    {
      title: 'Audio One Title',
      link: 'https://dl.dropboxusercontent.com/s/9v0psowra7ekhxo/A%20Himitsu%20-%20In%20Love%20%28feat.%20Nori%29.flac?dl=0',
      artist: 'Audio One Artist',
      duration: 0
    }
  ];

  currentTrack: Track | null = null;

  onEnded({event}: { event: any }) {
    console.log(event);
    // your logic which needs to
    // be triggered once the
    // track ends goes here.

    // example
    this.currentTrack = null;
  }

}
