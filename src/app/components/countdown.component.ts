import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'count-down',
    template: `
    <div>
    {{message}}
    </div>
    `
})
export class CountDownComponent implements OnInit {
    @Input() inputDate: any;
    message: string;
    constructor() { }

    ngOnInit() {
        let date = new Date(this.inputDate);
        let diff: number;
        Observable.interval(1000).map((x) => {
            diff = Math.floor((date.getTime() - new Date().getTime()) / 1000);
        }).subscribe((x) => {
            this.message = this.dhms(diff);
        });
    }
    dhms(t) {
        var days, hours, minutes, seconds;
        days = Math.floor(t / 86400);
        t -= days * 86400;
        hours = Math.floor(t / 3600) % 24;
        t -= hours * 3600;
        minutes = Math.floor(t / 60) % 60;
        t -= minutes * 60;
        seconds = t % 60;

        return [
            days + 'd',
            hours + 'h',
            minutes + 'm',
            seconds + 's'
        ].join(' ');
    }
}