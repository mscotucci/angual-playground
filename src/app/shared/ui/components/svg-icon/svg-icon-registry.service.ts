import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IconRegistryService {
  private http = inject(HttpClient);
  private iconCache: { [key: string]: Observable<string> } = {};

  getIcon(name: string): Observable<string> {
    if (!this.iconCache[name]) {
      const iconPath = `assets/icons/${name}.svg`;
      this.iconCache[name] = this.http
        .get(iconPath, { responseType: 'text' })
        .pipe(
          map((svg) => this.extractSvgPath(svg)),
          catchError(() => of('')),
          shareReplay(1)
        );
    }
    return this.iconCache[name];
  }

  private extractSvgPath(svgContent: string): string {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
    const pathElement = svgDoc.querySelector('path');
    return pathElement ? pathElement.getAttribute('d') || '' : '';
  }
}
