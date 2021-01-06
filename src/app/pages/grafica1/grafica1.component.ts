import { Component} from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

    public labels1: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public labels2: string[] = ['Download Sales2', 'In-Store Sales2', 'Mail-Order Sales2'];
    public labels3: string[] = ['Download Sales3', 'In-Store Sales3', 'Mail-Order Sales3'];
    public labels4: string[] = ['Download Sales4', 'In-Store Sales4', 'Mail-Order Sales4'];

    public data1: number[] = [150, 450, 100];
    public data2: number[] = [250, 550, 200];
    public data3: number[] = [350, 650, 300];
    public data4: number[] = [450, 750, 400];

}
