import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';

export const searchInput = () => {
  return (source: Observable<string | null>) =>
    source.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed()
    );
};
