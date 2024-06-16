import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botomsave',
  standalone: true,
  imports: [],
  templateUrl: './botomsave.component.html',

})
export class BotomsaveComponent {
  
  @Input() text: string = 'Default Text';
 /*  buttonText: string = 'Submit';

  updateButtonText(newText: string): void {
    this.buttonText = newText;
  } */
   prueba(){
    console.log('prueba de fuego')
   }

}
