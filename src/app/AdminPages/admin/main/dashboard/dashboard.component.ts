import { Component,OnInit } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'chart';

  series :ApexNonAxisChartSeries=[40,32,28,55];
  chartDetails:ApexChart={
    type:'donut',
    toolbar:{
      show:true
    }
  };
  constructor(){}

  ngOnInit(): void {
    
  } 
   
  
}
 


