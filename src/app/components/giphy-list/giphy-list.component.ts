import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-giphy-list',
  standalone: true,
  imports: [],
  templateUrl: './giphy-list.component.html',
  styleUrl: './giphy-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiphyListComponent {

}
