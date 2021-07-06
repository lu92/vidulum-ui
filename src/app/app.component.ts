import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Sunburst from 'sunburst-chart';
import * as d3 from 'd3';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading= false;

  @ViewChild('sbChart', { static: true })
  sbChartEl!: ElementRef;

  constructor() {}

  ngOnInit() {
    this.loading = true;
    const sbdata = {
      name: 'capital',
      color: 'magenta',
      children: [
        {
          name: 'crypto',
          size: 2,
          color: 'red'
        },
        {
          name: 'PM',
          color: 'red',
          children: [
            {
              name: 'Gold coins',
              size: 5,
              color: 'yellow'
            },
            {
              name: 'Silver coins',
              size: 2,
              color: 'silver',
              data: {
                avgPurchasePrice: {
                  amount: 90,
                  currency: "USD"
                },
                quantity: {
                  qty: 5,
                  unit: "oz"
                },
                pctProfit: 0.05555555,
                profit: {
                    amount: 25,
                    currency: "USD"
                },
                currentValue: {
                  amount: 25,
                  currency: "USD"
              }
              }
            },
            {
              name: 'GDXJ',
              size: 3,
              color: 'silver'

            }

          ]
        },
        {
          name: 'b',
          children: [
            {
              name: 'ba',
              size: 1
            },
            {
              name: 'bb',
              children: [
                {
                  name: 'bba',
                  size: 1
                },
                {
                  name: 'bbb',
                  size: 1
                }
              ]
            }
          ]
        }
      ]
    };

    console.log("INIT");
    const colorD3 = d3.scaleOrdinal(d3.schemePaired);


        const myChart = Sunburst();

        myChart
      .data(sbdata)
      .size('size')
      .height(500)
      .showLabels(true)
      .excludeRoot(true)
      .tooltipContent((d, node) => {

        return `Size is: <i>${node.value}</i>`
        // return `Size is: <i>${d}</i>`
      })
      .color(d => {
        console.log(d);

        return '#1f78b4'})
      (this.sbChartEl.nativeElement);
    this.loading = false;
  }
}
