import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botom-new',
  standalone: true,
  imports: [],
  templateUrl: './botom-new.component.html',
  
})
export class BotomNewComponent {
  @Input() text: string = 'Default Text';
  
}
