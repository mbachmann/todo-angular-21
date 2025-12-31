import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TempConverterPipe } from '../shared/pipe/temp-converter.pipe';

@Component({
  selector: 'app-temp-conversion',
  templateUrl: './temp-conversion.component.html',
  styleUrls: ['./temp-conversion.component.scss'],
  imports: [FormsModule, TempConverterPipe],
})
export class TempConversionComponent {
  title = 'Angular Custom Pipe Example';
  celsius = 0;
  fahrenheit = 0;
}
