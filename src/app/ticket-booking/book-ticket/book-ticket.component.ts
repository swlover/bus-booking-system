import { Component, OnInit } from '@angular/core';
import { mockResponse } from './booking-system-response';
import { BookTicketResponseModel, BusSeatInfoModel } from '../models/book-ticket.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {
  public bookingInfo: BookTicketResponseModel;
  public bookingForm: FormGroup;
  public availablseats: BusSeatInfoModel[] = [];
  public flag: boolean = true;
  public error: string;
  constructor(private fb: FormBuilder) {
    this.initateForm();
  }

  public ngOnInit(): void {
    this.bookingInfo = mockResponse;
    this.availablseats = this.getAvailablseats();
  }

  public onSubmit(formValues: FormGroup): void {
    const userName: string = formValues.controls.name.value;
    const requiredSeats: number = parseInt(formValues.controls['count'].value);
    if (requiredSeats > this.availablseats.length) {
      this.error = "required seats not available";
    } else if (requiredSeats > 0) {
      this.checkInCategorys(userName, requiredSeats);
    }

  }

  public openBookingForm(): void {
  this.bookingForm.setValue({
    name: '',
    count: ''
  });
  this.flag = true;
  this.error = '';
}

  private getAvailablseats(): BusSeatInfoModel[] {
    let availablseats: BusSeatInfoModel[] = []
    this.bookingInfo.seats.forEach(seat => {
      if (seat.status === 'available') {
        availablseats.push(seat);
      }
    });
    return availablseats;
  }

  private checkInCategorys(name: string, count: number): void {
    let category2: BusSeatInfoModel[] = [];
    let category3: BusSeatInfoModel[] = [];
    let random: BusSeatInfoModel[] = [];
    if (count === 1) {
      category2 = this.checkInCategory(count, 2);
      if (category2.length !== 0) {
        this.bookSeat(category2, name);
      } else {
        category3 = this.checkInCategory(count, 3);
        if (category3.length !== 0) {
          this.bookSeat(category3, name);
        }
      }
    } else if (count === 2) {
      category2 = this.checkInCategory(count, 2);
      if (category2.length !== 0) {
        this.bookSeat(category2, name);
      } else {
        category3 = this.checkInCategory(count, 3);
        if (category3.length !== 0) {
          this.bookSeat(category3, name);
        } else {
          this.bookSeat(this.getRandomSeats(count), name);
        }

      }
    } else if(count === 3){
      category3 = this.checkInCategory(count, 3);
        if (category3.length !== 0) {
          this.bookSeat(category3, name);
        } else {
          this.bookSeat(this.getRandomSeats(count), name);
        }
    } else {
        this.bookSeat(this.getRandomSeats(count), name);
    }

  }

  private bookSeat(bookseats: BusSeatInfoModel[], name: string): void {
    bookseats.forEach(seat => {
      const index: number = this.bookingInfo.seats.findIndex(data => data.seatNo === seat.seatNo);
      this.bookingInfo.seats[index].status = "booked";
      this.bookingInfo.seats[index].bookedBy = name;
    });

    this.availablseats = this.getAvailablseats();

    this.flag = false;
  }

  private checkInCategory(count: number, category: number): BusSeatInfoModel[] {
    let bookseats: BusSeatInfoModel[] = [];
    this.availablseats.forEach(seat => {
      if (bookseats.length < count) {
        if (seat.category === category) {
          bookseats.push(seat);
        }
        if (bookseats.length === count && count > 1) {
          bookseats = this.chekIfSameRow(bookseats);
        }
      }

    });
    if (bookseats.length === count) {
      return bookseats;
    } else {
      return [];
    }
  }

  private chekIfSameRow(bookseats: BusSeatInfoModel[]): BusSeatInfoModel[] {
    let row: number[] = [];
    bookseats.forEach(seat => {
      row.push(seat.row);
    })
    if (Array.from(new Set(row)).length === 1) {
      return bookseats;
    } else {
      const removeIndex = bookseats.splice(-1, 1);

      return removeIndex;
    }
  }

  private getRandomSeats(count: number): BusSeatInfoModel[] {
    let randomSeats: BusSeatInfoModel[] = [];
    this.availablseats.forEach(seat => {
      if (randomSeats.length < count) {
        randomSeats.push(seat)
      }
    });
    return randomSeats;
  }

  private initateForm(): void {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      count: ['', Validators.required]
    });
  }

}
